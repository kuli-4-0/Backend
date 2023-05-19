const db = require('../models');
const Event = db.Event;

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
      if (!req.user || req.user.id !== userId) {
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

      const event = await Event.create({
        name,
        location,
        date,
        poster,
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
      const { id } = req.params;
      const { name, location, date, poster, status } = req.body;

      const event = await Event.findOne({ where: { id } });
      if (!event) {
        res.status(404).json({ error: 'Event not found' });
      } else {
        event.name = name;
        event.location = location;
        event.date = date;
        event.poster = poster;
        event.status = status;
        await event.save();
        res.status(200).json({ data: event });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;

      const event = await Event.findOne({ where: { id } });
      if (!event) {
        res.status(404).json({ error: 'Event not found' });
      } else {
        await event.destroy();
        res.status(200).json({ message: 'Event deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  },
};
