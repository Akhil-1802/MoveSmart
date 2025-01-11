const mongoose = require('mongoose')


const Feedback = new mongoose.Schema({
    BusNumber : {
        type : String,
        required : true
    },
    Experience : {
        type : String ,
        required : true
    },
    DriverBehaviour : {
        type : String ,
        required :true
    },
    Helpful : {
        type : String ,
        required :true
    },
    Suggestions : {
        type : String ,
        required :true
    },
   
},{timestamps :true})

const FeedbackModel = mongoose.model('Feedback',Feedback);

module.exports = FeedbackModel