const express = require ('express')
const router = express()
const {AdminLoginController,GetIssueController,CompleteIssueController,DeleteIssueController}= require('../Controllers/admin.controller')
router.post('/login/:adminName/:adminId',AdminLoginController)
router.get('/getissues',GetIssueController)
router.post('/completeissue/:id',CompleteIssueController)
router.post('/deleteissue/:id',DeleteIssueController)
module.exports = router