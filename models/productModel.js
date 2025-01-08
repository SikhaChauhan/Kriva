const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Array,
        default: []
    },
    bgColor: String,
    panelColor: String,
    textColor: String
});

module.exports = mongoose.model('product', productSchema);