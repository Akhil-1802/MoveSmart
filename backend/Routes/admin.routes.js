const express = require ('express')
const router = express()
const {AdminLoginController,GetIssueController,AdminDriverController,CompleteIssueController,DeleteIssueController,AdminRegisterController,GetAdminDriversController}= require('../Controllers/admin.controller')
router.post('/register/',AdminRegisterController)
router.post('/login/:Email/:Password',AdminLoginController)
router.get('/getissues/:Email',GetIssueController)
router.post('/completeissue/:id/:Email/:Name/:Issue/:BusNumber',CompleteIssueController)
router.post('/deleteissue/:id',DeleteIssueController)
router.post('/driver/:Email',AdminDriverController)
router.get('/getdrivers/:Email',GetAdminDriversController)
module.exports = router


