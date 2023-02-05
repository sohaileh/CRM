const router=require('express').Router()
const authController=require('../controllers/authController/authController')
const Purchase = require('../controllers/purchase.controler')
const isAuth=require('../middleware/auth')//middleware 
const handle=require("../controllers/sales");

router.post("/login",authController.login)

router.post("/purchase/addvehicle",Purchase.addPurchase)
router.get('/purchase/purchaselist',Purchase.viewPurchase)


router.post("/login",authController.login);
router.post("/addsale",handle.addSale);
router.get("/getsales",handle.getSales);
router.post("/getdocs",handle.getSaleDocs);
router.put("/editsale:doc_id",handle.editSale);
router.delete("/deletesale:sell_id",handle.deleteSale);
module.exports=router