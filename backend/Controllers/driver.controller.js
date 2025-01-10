const bcrypt = require('bcrypt')
const DriverLoginModel = require('../models/Driver.model')


const DriverLoginController = async function (req ,res) {
    try {
        const {BusNumber , Password} = req.params
        const Driver = await DriverLoginModel.findOne({
            BusNumber
        })
        if(!Driver)
            return res.status(400).json({error : ""})
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

module.exports ={DriverLoginController,DriverRegisterController}
