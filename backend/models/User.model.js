const mongoose = require('mongoose')



const User = new mongoose.Schema({
    Name : {
        type : String ,
        required : true
    },
    Email : {
        type : String ,
        required : true
    },
    Phone : {
        type : String ,
        required :true
    },
    Password :{
        type : String ,
        required : true 
    }
})


const UserModel = mongoose.model('User',User)

module.exports = UserModel