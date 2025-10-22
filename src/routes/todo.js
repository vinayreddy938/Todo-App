const express = require("express");
const todoRouter = express.Router();
const Todos = require("../model/todo")
const {validateData} = require("../utils/helper")
todoRouter.post("/todo",async (req,res)=>{
    try{
        validateData(req); 

            const todos = new Todos(req.body); // or we Todos.insert({obj})
             await todos.save();
            res.status(201).json({message:"todo created Sucessfully"})




    }catch(err){ 
         res.status(400).send({ error: err.message });

    }
})

module.exports = todoRouter;