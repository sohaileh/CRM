const CustomErrorHandler =require('../services/customErrorHandler')
const Purchase=require('../model/purchase.model');

const purchase = {

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
   })}catch (error) {
                res.status(409).json({ message: error.message })
            }
        
    },

    async viewPurchase(req, res) {
        try {
            const data = await Purchase.find({})
            res.status(200).json({ message: "Purchase List", data: data })
        }
        catch (error) {
            res.status(409).json({ message: error.message })
        }
    },

    async deletePurchase(req, res) {
        try{
        const carnumber = req.params.carno;
        await Purchase.deleteOne({ vehicle_no: carnumber }).then((data) => {
            res.status(200).json({ message: "Deleted Sucessfully" })
        }).catch((err) => {
            res.status(409).json({ message: "Something Went Wrong" })
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
        //return next(CustomErrorHandler.purchaseAlreadyExists(`Vehcle No ${req.body.vehicle_no} Already Exits`))
        return res.status(403).json({message:"Vehicle Number Already Present"})
     }
    try {
       const updateStatus =await Purchase.updateOne({vehicle_no:carno},req.body)
       if(!updateStatus.modifiedCount){ 
       // throw new Error("No Changes Made")
        //return res.status(200).json({message:"No Changes Made"})
        return next(CustomErrorHandler.noChanges("No Changes Made"))
       }
       res.status(200).json({message :"Updated Sucessfully"})
    } catch (error) {
       next(error)
    }
   },
    
    async findPurchase(req, res) {
        const carno = req.params.carno
        await Purchase.findOne({ vehicle_no: carno }).then((doc) => {
            res.json({ data: doc })
        }).catch((err) => {
            res.json({ message: err.message })
        })
    },

    async purchaseListDropDown(req,res,next){
        try {
            const data = await Purchase.find({}).select("vehicle_no -_id").limit(req.params.limit);
            if(data){
            return res.status(200).json({data});
            }
        }
        catch (error) {
            return next(error);
        }
    },
    async searchPurchaseListDropDown(req,res,next){
        try {
            const data = await Purchase.find({vehicle_no:{$regex:new RegExp("^"+req.body.query+".*","i")}}).select("vehicle_no -_id").limit(10);
            if(data){
            return res.status(200).json({data});
            }
        }
        catch (error) {
            return next(error);
        }
    },
   
   async totalPurchase(req,res){
    try {
        const data=await Purchase.find({},{'vehicle_no':1,"purchase_date":1})        
        res.json({data:data})   
    } catch (error) {
        next(error)
    }
    },

    async searchVehicle(req,res){
        const vehicleNumber=req.query.q.toLowerCase();
        try{
            const data=await Purchase.find({vehicle_no:new RegExp(vehicleNumber)},{vehicle_no:1})
            res.json({data:data})
        }catch(error){
            res.json('error')
        }
    }
}

module.exports = purchase;

