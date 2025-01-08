const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

// or

// require('dotenv).config();                 // Load environment variables from .env file
// const dbgr = require('debug')(process.env.DEBUG || "development:mongoose");



mongoose.connect(`${config.get('MONGODB_URI')}/Kriva`).then(() => {
    // console.log() replaced with "dbgr"
    dbgr("Connected!");
}).catch((err) => {
    // console.log() replaced with "dbgr"
    dbgr(err.message);
});

module.exports = mongoose.connection;







