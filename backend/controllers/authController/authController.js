const jwt=require("jsonwebtoken");
require('dotenv').config()

class authController{
    static login(req,res){
        if(req.body.email=="junaid@gmail.com" && req.body.password=="aaa"){
            const emailId=req.body.email;
            const email={name:emailId}
            const accessToken= jwt.sign(email,process.env.ACCESS_TOKEN_SECRET)
            res.json({info:"logged in successfully",status:201,accessToken:accessToken})
        }
            else{
            res.status(401).json({info:"Incorrect username/password"})
            }
    }
}

module.exports=authController;