const express = require("express");
const todoRouter = express.Router();
const Todos = require("../model/todo")
const {validateData} = require("../utils/helper")
const auth = require("../middlewares/authMiddleWare")
todoRouter.post("/todo",auth,async (req,res)=>{
    try{
        //json token -> user vunnadaledha
        validateData(req); 
           const current = req.user;
           const { todo, status } = req.body;
            const todos = new Todos({fromUserId:current._id,todo,status}); // or we Todos.insert({obj})
             await todos.save();
            res.status(201).json({message:"todo created Sucessfully",data:todos})




    }catch(err){ 
         res.status(400).send({ error: err.message });

    }
}) 
//relations
todoRouter.get("/todos",auth,async(req,res)=>{
    try{
        const  userTodos = await Todos.find({fromUserId:req.user._id});

        res.status(200).json({userTodos})

    }catch(err){ 
        console.log(err)

    }
})



module.exports = todoRouter;