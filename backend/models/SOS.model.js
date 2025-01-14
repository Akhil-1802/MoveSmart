const mongoose = require('mongoose')


const SOS = new mongoose.Schema({
    BusNumber : {
        type : String,
        required : true
    },
    Name : {
        type : String ,
        required : true
    },
    Issue : {
        type : String ,
        required :true
    },
    Email : {
        type : String ,
        required :true
    },
    Completed:{
        type:Boolean,
        default:false

    },
    AdminEmail : {
        type: String,
        required :true
    }
},{timestamps :true})

const SOSmodel = mongoose.model('SOS',SOS);

module.exports = SOSmodel