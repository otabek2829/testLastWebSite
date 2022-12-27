const mongoose = require('mongoose')
const schema = mongoose.Schema

const vakansiyaModel = new schema({
    title : {
        type : String,
        default : ""
    },
    // Обязанности
    responsiblites : {
        type : String,
        default : ""
    },
    // Требования
    requirements :{
        type : String,
        default : ""
    } ,
    // Условия 
    conditions : {
        type : String,
        default : ""
    },
    // График работы
    workTime : {
        type : String,
        default : ""
    }
})
module.exports = mongoose.model('ВАКАНСИИ ', vakansiyaModel)