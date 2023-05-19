const express = require('express');
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController.js');
const { authorizeEventOrganizer } = require('../middleware/authUser.js');
const router = express.Router();

router.get('/', authorizeEventOrganizer, getAllEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
