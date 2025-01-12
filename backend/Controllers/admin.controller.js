const {admindetails} = require('../admindetails/admindetails')
const SOSmodel = require('../models/SOS.model')

const AdminLoginController = async(req,res) =>{
    try {
        const {adminName , adminId} = req.params
        const Admin = admindetails.filter((item)=>(item.adminName === adminName))
        if(!Admin)
            return res.status(400).json({error:"Admin Id or Name is incorrect"})
        if(!(Admin[0].adminId === adminId)){
            return res.status(400).json({error:"Admin Id or Name is incorrect"})
        }
        res.status(200).json({message:"Admin login",Admin})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}
const GetIssueController = async(req,res) => {
    try {
        const Issues = await SOSmodel.find({})
        if(!Issues) return res.status(400).json({error:"Issues not find or no issues"})

        res.status(200).json({message : "Issues found",Issues})
    } catch (error) {
        
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}

const CompleteIssueController = async (req,res) => {
    try {
        const {id} = req.params
        const Issue = await SOSmodel.updateOne({
            _id : id
        }
    ,{
        Completed : true
    })

        res.status(200).json({message :"Updated Successfully"})
    } catch (error) {
        
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}
const DeleteIssueController = async (req,res) => {
    try {
        const {id} = req.params
        const Issue = await SOSmodel.deleteOne({
            _id : id
        })

        res.status(200).json({message :"Deleted Successfully"})
    } catch (error) {
        
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}
module.exports={AdminLoginController , GetIssueController ,CompleteIssueController,DeleteIssueController}