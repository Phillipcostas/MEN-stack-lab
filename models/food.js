const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema ({
    name: String,
    isBest: Boolean,
})

const food = mongoose.model('food', foodSchema); 

module.exports = food; 