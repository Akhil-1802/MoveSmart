const {admindetails} = require('../admindetails/admindetails')

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

module.exports={AdminLoginController}