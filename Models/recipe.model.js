const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
        },
    price:{
        type : Number,
        required: true
    }    
})

module.exports = mongoose.model('Recipe' , recipeSchema);