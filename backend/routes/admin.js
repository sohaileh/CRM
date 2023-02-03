const router=require('express').Router()
const authController=require('../controllers/authController/authController')
const isAuth=require('../middleware/auth')//middleware 

router.post("/login",authController.login)



module.exports=router