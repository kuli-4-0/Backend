const db = require('../models');
const Event = db.Event;
const AuditionEvent = db.AuditionEvent;
const LiveEvent = db.LiveEvent;
const path = require('path');
const fs = require('fs');

module.exports = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll({
        include: [
          {
            model: AuditionEvent,
            required: false,
          },
          {
            model: LiveEvent,
            required: false,
          },
        ],
      });

      res.status(200).json({ data: events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  },
  getAllAuditionEvents: async (req, res) => {
    try {
      const events = await Event.findAll({
        include: [
          {
            model: AuditionEvent,
            required: false,
          },
          {
            model: LiveEvent,
            required: false,
          },
        ],
        where: {
          status: 'Live', // Menambahkan kondisi status
        },
      });

      res.status(200).json({ data: events });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getEventById: async (req, res) => {
    try {
      const { id } = req.params;

      const event = await Event.findOne({
        where: { id },
        include: [AuditionEvent, LiveEvent],
      });

      if (!event) {
        res.status(404).json({ error: 'Event not found' });
      } else {
        res.status(200).json({ data: event });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch event' });
    }
  },
  getEventByUserId: async (req, res) => {
    try {
      const userId = req.user.id;
      // Memverifikasi token JWT sebelum melanjutkan
      if (!req.user || req.user.id != userId) {
        return res.status(401).json({ error: 'Unauthorized access' });
      }

      const events = await Event.findAll({
        where: { userId },
        include: [AuditionEvent, LiveEvent],
      });

      if (events.length === 0) {
        return res.status(404).json({ msg: 'No events found for the user' });
      }

      res.status(200).json({ data: events });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createEvent: async (req, res) => {
    try {
      const { name, location, date, status } = req.body;
      const userId = req.user.id; // Assume authenticated user's ID is stored in req.user.id
      let type = status;

      // Validasi ukuran file poster
      const posterFile = req.file;
      if (!posterFile) {
        return res.status(400).json({ error: 'Poster file is required' });
      }
      if (posterFile.size > 2 * 1024 * 1024) {
        return res
          .status(400)
          .json({ error: 'Poster file size exceeds the limit' });
      }
      // Validasi format file poster
      const allowedFormats = ['.jpg', '.jpeg', '.png'];
      const fileExt = path.extname(posterFile.originalname).toLowerCase();
      if (!allowedFormats.includes(fileExt)) {
        return res.status(400).json({ error: 'Invalid poster file format' });
      }
      const timestamp = Date.now();
      const uniqueId = Math.round(Math.random() * 1e9);
      // Pindahkan file poster ke direktori yang diinginkan
      // Define the destination folder path
      const destinationDir = path.join(__dirname, '../public/poster-event');

      const newFileName = `poster-${timestamp}-${uniqueId}${fileExt}`;
      const newPath = path.join(destinationDir, newFileName);
      // Check if the destination folder exists
      if (!fs.existsSync(destinationDir)) {
        // Create the destination folder if it doesn't exist
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      // Move the file to the destination folder
      fs.renameSync(posterFile.path, newPath);

      const event = await Event.create({
        name,
        location,
        date,
        poster: newFileName,
        status,
        userId,
      });

      if (type === 'Audition') {
        const {
          startDate,
          endDate,
          auditionNeeds,
          salary,
          requirements,
          genre,
          numberOfMusicians,
          auditionStatus,
        } = req.body;

        const auditionEvent = await AuditionEvent.create({
          startDate,
          endDate,
          auditionNeeds,
          salary,
          requirements,
          genre,
          numberOfMusicians,
          auditionStatus,
          eventId: event.id,
        });

        res.status(201).json({ data: { event, auditionEvent } });
      } else if (type === 'Live') {
        const { eventDate, ticketPrice, eventsCapacity, liveStatus } = req.body;

        const liveEvent = await LiveEvent.create({
          eventDate,
          ticketPrice,
          eventsCapacity,
          liveStatus,
          eventId: event.id,
        });

        res.status(201).json({ data: { event, liveEvent } });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  },
  updateEvent: async (req, res) => {
    try {
      const { name, location, date, status } = req.body;
      const { id } = req.params;
      let type = status;

      const userId = req.user.id; // Assume authenticated user's ID is stored in req.user.id

      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Validasi apakah user memiliki akses untuk mengupdate event
      if (event.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      // Validasi ukuran file poster
      const posterFile = req.file;
      if (posterFile) {
        if (posterFile.size > 2 * 1024 * 1024) {
          return res
            .status(400)
            .json({ error: 'Poster file size exceeds the limit' });
        }
        // Validasi format file poster
        const allowedFormats = ['.jpg', '.jpeg', '.png'];
        const fileExt = path.extname(posterFile.originalname).toLowerCase();
        if (!allowedFormats.includes(fileExt)) {
          return res.status(400).json({ error: 'Invalid poster file format' });
        }

        // Hapus gambar poster lama jika ada
        if (event.poster) {
          const oldPosterPath = path.join(__dirname, '../public', event.poster);
          fs.unlinkSync(oldPosterPath);
        }

        // Pindahkan file poster baru ke direktori yang diinginkan
        const timestamp = Date.now();
        const uniqueId = Math.round(Math.random() * 1e9);
        const destinationDir = path.join(__dirname, '../public');
        const newFileName = `poster-${timestamp}-${uniqueId}${fileExt}`;
        const newPath = path.join(destinationDir, newFileName);
        fs.renameSync(posterFile.path, newPath);

        // Update data event
        event.poster = newFileName;
      }

      // Update data event
      event.name = name;
      event.location = location;
      event.date = date;
      event.status = status;
      await event.save();

      if (type === 'Audition') {
        const {
          startDate,
          endDate,
          auditionNeeds,
          salary,
          requirements,
          genre,
          numberOfMusicians,
          auditionStatus,
        } = req.body;

        const auditionEvent = await AuditionEvent.create({
          startDate,
          endDate,
          auditionNeeds,
          salary,
          requirements,
          genre,
          numberOfMusicians,
          auditionStatus,
          eventId: event.id,
        });
        res.status(200).json({ data: { event, auditionEvent } });
      } else if (type === 'Live') {
        const { eventDate, ticketPrice, eventsCapacity, liveStatus } = req.body;

        const liveEvent = await LiveEvent.create({
          eventDate,
          ticketPrice,
          eventsCapacity,
          liveStatus,
          eventId: event.id,
        });
        res.status(200).json({ data: { event, liveEvent } });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Assume authenticated user's ID is stored in req.user.id

      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Validasi apakah user memiliki akses untuk menghapus event
      if (event.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      // Hapus gambar poster jika ada
      if (event.poster) {
        const posterPath = path.join(__dirname, '../public', event.poster);
        fs.unlinkSync(posterPath);
      }

      // Hapus event dari database
      await event.destroy();

      // Hapus juga data terkait dari tabel AuditionEvent dan LiveEvent (jika ada)
      await AuditionEvent.destroy({ where: { eventId: id } });
      await LiveEvent.destroy({ where: { eventId: id } });

      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  },
  // !live event

  getAllLiveEvents: async (req, res) => {
    try {
      const events = await Event.findAll({
        include: [
          {
            model: AuditionEvent,
            required: false,
          },
          {
            model: LiveEvent,
            required: false,
          },
        ],
        where: {
          status: 'Live', // Menambahkan kondisi status
        },
      });

      res.status(200).json({ data: events });
    } catch (error) {
      console.log(error);
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getLiveEventsById: async (req, res) => {
    const { eventId } = req.params;
    try {
      const events = await Event.findAll({
        include: [
          {
            model: AuditionEvent,
            required: false,
          },
          {
            model: LiveEvent,
            required: false,
          },
        ],
        where: { id: eventId },
      });

      res.status(200).json({ data: events });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
