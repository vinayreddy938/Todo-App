const moongoose = require("mongoose");
const Schema = moongoose.Schema;
const ObjectId = Schema.ObjectId;

const todos = new Schema({
    fromUserId:{
        type:ObjectId,
    },
    todo:{
         type:String,
         required: true,
         trim: true,         
         minlength: 3,       
         maxlength: 100       
    },
    status:{
        type:String,
        enum: ["pending", "in-progress", "completed"], 
         default: "pending"
    }

},{
    timestamps:true
}) ;
todos.index({ title: 1 });
const todo = moongoose.model("todos",todos);
module.exports = todo;
