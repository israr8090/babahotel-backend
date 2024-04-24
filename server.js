require('dotenv').config()
const express = require('express');

//--requireing database file
const connectAsyncAwait = require('./detabase/db')

//--port for backend server
const port = process.env.PORT || 5000;

const app = express();

//--using json medalwhere for parsing get data
app.use(express.json());

app.use('/api/users', require('./routes/usersRoute'))
app.use('/api/rooms', require('./routes/roomRoute'))
app.use('/api/bookings', require('./routes/bookingRoute'))

app.get('/api',(req, res)=>{
    res.send("hello")
})

////--server starting and listening method
app.listen(port, ()=>{ 
    connectAsyncAwait() //--this method called from database file
    console.log(`Server Running on port ${port}`)
});