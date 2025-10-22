const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
    name:{
        type:String,
        trim:true,
        minlength:3,
        maxlength:20,
         required: true, 
        
    },
    email:{
        type:String,
        unique:true,
        minlength:4,
        maxlength:20,
        required: true, 
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]

    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
},{
    timestamps:true
})
const UserModel = mongoose.model("users",User);
//UserModel.inser() -> but we have to add data in the routes 
module.exports = UserModel;