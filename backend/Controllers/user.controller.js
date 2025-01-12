const mongoose = require("mongoose");
const FeedbackModel = require("../models/feedback.model");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SOSmodel = require("../models/SOS.model");
const FeedbackController = async (req, res) => {
  try {
    const { BusNumber, Experience, DriverBehaviour, Helpful, Suggestions } =
      req.body;
    const Feedback = await FeedbackModel.create({
      BusNumber,
      Experience,
      Helpful,
      DriverBehaviour,
      Suggestions,
    });
    if (!Feedback)
      return res.status(400).json({ error: "Feedback not submitted" });
    res.status(200).json({ message: "Feedback Submitted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

const UserLoginController = async (req, res) => {
  try {
    const { Email, Password } = req.params;
    const User = await UserModel.findOne({
      Email,
    });
    if (!User)
      return res.status(400).json({ error: "Email or Password is incorrect" });
    const comparePassword = bcrypt.compare(User.Password, Password);
    if (!comparePassword)
      return res.status(400).json({ error: "Email or Password is incorrect" });

    // Generate JWT token
    const Usertoken = jwt.sign(
      { UserId: User._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // Token expiration
      }
    );
    // Set cookie with token
    res.cookie("Usertoken", Usertoken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login Success", User });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

const UserRegisterController = async function (req, res) {
  try {
    const { Name, Email, Phone, Password } = req.body;

    const findUser = await UserModel.findOne({
      Email,
    });

    if (findUser) return res.status(400).json({ error: "User already Exists" });

    const hashedPassword = await bcrypt.hash(Password, 10);
    const User = await UserModel.create({
      Name,
      Email,
      Phone,
      Password: hashedPassword,
    });
    if (!User) return res.status(400).json({ error: "User Not created" });
    res.status(200).json({ message: "User created Successfully", User });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
const SOSController = async (req , res) =>{
  try {
    const { Name , Email , BusNumber , Issue} = req.body
    const SOS = await SOSmodel.create({
      Name,
      BusNumber,
      Email,
      Issue
    })
    if(!SOS)
      return res.status(400).json({error : "SOS not created"})
    res.status(200).json({message : "SOS submitted",SOS})

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
}
module.exports = {
  FeedbackController,
  UserRegisterController,
  UserLoginController,
  SOSController
};
