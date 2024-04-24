const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({

    name: { type: String, required: true },

    email: { type: String, required: true },

    phonenumber: { type: Number,  min: 10, required: true },

    password: { type: String, required: true },

    isAdmin: { type: Boolean, default: false } 

}, { timestamps: true });

//--securing password using bcrypt-- is has pre method---------- 
userSchema.pre("save", async function (next) {
    // console.log("pre Method" , this)  //--checking what in pre method got in this

    const user = this; //--storing this in user

    //--checking is password is also encrypted or not
    if (!user.isModified("password")) {
        next();
    }

    //-- if password is not encrypted then encrypting Proccess
    try {
        const saltRound = await bcrypt.genSalt(10); //saltRoind 

        //--using with hash(), epcrypted
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }
    catch (error) {
        console.log(error)
    }
});
////------------------------------------------------------

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;