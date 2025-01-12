
const DriverLoginModel = require('../models/Driver.model')
const jwt = require('jsonwebtoken')

const DriverLoginController = async function (req ,res) {
    try {
        const {BusNumber , DriverID} = req.params
        const Driver = await DriverLoginModel.findOne({
            BusNumber
        })
        if(!Driver)
            return res.status(400).json({error : "BusNumber or DriverID is Incorrect"})

        if(Driver.DriverID !== DriverID)
            return res.status(400).json({error:"BusNumber or DriverID is Incorrect"})
        
        
        // Generate JWT token
        const Drivertoken =jwt.sign({ DriverId: Driver._id }, process.env.JWT_SECRET, {
            expiresIn: '24h', // Token expiration
        });
        // Set cookie with token
        res.cookie('Drivertoken', Drivertoken, {
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
        const {Name , BusNumber , Start ,Destination , DriverID , PhoneNumber} = req.body;
        
        const Driver = await DriverLoginModel.create({
            Name,
            BusNumber,
            Start,
            Destination,
            PhoneNumber,
           DriverID
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
