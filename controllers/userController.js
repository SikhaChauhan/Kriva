const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/token');

module.exports.registerUser = async function(req, res){
    try {
        let { fullName, email, password} = req.body;
        // Check if any of the required fields are missing
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "There was an error creating the user"
            });
        }
        let user = await userModel.findOne({email});
        if(user) return res.status(401).send("User already exists!");

        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                    fullName, 
                    email, 
                    password: hash, 
                    // cart, 
                    // orders, 
                    // contact, 
                    // pictures
                });
                let token = generateToken(user);
                res.cookie("token", token);
                res.send("User created successfully!");
                }
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "There was an error creating the user",
            error: error.message,
        });
    }
}