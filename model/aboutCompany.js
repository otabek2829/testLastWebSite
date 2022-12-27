const mongoose = require('mongoose')
const scheme = mongoose.Schema

const aboutCompany = new scheme({
    img : {
        type : String,
        required : true
    },
    client : {
        type : String,
        required  : true
    },
    bodyText : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    }
   
})

module.exports = mongoose.model('НАШИ ПРЕИМУЩЕСТВА', aboutCompany)