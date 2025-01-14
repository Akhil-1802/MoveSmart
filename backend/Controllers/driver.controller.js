const DriverLoginModel = require("../models/Driver.model");
const jwt = require("jsonwebtoken");
function generateRandomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}
const DriverLoginController = async function (req, res) {
  try {
    const { BusNumber, Password } = req.params;
    const Driver = await DriverLoginModel.findOne({
      BusNumber,
    });
    if (!Driver)
      return res
        .status(400)
        .json({ error: "BusNumber or Password is Incorrect" });

    if (Driver.Password !== Password)
      return res
        .status(400)
        .json({ error: "BusNumber or Password is Incorrect" });

    // Generate JWT token
    const Drivertoken = jwt.sign(
      { DriverId: Driver._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // Token expiration
      }
    );
    // Set cookie with token
    res.cookie("Drivertoken", Drivertoken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Success", Driver });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
const DriverRegisterController = async (req, res) => {
  try {
    const {
      Name,
      BusName,
      BusNumber,
      PhoneNumber,
      from,
      to,
      shiftstart,
      shiftend,
      seat,
      Password,
      Email
    } = req.body;
    const Bus = await DriverLoginModel.findOne({
      BusNumber,
    });
    if (Bus) return res.status(400).json({ error: "Bus Already Exists" });

    const DriverID = generateRandomCode();
    const Driver = await DriverLoginModel.create({
      Name,
      BusName,
      BusNumber,
      PhoneNumber,
      from,
      to,
      shiftstart,
      shiftend,
      seat,
      DriverID,
      Password,
      Email
    });
    if (!Driver) {
      return res.status(400).json({ error: "Not able to register" });
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
const DriverLogoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

const GetDriverDataController = async (req, res) => {
  try {
    const { BusNumber } = req.params;
    const Driver = await DriverLoginModel.findOne({
      BusNumber,
    });
    if (!Driver)
      return res
        .status(400)
        .json({ error: "Driver data does not exist in server" });
    res.status(200).json({ message: "Driver data found", Driver });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
const UpdateDriverDataController = async (req, res) => {
  try {
    const { DriverID } = req.params;
    const { seat, BusStatus } = req.body;
    const Driver = await DriverLoginModel.updateOne(
      {
        DriverID,
      },
      {
        seat,
        BusStatus,
      }
    );
    if(!Driver.acknowledged) return res.status(400).json({error : "Driver details not updated"})
    res.status(200).json({message:"DriverDetails Updated"})
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
const AddRoutesController = async (req,res)=>{
    try {
      const {DriverID} = req.params
      const {routes} = req.body
      const Driver = await DriverLoginModel.updateOne(
        {
          DriverID,
        },
        {
          Routes:routes,
        }
      );
      const DriverData = await DriverLoginModel.findOne({
        DriverID
      })
      if(!Driver.acknowledged) return res.status(400).json({error : "Driver details not updated"})
      res.status(200).json({message:"Driver Routes Updated",DriverData})
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
      
    }
  }
module.exports = {
  DriverLoginController,
  DriverRegisterController,
  DriverLogoutController,
  GetDriverDataController,
  UpdateDriverDataController,
  AddRoutesController
};
