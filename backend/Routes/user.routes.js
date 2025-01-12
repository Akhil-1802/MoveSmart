const express = require('express')
const router = express()
const {FeedbackController,UserLoginController,UserRegisterController} = require('../Controllers/user.controller')
router.post('/feedback',FeedbackController)
router.post('/login/:Email/:Password',UserLoginController)
router.post('/register',UserRegisterController)

module.exports = router