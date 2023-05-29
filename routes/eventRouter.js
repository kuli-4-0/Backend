const express = require('express');
const upload = require('../middleware/multerConfig.js');

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventByUserId,
  getAllLiveEvents,
} = require('../controllers/eventController.js');
const { verifyToken, authorizeRoles } = require('../middleware/authUser.js');
const {
  createAuditionRegistration,
} = require('../controllers/auditionRegistration.js');
const router = express.Router();

router.get(
  '/',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer', 'user']),
  getAllEvents
);
router.get(
  '/live',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer', 'user']),
  getAllLiveEvents
);
router.get(
  '/audition',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  getAllEvents
);
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
  upload.single('poster_event'),
  createEvent
);
router.post(
  '/:auditionEventId/audition-registrations',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  upload.single('photo'),
  createAuditionRegistration
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
