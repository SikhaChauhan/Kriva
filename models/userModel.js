const mongoose = require('mongoose');
mongoose.connect('');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: String,
    picture: String,
});

module.exports = mongoose.model('user', userSchema);