const mongoose=require("mongoose");
const saleSchema=mongoose.Schema({
    document_id:{},
    vehicle_no:{type:String,required:true,unique:true},
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    phone_no:{type:Number,required:true},
    address:{type:String,required:true},
    postal_code:{type:Number,required:true},
    sold_date:{type:String,required:true},
    sold_amount:{type:Number,required:true},
    balance_amount:{type:Number,required:true},
});
module.exports=mongoose.model("Sale",saleSchema,"sales");