const { verifyToken } = require('../middlewares/verfiytoken');
const {updateUser}=require('../controller/userController')
const router = require('express').Router()



router.post('/update/:id' ,verifyToken,updateUser)

module.exports  = router