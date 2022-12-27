const multer = require('multer');
const moment = require('moment');



    const storage = multer.diskStorage ({
        destination : (req, file, cb) => {
            cb(null, 'public/images')
        },
        filename : (req, file , cb) => {
            const date = moment().format('MMM-Do-YY')
            cb(null, `${date}-${file.originalname}`)
        }
    })


    const checkExtname = ['image/jpg', 'image/png', 'image/jpeg']

    const filefilter =  (req, file, cb) => {
        if(checkExtname.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(null, false)
        }
    }

    module.exports = multer({
        storage,
        filefilter
    })