const mongoose = require('mongoose')
const schema = mongoose.Schema

const dbRegister = new schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    }
})

module.exports = mongoose.model('dbAdmin', dbRegister)