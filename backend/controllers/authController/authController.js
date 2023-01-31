const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const password = "$2a$10$QGMe8Rz2EOdNweQCQO5bnOEAqljyeCjc/5dNh7v15d4ebrpzfGg6K";

class authController {
  constructor() {}
  static async login(req, res) {
    const matched = await authController.passwordMatch(
      req.body.password,
      password
    );
    if (req.body.email == "junaid@gmail.com" && matched) {
      const emailId = req.body.email;
      const email = { name: emailId };
      const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ info: "logged in successfully", accessToken });
    } else {
      res.status(401).json({ info: "Incorrect username/password" });
    }
  }

  static async passwordMatch(password, passwordHash) {
    const passwordMatch = await bcrypt.compare(password, passwordHash);
    return passwordMatch;
  }

  // static securePassword= async(password)=>{
  //     const securePassword= await bcrypt.hash(password,10)
  //     console.log(securePassword)
  // }
}

module.exports = authController;
