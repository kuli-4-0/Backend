const configAuth = require('../config/auth.js');
const db = require('../models');
const User = db.User;
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
      req.user = decoded;
      next();
    });
  },
  authorizeRoles: (roles) => {
    // role: admin, user, event_organizer, musisi
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
      try {
        const decoded = jwt.verify(token, configAuth.jwt_secret);
        const { role } = decoded;
        if (!roles.includes(role)) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Menyimpan data user pada objek req
        next();
      } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid token' });
      }
    };
  },
};
