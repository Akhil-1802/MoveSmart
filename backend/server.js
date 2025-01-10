const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const MongoDBConnection = require('./connections/db.connect')
const PORT = process.env.PORT || 8000
const driverRoutes = require('./Routes/driver.routes')
app.use(express.json())
app.use('/driver',driverRoutes)

app.listen(PORT,()=>{
    MongoDBConnection()
    console.log(`App is listening at ${PORT}`)
})
