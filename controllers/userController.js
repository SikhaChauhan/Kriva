const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/token');
const flash = require('connect-flash');

module.exports.registerUser = async function(req, res){
    try {
        console.log(req.body); // Log the request body for debugging
        let { fullName, email, password, cart, orders, picture } = req.body;

        // Check if any of the required fields are missing
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields",
                missingFields: { fullName, email, password }
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
                    cart,
                    orders,
                    picture
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect('/users/login');
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


module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email: email });

        if (!user) {
            req.flash('error', "Email or password incorrect");
            return res.redirect('/');
        }

        // Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Generate a JWT token
            let token = generateToken(user);

            // Set the token in cookies
            res.cookie('token', token);
            res.redirect('/shop');
        } else {
            req.flash('error', "Email or password incorrect");
            res.redirect('/');
        }
    } catch (err) {
        console.error(err); // Log the error
        req.flash('error', "Something went wrong. Please try again.");
        res.redirect('/');
    }
};


module.exports.logoutUser = async function(req,res){
    res.cookie('token','');
    res.flash("Logged out successfully!");
    res.redirect('/');
}


