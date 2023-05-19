const configAuth = require('../config/auth.js');

const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    if (!token) {
      return res.status(401).json({ msg: 'Mohon login ke akun anda!' });
    }
    jwt.verify(token, configAuth.jwt_secret, (err, decoded) => {
      if (err) return res.sendStatus(403);
      next();
    });
  },
  authorizeAdmin: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, configAuth.jwt_secret);
    const user = await User.findOne({ _id: decoded.id });
    if (!user)
      return res
        .status(404)
        .json({ message: 'User tidak ditemukan, silakan login sebagai admin' });
    if (user.role !== 'admin')
      return res.status(403).json({ message: 'Akses terlarang' });
    next();
  },
  authorizeEventOrganizer: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, configAuth.jwt_secret);
      const { role } = decoded;
      if (role !== 'event_organizer') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
  authorizeUser: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, configAuth.jwt_secret);
      const { role } = decoded;
      if (role !== 'user') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
  authorizeMusisi: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, configAuth.jwt_secret);
      const { role } = decoded;
      if (role !== 'musisi') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
};
