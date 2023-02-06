const {Sale}=require("../../model");
const getSales = async (req, res, next) => {
    try {
       const salesList= await Sale.find({});
        res.status(200).json({data:salesList}); 
    } catch (error) {
     return next(new Error("No sales found please add sale first"));
    }
}
module.exports = getSales;