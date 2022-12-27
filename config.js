require('dotenv').config();


const {env} = process;
module.exports ={ 
    MONGODB_PASSWORD : env.MONGODB_PASSWORD
}