const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema ({
    name: String,
    isBest: Boolean,
    category: String,
    type: String, 
})

const food = mongoose.model('food', foodSchema); 

module.exports = food; 