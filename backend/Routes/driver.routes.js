const express = require('express')
const router = express()
const {DriverLoginController,DriverRegisterController} = require('../Controllers/driver.controller')
router.get( '/login/:BusNumber/:Password', DriverLoginController)
router.post('/login', DriverRegisterController)

module.exports = router