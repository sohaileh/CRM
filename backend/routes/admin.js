const router=require('express').Router()
const authController=require('../controllers/authController/authController')
const Purchase = require('../controllers/purchase.controler')
const isAuth=require('../middleware/auth')//middleware 

router.post("/login",authController.login)

router.post("/purchase/addvehicle",Purchase.addPurchase)
router.get('/purchase/purchaselist',Purchase.viewPurchase)


module.exports=router