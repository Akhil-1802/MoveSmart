const mongoose = require('mongoose')


const AdminDriver = new mongoose.Schema({
   FirstName:{
    type :String,
    required:true
   },
   LastName:{
    type :String,
    required:true
   },
   Email:{
    type :String,
    required:true
   },
   PhoneNumber:{
    type :String,
    required:true
   },
   LicenseNumber:{
    type :String,
    required:true
   },
   Experience:{
    type :String,
    required:true
   },
   BusNumber:{
    type :String,
    required:true
   },
   AdminEmail:{
    type :String,
    required:true
   },
   
},{timestamps :true})

const AdminDriverModel = mongoose.model('AdminDriver',AdminDriver);

module.exports = AdminDriverModel