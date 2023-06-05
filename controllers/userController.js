const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

module.exports = {
  testRoute: async (req, res) => {
    try {
      res.status(200).json({ test: 'test' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      // find
      const data = await User.findAll();
      // if data null
      if (data === null) {
        res.status(404).json({ msg: 'Data not found' });
      } else {
        // res data
        res.status(200).json({ data });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      // get params id
      const { id } = req.params;
      // find one
      const data = await User.findOne({ where: { id } });
      // if data null
      if (data === null) {
        res.status(404).json({ msg: 'Data not found' });
      } else {
        // res data
        res.status(200).json({ data });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      // get data
      let { name, email, password, role } = req.body;
      // hash password
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      password = hash;
      // Memvalidasi nilai "role" sebelum membuat user
      if (
        ![
          'admin',
          'user',
          'musisi',
          'penyedia_jasa',
          'event_organization',
        ].includes(role)
      ) {
        return res.status(400).json({ error: 'Invalid role value' });
      }
      // create user
      await User.create({ name, email, password, role });
      res.status(201).json({ msg: 'User Created Successfuly' });
    } catch (error) {
      console.log(error);
      if (error.errors[0].type == 'Validation error') {
        res.status(400).json({ msg: error.message });
      } else if (error.errors[0].type == 'unique violation') {
        res.status(500).json({ msg: 'email telah terdaftar' });
      } else {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  updateUser: async (req, res) => {
    try {
      // find one
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!user) return res.status(404).json({ msg: 'Data tidak ditemukan' });
      // ambil body
      const { name, email, password, role, isVerified } = req.body;
      await User.update(
        { name, email, password, role, isVerified },
        {
          where: {
            id: user.id,
          },
        }
      );

      res.status(200).json({ msg: 'User updated successfuly' });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const row = await User.findOne({
        where: { id: req.params.id },
      });
      if (row) {
        await row.destroy(); // deletes the row
      }
      res.status(200).json({ msg: 'User berhasil di hapus' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
