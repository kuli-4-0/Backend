const express = require('express');
const upload = require('../middleware/multerConfig.js');

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventByUserId,
} = require('../controllers/eventController.js');
const {
  authorizeEventOrganizer,
  authorizeAdmin,
  verifyToken,
  authorizeRoles,
} = require('../middleware/authUser.js');
const router = express.Router();

router.get('/', verifyToken, authorizeRoles(['admin']), getAllEvents);
router.get('/:id', verifyToken, authorizeRoles(['admin']), getEventById);
router.get(
  '/user/:userId',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  getEventByUserId
);
router.post(
  '/',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  upload.single('poster'),
  createEvent
);
router.patch(
  '/:id',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  upload.single('poster'),
  updateEvent
);
router.delete(
  '/:id',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  deleteEvent
);

module.exports = router;
