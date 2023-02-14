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
        const allDetails=req.body;
        const newPurchase=new Purchase(allDetails)
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
        res.status(409).json({message:error.message})
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
    try {
    const updatedDetails=req.body;
       const updateStatus =await Purchase.updateOne({vehicle_no:carno},updatedDetails)
       console.log(updateStatus.modifiedCount)
       if(updateStatus.modifiedCount===0){
        return next(CustomErrorHandler.noChanges("No changes Made"))
       // res.status(403).message({message:"No Changes made"})
       }else{
        res.status(200).json({message :"Updated Sucessfully"})
       }
    } catch (error) {
       //res.status(403).json({message:"eroor"})
       return next(error)
    }
    
    }
   
}

module.exports=purchase;

