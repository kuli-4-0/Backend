const models = require('../models');
const { User } = models;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configAuth = require('../config/auth.js');
const {
  sendVerificationEmail,
} = require('../middleware/sendVerifycationEmail');
const { decryptID } = require('../helpers/encryptedID');
require('dotenv').config();

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      console.log(name, email, password, confirmPassword);

      // Check if email already exists
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Match password
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: 'Password and confirm password do not match' });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({ name, email, password: hash });
      // Assume sendVerificationEmail function is defined and works correctly
      await sendVerificationEmail(email, user.id);

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Failed to send email', error: err.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(401)
          .json({ error: 'Email or password is incorrect' });
      }

      if (!user.isVerified) {
        return res.status(403).json({
          error: 'Email is not verified, please verify it before logging in',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        configAuth.jwt_secret,
        { expiresIn: '1d' }
      );

      res.json({ message: 'Logged in successfully', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An internal server error occurred',
        message: err.message,
      });
    }
  },
  verify: async (req, res) => {
    const { id } = req.params;

    try {
      const id2 = decryptID(id);
      const user = await User.findByPk(id2);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.isVerified = true;
      await user.save();

      res.json({ message: 'Email verified successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  },
  resendVerification: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await sendVerificationEmail(email, user.id);

      res.json({ message: 'Verification email has been resent' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  },
  logout: async (req, res) => {
    localStorage.removeItem('token');
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: 'Tidak dapat logout' });
      res.status(200).json({ msg: 'Anda telah logout' });
    });
  },
  me: async (req, res) => {
    const { token } = req.body;
    try {
      let { id, name, email, role } = jwt.verify(token, configAuth.jwt_secret);
      res.status(200).json({ id, name, email, role });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
