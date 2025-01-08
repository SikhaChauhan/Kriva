const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const generateToken = (user)=>{
    // token decode karte time user ki jo detail malum krni h use hi likhte h "jwt.sign" mein
    return jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY);
}


module.exports.generateToken = generateToken;