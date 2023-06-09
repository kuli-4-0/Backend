require('dotenv').config();
const db = require('../models');
const Event = db.Event;
const AuditionEvent = db.AuditionEvent;
const LiveEvent = db.LiveEvent;
const path = require('path');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const upload = require('../middleware/uploadFileToGCS');

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH,
});

const bucket = storage.bucket(process.env.CLOUD_BUCKET);

module.exports = {
  getAllEvents: async (req, res) => {
    const { genre } = req.query;

    try {
      let events;

      if (genre) {
        events = await Event.findAll({
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
            genre: genre,
          },
        });
      } else {
        events = await Event.findAll({
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
      }

      res.status(200).json({ data: events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  },
  getAllEventLiveForMl: async (req, res) => {
    const { genre } = req.query;

    try {
      let events;

      if (genre) {
        events = await Event.findAll({
          include: [
            {
              model: LiveEvent,
              required: true,
            },
          ],
          where: { genre: genre },
        });
      } else {
        events = await Event.findAll({
          include: [
            {
              model: LiveEvent,
              required: true,
            },
          ],
        });
      }

      const eventData = events.map((event) => ({
        id_event: event.id,
        nama_event: event.name,
        location: event.location,
        date: event.date,
        poster: event.poster,
        status: event.status,
        id_event_organizer: event.userId,
        genre: event.genre,
        Live_id: event.LiveEvent.id,
        eventDate: event.LiveEvent.eventDate,
        harga_tiket: event.LiveEvent.ticketPrice,
        eventsCapacity: event.LiveEvent.eventsCapacity,
        liveStatus: event.LiveEvent.liveStatus,
      }));

      res.status(200).json({ data: eventData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch live events' });
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
      // Proses pengunggahan file dengan middleware multer
      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: err.message });
        }

        // Lanjutkan dengan logika bisnis setelah pengunggahan file berhasil
        const { name, location, date, status, genre } = req.body;
        const userId = req.user.id; // Assume authenticated user's ID is stored in req.user.id

        let type = status;

        if (!req.file) {
          return res.status(400).json({ error: 'Poster file is required' });
        }

        // Dapatkan informasi file dari req.file
        const { originalname, buffer, mimetype } = req.file;

        // Proses penyimpanan file ke Google Cloud Storage
        const newFileName = `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}-${originalname}`;
        const blob = bucket.file(newFileName);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: mimetype,
          },
        });

        blobStream.on('error', (err) => {
          console.error(err);
          res.status(500).json({ error: 'Failed to upload file' });
        });

        blobStream.on('finish', async () => {
          try {
            const fileUrl = `https://storage.googleapis.com/${bucket.name}/${newFileName}`;

            // Simpan informasi event ke database
            const event = await Event.create({
              name,
              location,
              date,
              poster: fileUrl,
              status,
              userId,
              genre
            });

            // Tangani jenis event (Audition atau Live)
            if (type === 'Audition') {
              const {
                startDate,
                endDate,
                auditionNeeds,
                salary,
                requirements,
                numberOfMusicians,
                auditionStatus,
              } = req.body;

              const auditionEvent = await AuditionEvent.create({
                startDate,
                endDate,
                auditionNeeds,
                salary,
                requirements,
                numberOfMusicians,
                auditionStatus,
                eventId: event.id,
              });

              res.status(201).json({ event, auditionEvent });
            } else if (type === 'Live') {
              const { eventDate, ticketPrice, eventsCapacity, liveStatus } =
                req.body;

              const liveEvent = await LiveEvent.create({
                eventDate,
                ticketPrice,
                eventsCapacity,
                liveStatus,
                eventId: event.id,
              });

              res.status(201).json({ event, liveEvent });
            } else {
              res.status(400).json({ error: 'Invalid event type' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create event' });
          }
        });

        blobStream.end(buffer);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  },
  updateEvent: async (req, res) => {
    try {
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

      // Proses pengunggahan file dengan middleware multer
      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: err.message });
        }

        // Lanjutkan dengan logika bisnis setelah pengunggahan file berhasil
        const { name, location, date, status } = req.body;

        let type = status;

        // Hapus gambar poster lama jika ada
        if (req.file) {
          const { originalname, buffer, mimetype } = req.file;

          // Proses penyimpanan file ke Google Cloud Storage
          const newFileName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
          )}-${originalname}`;
          const blob = bucket.file(newFileName);
          const blobStream = blob.createWriteStream({
            metadata: {
              contentType: mimetype,
            },
          });

          blobStream.on('error', (err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to upload file' });
          });

          blobStream.on('finish', async () => {
            try {
              const fileUrl = `https://storage.googleapis.com/${bucket.name}/${newFileName}`;

              // Hapus gambar poster lama jika ada
              if (event.poster) {
                const oldPosterName = event.poster.split('/').pop();
                const oldPosterFile = bucket.file(oldPosterName);
                await oldPosterFile.delete();
              }

              // Update data event
              event.name = name;
              event.location = location;
              event.date = date;
              event.poster = fileUrl;
              event.status = status;
              await event.save();

              // Hapus juga data terkait dari tabel AuditionEvent dan LiveEvent (jika ada)
              await AuditionEvent.destroy({ where: { eventId: id } });
              await LiveEvent.destroy({ where: { eventId: id } });

              // Tangani jenis event (Audition atau Live)
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

                res.status(200).json({ event, auditionEvent });
              } else if (type === 'Live') {
                const { eventDate, ticketPrice, eventsCapacity, liveStatus } =
                  req.body;

                const liveEvent = await LiveEvent.create({
                  eventDate,
                  ticketPrice,
                  eventsCapacity,
                  liveStatus,
                  eventId: event.id,
                });

                res.status(200).json({ event, liveEvent });
              } else {
                res.status(400).json({ error: 'Invalid event type' });
              }
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Failed to update event' });
            }
          });

          blobStream.end(buffer);
        } else {
          // Jika tidak ada file yang diunggah, hanya update data event
          event.name = name;
          event.location = location;
          event.date = date;
          event.status = status;
          await event.save();

          // Hapus juga data terkait dari tabel AuditionEvent dan LiveEvent (jika ada)
          await AuditionEvent.destroy({ where: { eventId: id } });
          await LiveEvent.destroy({ where: { eventId: id } });

          // Tangani jenis event (Audition atau Live)
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

            res.status(200).json({ event, auditionEvent });
          } else if (type === 'Live') {
            const { eventDate, ticketPrice, eventsCapacity, liveStatus } =
              req.body;

            const liveEvent = await LiveEvent.create({
              eventDate,
              ticketPrice,
              eventsCapacity,
              liveStatus,
              eventId: event.id,
            });

            res.status(200).json({ event, liveEvent });
          } else {
            res.status(400).json({ error: 'Invalid event type' });
          }
        }
      });
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
        const posterFileName = event.poster.split('/').pop();
        const posterFileRef = bucket.file(posterFileName);
        await posterFileRef.delete();
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
