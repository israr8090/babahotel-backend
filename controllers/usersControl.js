const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

////--function for user Register--
const register = async (req, res) => {

    //--distructuring--
    const { name, email, phonenumber, password, cpassword } = req.body;

    //--checking password and confirm password are same or not--
    if (password === cpassword) {
        try {
            if (!name || !email || !phonenumber || !password) {
                return res.status(400).send({ message: "all fields are mandatory" });
            }

            //--Checking Email ID is Unique OR Not
            let user = await userModel.findOne({ email });

            //--checking is email allready registered of not--
            if (user) {
                return res.status(400).send({ message: "Email is already registered with us" });
            }

            //--saving data in DB
            const newUser = new userModel({ name, email, phonenumber, password });
            const resp = await newUser.save();

            //--returning result--
            return res.status(201).send({ message: "User Registered", user: resp });
        }
        catch (error) {
            //--if any error in try block then execute catch part
            return res.status(404).send(error);
        };
    } else {
        //--if password and confirm password are not same then--
        return res.status(404).send("password and Confirm password Not same Plz Correct It");
    }
};

////--function for user Login--
const login = async (req, res) => {
    //--trycatch 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("All Fieled Mendetory...")
        }

        //--findOne from DB with email & password
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(400).send("Email is Not Registered with Us...")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            // console.log(user)
            const temp = {
                name: user.name,
                email: user.email,
                phonenumber: user.phonenumber,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            return res.status(200).send({ message: "User Logedin Successfully...", user: temp });
        }
        else {
            return res.status(400).send('Invailed Cridential Please check password');
        }

    } catch (error) {
        return res.status(404).send(error);
    }




    ////------------------------------------------------------------------------------------------------------
    //--destructuring 
    // const { email, password } = req.body;
    // //--trycatch 
    // try {

    //     const user = await userModel.findOne({ email: email, password: password });  //--findOne from DB with email & password
    //     if (user) {
    //         // console.log(user)
    //         const temp = {
    //             name: user.name,
    //             email: user.email,
    //             isAdmin: user.isAdmin,
    //             _id: user._id
    //         }
    //         return res.status(201).send({ message: "User Logedin Successfully...", user: temp });
    //     }
    //     else {
    //         return res.status(400).send('Login faield');
    //     }

    // } catch (error) {
    //     return res.status(404).send(error);
    // }
};

////--function for Get All users--
const getAllUsers = async (req, res) => {
    //--trycatch 
    try {
        const users = await userModel.find(); //--find All users from DB

        res.status(200).send({message:"All Users details", user:users});

    } catch (error) {
        return res.status(404).send(error);
    }
};

//--------------------------------------------------------------------------------------------
module.exports = { register, login, getAllUsers };
////------------------------------------------------------------------------------------------