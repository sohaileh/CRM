const {Sale,SaleDocuments}=require("../../model");
const ObjectId=require("mongoose").Types.ObjectId;
const getSales = async (req, res, next) => {
    try {
       const salesList= await Sale.find({});
        res.status(200).json({data:salesList}); 
    } catch (error) {
     return next(new Error("No sales found please add sale first"));
    }
}
const getSaleDocs=async(req,res,next)=>{
    try {
      const saledoc=await SaleDocuments.findOne({_id:ObjectId(req.body.doc_id)});
      res.status(200).json({data:saledoc});
    } catch (error) {
      return next(error);
    }
}

module.exports = {getSales,getSaleDocs};