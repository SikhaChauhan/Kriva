const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/token');
const {registerUser, loginUser, logoutUser} = require('../controllers/userController');



router.post('/register', registerUser);

router.get('/', (req,res)=>{
    res.send("Hey");
});

router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router;













