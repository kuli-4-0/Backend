const express = require('express');
const upload = require('../middleware/uploadFileToGCS.js');

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventByUserId,
  getAllLiveEvents,
  getLiveEventsById,
} = require('../controllers/eventController.js');
const { verifyToken, authorizeRoles } = require('../middleware/authUser.js');
const {
  createAuditionRegistration,
} = require('../controllers/auditionRegistration.js');
const {
  createLiveRegistration,
  getAllLiveRegistrationsByUserId,
} = require('../controllers/liveRegistration.js');
const { testRoute } = require('../controllers/userController.js');
const uploadFileToGCS = require('../middleware/uploadFileToGCS.js');
const eventController = require('../controllers/eventController.js');

const router = express.Router();

// Event routes
router.get(
  '/',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer', 'user']),
  getAllEvents
);
router.get(
  '/live/live-registrations/:userId',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer', 'user']),
  getAllLiveRegistrationsByUserId
);
router.get(
  '/live/:eventId',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer', 'user']),
  getLiveEventsById
);
router.get(
  '/live',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer', 'user']),
  getAllLiveEvents
);
router.post(
  '/live/:eventId/live-registrations',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer', 'user']),
  createLiveRegistration
);
router.get(
  '/audition',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  getAllEvents
);
router.get(
  '/user',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  getEventByUserId
);
router.get('/:id', verifyToken, authorizeRoles(['admin']), getEventById);
// router.post(
//   '/',
//   verifyToken,
//   authorizeRoles(['admin', 'event_organizer']),
// upload.single('poster_event'),
//   createEvent
// );
router.post(
  '/',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  eventController.createEvent
);
router.post(
  '/:auditionEventId/audition-registrations',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  // upload.single('photo'),
  createAuditionRegistration
);
router.patch(
  '/:id',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  // upload.single('poster'),
  updateEvent
);
router.delete(
  '/:id',
  verifyToken,
  authorizeRoles(['admin', 'event_organizer']),
  deleteEvent
);

module.exports = router;
