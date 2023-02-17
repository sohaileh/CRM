const CustomErrorHandler =require('../services/customErrorHandler')
const Purchase=require('../model/purchase.model');

const purchase={

 async   addPurchase(req,res,next){
    const exitstingPurchase=await Purchase.exists({vehicle_no:req.body.vehicle_no})
    if(exitstingPurchase){
       // res.status(403).json({message:"Vehicle Already Present"})
        return next(CustomErrorHandler.purchaseAlreadyExists(`Vehcle No ${req.body.vehicle_no} Already Exits`))
    }else{
    try {
        const newPurchase=new Purchase(req.body)
        await newPurchase.save()
        res.status(201).json({message:"Purchase Added sucessfully"})
    } catch (error) {
       // res.status(409).json({message:error.message})
       next(error)
    }
}
},

   async viewPurchase(req,res){
    try{
        const purchaseList=await Purchase.find({})
        res.status(200).json({data:purchaseList})
    }
    catch(error){
    //      res.status(409).json({message:error.message})
        next(error)
    }
    },

   async deletePurchase(req,res){
        const carnumber=req.params.carno;  
        try {
            await Purchase.deleteOne({vehicle_no:carnumber}).then((data)=>{
            res.status(200).json({message:"Deleted Sucessfully"})
        })
        } catch (error) {
          return next(error)
        }  
       
    },

   async findPurchase(req,res){
        const carno=req.params.carno
        try {
            await Purchase.findOne({vehicle_no:carno}).then((doc)=>{
                res.json({data:doc})
            })
        } catch (error) {
            return next(error)
        }
    },

   async updatePurchase(req,res,next){
    const carno=req.params.carno;
    const existingPurchase=await Purchase.exists({vehicle_no:req.body.vehicle_no})
     if(existingPurchase && carno!=req.body.vehicle_no){
        return next(CustomErrorHandler.purchaseAlreadyExists(`Vehcle No ${req.body.vehicle_no} Already Exits`))
     }
    try {
       const updateStatus =await Purchase.updateOne({vehicle_no:carno},req.body)
       if(!updateStatus.modifiedCount){ 
       // throw new Error("No Changes Made")
        return res.status(200).json({message:"No Changes Made"})
       }
       res.status(200).json({message :"Updated Sucessfully"})
    } catch (error) {
       next(error)
    }
    
    },
   
   async totalPurchase(req,res){
    try {
        const data=await Purchase.find({},{'totalAmount':1,"purchase_date":1})        
        res.json({data:data})   
    } catch (error) {
        next(error)
    }
    }
}

module.exports=purchase;

