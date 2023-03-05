const mongoose=require("mongoose");
const saleSchema=mongoose.Schema({
    vehicle_no:{type:String,required:true,unique:true},
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    phone_no:{type:Number,required:true},
    address:{type:String,required:true},
    postal_code:{type:Number,required:true},
    solddate:{type:String,required:true},
    sold_amount:{type:Number,required:true},
    paid_amount:{type:Number},
    balance_amount:{type:Number,required:true},
    documents:Object
});
module.exports=mongoose.model("Sale",saleSchema,"sales");