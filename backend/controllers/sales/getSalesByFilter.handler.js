const {Sale}=require("../../model");
const regex = require("../../services/regex");
const getSalesByFilter=async(req,res,next)=>{
    try {
        const salesList=await Sale.find({vehicle_no:{$regex:regex(req.params.search)}}).select("vehicle_no -_id fullName sold_date bill_no adhaar_no documents").limit(5);
    if(salesList)
    return res.status(200).json({data:salesList}); 
    } catch (error) {
        return next(error);
    }
}
module.exports=getSalesByFilter;