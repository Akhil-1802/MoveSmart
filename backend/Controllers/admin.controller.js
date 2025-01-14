const AdminModel = require("../models/Admin.model");
const AdminDriverModel = require("../models/AdminDriver.model");
const SOSmodel = require("../models/SOS.model");
const transporter = require('../nodemail')

const AdminRegisterController = async (req, res) => {
  try {
    const { Name, Password, Email } = req.body;
    const findAdmin = await AdminModel.findOne({
      Email: Email,
    });
    if (findAdmin)
      return res.status(400).json({ error: "Admin Already exists" });
    const Admin = await AdminModel.create({
      Name,
      Password,
      Email,
    });
    res.status(200).json({ message: "Admin created", Admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const AdminLoginController = async (req, res) => {
  try {
    const { Email, Password } = req.params;
    const Admin = await AdminModel.findOne({
      Email: Email,
    });
    if (!Admin)
      return res.status(400).json({ error: "Admin or Password is incorrect" });

    if (Admin.Password === Password)
      return res.status(200).json({ message: "Admin login", Admin });
    else
      return res.status(400).json({ error: "Admin or Password is incorrect" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const GetIssueController = async (req, res) => {
  try {
    const { Email } = req.params
    const Issues = await SOSmodel.find({
      AdminEmail:Email
    });
    if (!Issues)
      return res.status(400).json({ error: "Issues not find or no issues" });

    res.status(200).json({ message: "Issues found", Issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const CompleteIssueController = async (req, res) => {
  try {
    const { id, Name, Email, Issue: issue ,BusNumber} = req.params;
    const Issue = await SOSmodel.updateOne(
      {
        _id: id,
      },
      {
        Completed: true,
      }
    );
    const mailOptions = {
      from: "akhilmaindola18@gmail.com",
      to: Email,
      subject: `Issue : ${issue} Resolved`,
      text: `Hello ${Name},
                Your issue with ${BusNumber} is resolved , we will make sure that this thing will never happen again.
        Thank you for booking with us!`,
    };
    await transporter.sendMail(mailOptions);


    res.status(200).json({ message: "Email sent and Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const DeleteIssueController = async (req, res) => {
  try {
    const { id } = req.params;
    const Issue = await SOSmodel.deleteOne({
      _id: id,
    });

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const AdminDriverController = async (req,res) =>{

  try {
    const { Email} = req.params
    const {
      firstName,
      lastName,
      email,
      phone,
      licenseNumber,
      experience,
      busNumber
    } = req.body
    const FindDriver = await AdminDriverModel.findOne({
      BusNumber:busNumber
    })
    if(FindDriver) return res.status(400).json({error : "Driver Already exists"})

    const Driver = await AdminDriverModel.create({
      FirstName :firstName,
      LastName :lastName,
      Email:email,
      PhoneNumber:phone,
      LicenseNumber:licenseNumber,
      Experience:experience,
      BusNumber:busNumber,
      AdminEmail:Email
    })
    if(!Driver)
      return res.status(400).json({error:"AdminDriver Not created"})
    res.status(200).json({message : "AdminDriver Created",Driver})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    
  }
}
const GetAdminDriversController = async (req,res) =>{
  try {
    const { Email }= req.params
    const Drivers = await AdminDriverModel.find({
      AdminEmail : Email
    },
  {FirstName:1,LastName:1,Email:1,PhoneNumber:1,BusNumber:1})

  res.status(200).json({message:"Drivers Found",Drivers})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    
  }
}
module.exports = {
  AdminLoginController,
  GetIssueController,
  CompleteIssueController,
  DeleteIssueController,
  AdminRegisterController,
  AdminDriverController,
  GetAdminDriversController
  
};
