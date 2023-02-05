const { Sale, SaleDocuments } = require("../../model");
const deleteSale=async(req,res,next)=>{
    try {
   const result= await Sale.findOne({_id:req.params.sell_id});    
   try {
    await Sale.deleteOne({_id:req.params.sell_id},async(err,_)=>{
     if(err){
        return next(err);
     }
     await SaleDocuments.deleteOne({_id:result.document_id},(er,rest)=>{
       if(er){
        return next(er);
       }
      return res.status(200).json({message:`Sale having sell id : ${result.id} deleted succesfully`});
     }).clone();
    }).clone();
   } catch (errr) {
    return next(errr);
   }
    } catch (error) {
       return next(error); 
    }
}
module.exports=deleteSale;