const express = require('express');
const router = express.Router();
const { register, login, verify } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.get('/verify/:id', verify);

module.exports = router;
