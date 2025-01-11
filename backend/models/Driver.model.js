const mongoose = require('mongoose')


const DriverLogin = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    BusNumber : {
        type : String ,
        required : true
    },
    Start : {
        type : String ,
        required :true
    },
    Destination : {
        type : String ,
        required :true
    },
    DriverID : {
        type : String ,
        required :true
    },
    PhoneNumber : {
        type : String ,
        required :true
    }
},{timestamps :true})

const DriverLoginModel = mongoose.model('Driver',DriverLogin);

module.exports = DriverLoginModel