// const userModel = require('../models/userModel');
// const jwt = require('jsonwebtoken');

// module.exports = async function isLoggedIn(req, res){
//     if(!req.cookies.token){
//         req.flash('error', "You should be logged in first!");
//         return res.redirect('/');
//     }

//     try{
//         let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
//         let user = await userModel.findOne({email: decoded.email}).select('-password');
//         req.user = user;
//         next();
//     }
//     catch(err){
//         req.flash('error', "Something went wrong");
//         res.redirect('/');
//     }
// }


const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async function isLoggedIn(req, res, next) {
    if (!req.cookies || !req.cookies.token) {
        req.flash('error', "You should be logged in first!");
        return res.redirect('/');
    }

    try {
        // Verify the token
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Find the user from the token
        let user = await userModel.findOne({ email: decoded.email }).select('-password');

        if (!user) {
            req.flash('error', "Invalid token or user not found.");
            return res.redirect('/');
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (err) {
        console.error(err); // Log the error for debugging
        req.flash('error', "Something went wrong. Please log in again.");
        return res.redirect('/');
    }
};
