const express = require ('express')
const router = express()
const {AdminLoginController,GetIssueController,CompleteIssueController,DeleteIssueController,AdminRegisterController}= require('../Controllers/admin.controller')
router.post('/register/',AdminRegisterController)
router.post('/login/:Email/:Password',AdminLoginController)
router.get('/getissues',GetIssueController)
router.post('/completeissue/:id/:Email/:Name/:Issue/:BusNumber',CompleteIssueController)
router.post('/deleteissue/:id',DeleteIssueController)
module.exports = router


