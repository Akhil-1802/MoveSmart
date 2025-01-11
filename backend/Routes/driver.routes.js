const express = require('express')
const router = express()
const {DriverLoginController,DriverRegisterController,DriverLogoutController} = require('../Controllers/driver.controller')
router.post( '/login/:BusNumber/:DriverID', DriverLoginController)
router.post('/register', DriverRegisterController)
router.get('/logout',DriverLogoutController)
module.exports = router