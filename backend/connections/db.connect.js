const mongoose = require('mongoose')

function Connect () {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connection Successful")
    })
    .catch((error)=>{
        console.log(error)
    })
}


module.exports = Connect