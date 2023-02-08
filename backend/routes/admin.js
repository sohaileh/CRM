const router=require('express').Router()
const authController=require('../controllers/authController/authController')
const purchase = require('../controllers/purchase.controler')
const isAuth=require('../middleware/auth')
const handle=require("../controllers/sales");
require("../services/db.connection");

router.post("/login",authController.login)

router.post("/purchase/addvehicle",isAuth,purchase.addPurchase)
router.get('/purchase/purchaselist',isAuth,purchase.viewPurchase)
router.delete('/purchase/deletepurchase:id',isAuth,purchase.deletePurchase)

router.post("/addsale",isAuth,handle.addSale);
router.get("/getsales",isAuth,handle.getSales);
router.put("/editsale",isAuth,handle.updateSale);
router.delete("/deletesale:sell_id",isAuth,handle.deleteSale);
module.exports=router