const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verify,
  resendVerification,
  logout,
  me,
} = require('../controllers/authController');

router.post('/auth/login', login);
router.post('/auth/register', register);
router.get('/auth/verify/:id', verify);
router.post('/auth/resendverify', resendVerification);
router.delete('/auth/logout', logout);
router.post('/auth/me', me);

module.exports = router;
