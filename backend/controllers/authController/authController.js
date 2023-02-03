const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {ACCESS_TOKEN_SECRET}=require("../../config")

const password = "$2a$10$QGMe8Rz2EOdNweQCQO5bnOEAqljyeCjc/5dNh7v15d4ebrpzfGg6K";

class authController {
  constructor() {}

  static login(req, res) {
    if (req.body.email == "junaid@gmail.com") {
      bcrypt.compare(req.body.password, password, function (err, result) {
        if (err) {
         return res.status(500).json({ msg: "Authentication failed" }); //check error code
        } 
          if (result) {
            const emailId = req.body.email;
            const email = { name: emailId };
            const accessToken = jwt.sign(email, ACCESS_TOKEN_SECRET);
            return res.status(200).json({ msg: "logged in successfully", accessToken });
          }
            res.status(401).json({ msg: "Invalid password" });        
      });
    } else res.status(401).json({ msg: "Invalid Email" });
  }

  // static securePassword= async(password)=>{
  //     const securePassword= await bcrypt.hash(password,10)
  //     console.log(securePassword)
  // }
}

module.exports = authController;
