const mongoose = require('mongoose');


const adminSchema = mongoose.Schema({
    fullName: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    products: {
        type: Array,
        // default: []
    },
    picture: String,
    gstIn: String
});

module.exports = mongoose.model('admin', adminSchema);