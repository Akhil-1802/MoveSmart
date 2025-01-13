const AdminModel = require("../models/Admin.model");
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
    const Issues = await SOSmodel.find({});
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
      from: "satendrakaushik2002@gmail.com",
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

module.exports = {
  AdminLoginController,
  GetIssueController,
  CompleteIssueController,
  DeleteIssueController,
  AdminRegisterController,
  
};
