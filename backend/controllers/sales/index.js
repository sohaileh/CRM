const { Sale } = require("../../model");

const handle={
    addSale:require("./addsale.handler"),
    updateSale:require("./updatesale.handle"),
    deleteSale:require("./deletesale.handler"),
    getSales:require("./getsales.handler"),
    async getSalesByFilter(req,res,next){
        try {
            const salesList=await Sale.find({vehicle_no:{$regex:new RegExp("^"+req.params.search+".*","i")}}).select("vehicle_no -_id fullName sold_date bill_no adhaar_no documents").limit(5);
        if(salesList)
        return res.status(200).json({data:salesList}); 
        } catch (error) {
            return next(error);
        }
    },
    async findSaleByVehicleNo(req,res,next){
        try {
        const data=await Sale.findOne({vehicle_no:req.params.id}).select("-_id");
        if(data){
            return res.status(200).json({data});
        } 
        } catch (error) {
          return next(error);  
        }
    }
}
module.exports=handle;