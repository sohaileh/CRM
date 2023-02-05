let database=[
     {
      _id: 2,
      vehicle_no: "JK01A 2222",
      seller_name: "Suhail Ahmad",
      purchase_date: new Date(),
      totalAmount: 200,
      balanceAmount: 100
    }
]

class Purchase{
    constructor(){}
    static addPurchase(req,res){
        const details={_id:req.body.engine_no}
        Object.assign(details,req.body);
        database.push(details)
      //  console.log(req.body)
        res.json({status:201,msg:"Added Purchase Sucessfully"})
    }

    static viewPurchase(req,res){
        res.json({status:200,msg:'Purchase List',data:database})
    }
}

module.exports=Purchase;

