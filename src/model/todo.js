const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const todos = new Schema({
    todo:{
         type:String,
         required: true,
         trim: true,         
         minlength: 3,       
         maxlength: 20       
    },
    status:{
        type:String,
        enum: ["pending", "in-progress", "completed"], 
         default: "pending"
    }

},{
    timestamps:true
}) ;

const todo = moongoose.model("todos",todos);
module.exports = todo;
