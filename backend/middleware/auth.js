const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET}=require("../config")
module.exports=(req,res,next)=>{
        const authHeader=req.headers['authorization'] //what is bearer??????????????????
        console.log(authHeader)
        const token=authHeader && authHeader.split(' ')[1] 
        if (token==null) return res.json({info:'token missing',status:401})
        jwt.verify(token,ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.json({info:'invalid token',status:403})
            console.log(user)
            req.user=user//adds username to REQ
            next();
        })
    }