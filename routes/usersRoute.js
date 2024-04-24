const express = require('express');
const router = express.Router();
const {register, login, getAllUsers} = require('../controllers/usersControl')

////--new user register route
router.post("/register", register);

////--login user
router.post("/login", login);

//////--get All users
router.get("/allusers", getAllUsers)

module.exports = router;

////--------------------------------------------------------------