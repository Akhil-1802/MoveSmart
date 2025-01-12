const express = require ('express')
const router = express()
const {AdminLoginController,GetIssueController,CompleteIssueController,DeleteIssueController,AdminRegisterController}= require('../Controllers/admin.controller')
router.post('/register/',AdminRegisterController)
router.post('/login/:Email/:Password',AdminLoginController)
router.get('/getissues',GetIssueController)
router.post('/completeissue/:id',CompleteIssueController)
router.post('/deleteissue/:id',DeleteIssueController)
module.exports = router