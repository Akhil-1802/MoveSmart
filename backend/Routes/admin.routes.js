const express = require ('express')
const router = express()
const {AdminLoginController}= require('../Controllers/admin.controller')
router.post('/login/:adminName/:adminId',AdminLoginController)

module.exports = router