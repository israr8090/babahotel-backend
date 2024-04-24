const mongoose = require('mongoose');

//--async function for creation of connection with DataBase
const connectAsyncAwait = async () => {
    try {
        const resp = await mongoose.connect(process.env.MONGO_URL);  ////--DB url from env
        console.log('connected with DB Successfully');
    } catch (error) {
        console.log(`Error Occored ${error}`)
    }
};

module.exports = connectAsyncAwait;