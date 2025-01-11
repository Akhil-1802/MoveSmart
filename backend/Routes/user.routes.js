const express = require('express')
const router = express()
const {FeedbackController} = require('../Controllers/user.controller')
router.post('/feedback',FeedbackController)


module.exports = router