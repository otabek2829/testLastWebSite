const mongoose = require('mongoose')
const schema = mongoose.Schema

const cardModels = new schema({
    title : {
        type : String,
        required : true
    },
    bodyText : {
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    } ,
    timeData : {
        type  :String,
        default : ""
    }
})
module.exports = mongoose.model('cards ', cardModels)