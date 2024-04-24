const express = require('express');
const router = express.Router();

const {addRoom, getAllRooms, getOneRoom} = require('../controllers/roomsControl')

//////--post--Create A New Room
router.post('/addroom', addRoom);

////--get all Rooms---
router.get("/allrooms", getAllRooms); 


////--get one Room by id
router.post("/oneroom", getOneRoom);

module.exports = router;

