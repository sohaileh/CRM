const router=require('express').Router()
const authController=require('../controllers/authController/authController')
const purchase = require('../controllers/purchase.controler')
const isAuth=require('../middleware/auth')
const handle=require("../controllers/sales");
require("../services/db.connection");

router.post("/login",authController.login)

router.post("/addvehicle",isAuth,purchase.addPurchase)
router.get('/purchaselist',isAuth,purchase.viewPurchase)
router.delete('/deletepurchase/:carno',isAuth,purchase.deletePurchase)
router.get('/findvehicle/:carno',isAuth,purchase.findPurchase)
router.put('/updatepurchase/:carno',isAuth,purchase.updatePurchase)

router.get('/totalpurchasebydate',purchase.totalPurchase)

router.post("/addsale",isAuth,handle.addSale);
router.get("/getsales",isAuth,handle.getSales);
router.put("/updatesale",isAuth,handle.updateSale);
router.delete("/deletesale:sell_id",isAuth,handle.deleteSale);
router.get("/findsalebyvehicleno:id",isAuth,handle.findSaleByVehicleNo);
router.get("/getsalesbyfilter:search",isAuth,handle.getSalesByFilter);

router.get('/purchaselist:limit',isAuth,purchase.purchaseListDropDown);
router.post('/purchaselistbyfilter',isAuth,purchase.searchPurchaseListDropDown);

module.exports=router