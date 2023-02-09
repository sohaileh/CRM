
const Purchase=require('../model/purchase.model');

const purchase={

 async   addPurchase(req,res){
    const exitstingPurchase=await Purchase.exists({vehicle_no:req.body.vehicle_no})
    if(exitstingPurchase){
        res.status(403).json({message:"Vehicle Already Present"})
    }else{
    try {
        const allDetails=req.body;
        const newPurchase=new Purchase(allDetails)
        await newPurchase.save()
        res.status(201).json({message:"Purchase Added sucessfully"})
    } catch (error) {
        res.status(409).json({message:error.message})
    }
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

   async deletePurchase(req,res){
        const carnumber=req.params.carno;    
       await Purchase.deleteOne({vehicle_no:carnumber}).then((data)=>{
            res.status(200).json({message:"Deleted Sucessfully"})
        }).catch((err)=>{
            res.status(409).json({message:"Something Went Wrong"})
        })
    },

   async findPurchase(req,res){
        const carno=req.params.carno
       await Purchase.findOne({vehicle_no:carno}).then((doc)=>{
            res.json({data:doc})
        }).catch((err)=>{
            res.json({message:err.message})
        })
    },

   async editPurchase(req,res){
        res.josn("hello from edit server")
    }
}

module.exports=purchase;

