const mongoose = require('mongoose')
const FeedbackModel = require('../models/feedback.model')



const FeedbackController = async( req , res) =>{
    try {
        const { BusNumber ,Experience , DriverBehaviour , Helpful , Suggestions} = req.body
        const Feedback = await FeedbackModel.create({
            BusNumber,
            Experience,
            Helpful,
            DriverBehaviour,
            Suggestions
        })
        if(!Feedback)
            return res.status(400).json({error : "Feedback not submitted"})
        res.status(200).json({message : "Feedback Submitted"})
    } catch (error) {
        res.status(500).json({error : "Internal server error"})
        console.log(error)
    }
}



module.exports = { FeedbackController }