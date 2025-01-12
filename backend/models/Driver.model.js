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
    BusName : {
        type : String ,
        required : true
    },
    from : {
        type : String ,
        required :true
    },
    to : {
        type : String ,
        required :true
    },
    departure : {
        type : String ,
        required :true
    },
    seat : {
        type : Number ,
        required :true
    },
    DriverID:{
        type:String,
        required : true
    },
    Password:{
        type:String,
        required : true
    },
},{timestamps :true})

const DriverLoginModel = mongoose.model('Driver',DriverLogin);

module.exports = DriverLoginModel