const express = require('express')
const router = express()
const {DriverLoginController,DriverRegisterController,DriverLogoutController,GetDriverDataController,UpdateDriverDataController,AddRoutesController} = require('../Controllers/driver.controller')
router.post( '/login/:BusNumber/:Password', DriverLoginController)
router.post('/register', DriverRegisterController)
router.get('/logout',DriverLogoutController)
router.get('/getdriverdata/:BusNumber',GetDriverDataController)
router.post('/updateDriverdata/:DriverID',UpdateDriverDataController)
router.post('/addRoutes/:DriverID',AddRoutesController)

module.exports = router