const express = require('express');
const router = express.Router();

const Room = require('../models/roomModel');
const Booking = require('../models/bookingModel');

////--Booking Room--
router.post('/bookroom', async (req, res) => {
    //--destructuring
    const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;
    // console.log(req.body)

    try {
        const newbooking = new Booking({
            room: room.name, 
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays, 
            transactionId: '123'
        });



        //--storing in booking var of booking room and save in DB
        const booking =await newbooking.save(); 

        //--A temp room making for storing in currentbooking array of room
        const roomtemp = await Room.findOne({_id: room._id}); //--find One

        roomtemp.currentbookings.push({
            bookingid: booking._id, 
            fromdate: fromdate, 
            todate: todate,
            userid: userid,
            status: booking.status
        });

        // //-- saving in DB
        await roomtemp.save();
        res.status(201).send({message:'Room Booked Successfully', booking:booking})
    }
     catch (error) { 
       return res.status(404).send(error)
    };   
});

module.exports = router;