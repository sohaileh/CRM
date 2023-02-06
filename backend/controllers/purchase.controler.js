
const Purchase=require('../model/purchase.model');
const CustomErrorHandler = require('../services/customErrorHandler');

const purchase={

 async   addPurchase(req,res){
    try {
        const allDetails=req.body;
        await Purchase.insertMany(allDetails)
        res.status(201).json({message:"Purchase Added sucessfully"})
    } catch (error) {
        res.status(409).json({message:error.message})
    }
},

   async viewPurchase(req,res){
    try{
        const data=await Purchase.find({})
        res.status(200).json({message:"Purchase List",data:data})
    }
    catch(error){
        res.status(409).json({message:error.message})
    }
    },

    deletePurchase(req,res){
        const carnumber=req.params;        
        Purchase.deleteOne({carnumber}).then((data)=>{
            res.status(200).json({message:"Deleted Sucessfully"})
        }).catch((err)=>{
            res.status(409).json({message:"Something Went Wrong"})
        })
    }
}

module.exports=purchase;

