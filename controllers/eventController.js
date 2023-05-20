const db = require('../models');
const Event = db.Event;
const path = require('path');
const fs = require('fs');

module.exports = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.status(200).json({ data: events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  },
  getEventById: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne({ where: { id } });
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
      const { userId } = req.params;
      // Memverifikasi token JWT sebelum melanjutkan
      if (!req.user || req.user.id != userId) {
        return res.status(401).json({ error: 'Unauthorized access' });
      }

      const events = await Event.findAll({ where: { userId } });

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
      const { name, location, date, poster, status } = req.body;
      const userId = req.user.id; // Assume authenticated user's ID is stored in req.user.id

      // Validasi ukuran file poster
      const posterFile = req.file;
      console.log(posterFile);
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
      const destinationDir = path.join(__dirname, '../public');
      const newFileName = `poster-${timestamp}-${uniqueId}${fileExt}`;
      const newPath = path.join(destinationDir, newFileName);
      fs.renameSync(posterFile.path, newPath);

      const event = await Event.create({
        name,
        location,
        date,
        poster: newFileName,
        status,
        userId,
      });

      res.status(201).json({ data: event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  },
  updateEvent: async (req, res) => {
    try {
      const { name, location, date, status } = req.body;
      const { id } = req.params;

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

      res.status(200).json({ data: event });
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

      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  },
};
