const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, createUser, deleteUser} = require('../controllers/userController.js')

router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.post("/", createUser)
router.patch("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router