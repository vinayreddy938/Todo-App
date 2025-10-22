const validator = require("validator")
const validateData = (req)=>{
    const requiredFields =["todo","status"]
    const requiredStatus =["pending", "in-progress", "completed"]
    const isValidBodyAttributes = Object.keys(req.body).every((value)=>requiredFields.includes(value));
    if(!isValidBodyAttributes){
        throw new Error("please enter required fields "+requiredFields.join(","))
    }
    const { todo, status } = req.body;
       
     if(!todo || !todo.trim()){
        throw new Error("please enter todo or task")
     }
    if(status&& !requiredStatus.includes(status) ){
         throw new Error("Please enter a valid status: " + requiredStatus.join(", "));

    }
    
    

   

}
const validateUserData = (req)=>{
  const{name,email,password} = req.body;
  const acceptedFields = ["name","email","password"];
  const isFieldsValid = Object.keys(req.body).every((key)=>acceptedFields.includes(key));
  
  if(!isFieldsValid){
    throw new Error("requested fields not valid")
  }
  if(!name || validator.isEmpty(name)){
    throw new Error("please enter name ")
  }
  if(!validator.isEmail(email)){
    throw new Error("not a valid mail")
  }
  if(!validator.isStrongPassword(password)){
    throw new Error("not a strong password")
  }

}
const   validateLogInData = (req)=>{
    const{email,password} = req.body;
    const allowedFields = ["email","password"];
    const isAllowed = Object.keys(req.body).every((key)=> allowedFields.includes(key));
    if(!isAllowed){
        throw new Error("not an accepted fields")
    }
    if(!email){
        throw new Error("please enter email")
    }
    if(!password){
        throw new Error("please enter password")
    }
    if(!validator.isEmail(email)){
        throw new Error("not an valid email")
    }
}

 module.exports = {validateData,validateUserData,  validateLogInData};