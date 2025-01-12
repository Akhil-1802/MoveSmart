const express = require('express')
const router = express()
const {FeedbackController,UserLoginController,UserRegisterController,SOSController} = require('../Controllers/user.controller')
router.post('/feedback',FeedbackController)
router.post('/login/:Email/:Password',UserLoginController)
router.post('/register',UserRegisterController)
router.post('/sos',SOSController)
module.exports = router