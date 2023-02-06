const router=require('express').Router()
const authController=require('../controllers/authController/authController')
const purchase = require('../controllers/purchase.controler')
const isAuth=require('../middleware/auth')//middleware 
const handle=require("../controllers/sales");
require("../services/db.connection");

router.post("/login",authController.login)

router.post("/purchase/addvehicle",purchase.addPurchase)
router.get('/purchase/purchaselist',purchase.viewPurchase)
router.delete('/purchase/deletepurchase:id',purchase.deletePurchase)

router.post("/addsale",handle.addSale);
router.get("/getsales",handle.getSales);
router.put("/editsale",handle.editSale);
router.delete("/deletesale:sell_id",handle.deleteSale);
module.exports=router