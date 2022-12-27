const mongoose = require('mongoose')
const scheme = mongoose.Schema

const sendResume = new scheme({
    name : {
        type : String,
    },
    category : {
        type : String,
    },
    phoneNumber :{
        type : String,
    } ,
    adressResume : {
        type : String
    },
    dateTime: {
        type : Date,
       default : Date.now()
    }
})
module.exports = mongoose.model('Oтправленное резюме ', sendResume)