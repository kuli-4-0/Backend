const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verify,
  resendVerification,
} = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.get('/verify/:id', verify);
router.post('/resendverify', resendVerification);

module.exports = router;
