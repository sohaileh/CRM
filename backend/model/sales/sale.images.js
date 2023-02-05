const mongoose=require("mongoose");
const saleImagesSchema=mongoose.Schema({
   documents:Object
});
module.exports=mongoose.model("SaleDocuments",saleImagesSchema,"sales_documents");

