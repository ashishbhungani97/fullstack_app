const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/userdata?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongooseURI, () =>{
        console.log('connect to mongo successfully !');
    })
}

module.exports = connectToMongo;