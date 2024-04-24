const Room = require('../models/roomModel');

//--A function for adding a new Room
const addRoom = async (req, res) => {
    //-trycatch
    try {
        const newroom = new Room(req.body) //--getting requeste from body
        await newroom.save() //--save data on DB

        return res.send({ Message: 'New Room Added Successfully', Room: newroom })

    } catch (error) {
        return res.status(400).json({ error })
    };
};

//--A function for Getting All Rooms
const getAllRooms = async (req, res)=>{
    try {
        const rooms = await Room.find({});  //--finding rooms from DB
        res.status(200).send(rooms);
    } 
    catch (error) {
        return res.status(400).send({message: error})
    };
};

//--A function for Getting Only One Room
const getOneRoom = async (req, res)=>{
    try {
        const {_id} = req.body  //--distructure _id for find one by Id

        const room = await Room.findOne({_id}); //--find One

        res.status(200).send({message:"Room Find", Room: room});
    } 
    catch (error) {
        return res.status(400).send({message: error})
    };
};

module.exports = { addRoom, getAllRooms, getOneRoom }