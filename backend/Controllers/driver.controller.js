const bcrypt = require('bcrypt')
const DriverLoginModel = require('../models/Driver.model')
const jwt = require('jsonwebtoken')

const DriverLoginController = async function (req ,res) {
    try {
        const {BusNumber , Password} = req.params
        const Driver = await DriverLoginModel.findOne({
            BusNumber
        })
        if(!Driver)
            return res.status(400).json({error : "BusNumber or Password is Incorrect"})

        const ComparePassword = await bcrypt.compare(Password,Driver.Password)
        if(!ComparePassword)
            return res.status(400).json({error:"BusNumber or Password is Incorrect"})
        
        
        // Generate JWT token
        const token =jwt.sign({ DriverId: Driver._id }, process.env.JWT_SECRET, {
            expiresIn: '24h', // Token expiration
        });
        // Set cookie with token
        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({message:"Success",Driver})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log(error)
    }
}
const DriverRegisterController = async (req,res) =>{
    try {
        const {Name , BusNumber , Start ,Destination , Password , PhoneNumber} = req.body;
        const hashedPassword = await bcrypt.hash(Password , 10);
        const Driver = await DriverLoginModel.create({
            Name,
            BusNumber,
            Start,
            Destination,
            PhoneNumber,
            Password : hashedPassword
        })
        if(!Driver){
            return res.status(400).json({error:"Not able to register"})
        }
        res.status(200).json({message:"Success"})

    } catch (error) {
        
        res.status(500).json({error:"Internal Server Error"})
        console.log(error)
    }
}
const DriverLogoutController = async (req,res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({message : "Logout Successful"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log(error)
    }
}
module.exports ={DriverLoginController,DriverRegisterController,DriverLogoutController}
