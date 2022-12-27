
const mongoose = require('mongoose')
const scheme = mongoose.Schema
const ImageSchemas = new scheme({
    img : {
        type: String,
        required : true
    }
})
const CommandUsers = new scheme({
    img : {
        type: String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    expert : {
        type : String,
        required : true
    }
})
const webPortfolios = new scheme({
    img : {
        type: String,
        required : true
    },
    webAdress : {
        type : String,
        required : true
    },
    aboutText : {
        type : String,
        required : true
    }
})
const smmPortfolio = new scheme({
    img : {
        type: String,
        required : true
    }
})
const logoBanners = new scheme({
    img : {
        type: String,
        required : true
    }
})
const priceUslugies = new scheme({
    uslugiTitle : {
        type : String,
        required : true,
    },
    uslugiPrice :{ 
        type : Number,
        required : true
    },
    category : {
        type :String,
        required : true
    }

})

const webPortfolio = mongoose.model('webPortfolio', webPortfolios);
const smm = mongoose.model('SMM-продвижение', smmPortfolio);
const logoBanner = mongoose.model('Логотипы, баннера', logoBanners);
const CommandUser = mongoose.model('НАШ КОМАНДА', CommandUsers);
const ImageSchema = mongoose.model('НАШ КЛИЕНТЫ', ImageSchemas);
const priceUslugi = mongoose.model('УСЛУГЫ ЦЕНЫ ', priceUslugies);

module.exports = {
    webPortfolio,
    smm,
    logoBanner,
    CommandUser,
    ImageSchema,
    priceUslugi
}