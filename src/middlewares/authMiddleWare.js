const jwt = require("jsonwebtoken")
const SECRET_KEY = "VINAY_SECRET_KEY";
const UserModel = require("../model/user")
const authMiddleWare = async (req,res,next)=>{ 
    try{
        const {token} = req.cookies;
        const  {_id} =  jwt.verify(token,SECRET_KEY); // if token expies it throws error. other wise it return { _id: '68f90b0ef6b5ae74f40bbc73', iat: 1761153908, exp: 1761157508 }  
        const existitingUser = await  UserModel.findOne({_id});
        if(!existitingUser){
            throw new Error("Invalid Auth")
        } 
        req.user = existitingUser;  //let req{user:dbStore}
 
        next();
    }catch(err){
        if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
    

}
     

    



module.exports = authMiddleWare;