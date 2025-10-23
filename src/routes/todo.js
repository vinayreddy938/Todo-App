const express = require('express');
const todoRouter = express.Router();
const Todos = require('../model/todo');
const { validateData } = require('../utils/helper');
const auth = require('../middlewares/authMiddleWare');
const { z } = require('zod');
todoRouter.post('/todo', auth, async (req, res) => {
  try {
    //json token -> user vunnadaledha
    validateData(req);
    const current = req.user;
    const { todo, status } = req.body;
    const todos = new Todos({ fromUserId: current._id, todo, status }); // or we Todos.insert({obj})
    await todos.save();
    res.status(201).json({ message: 'todo created Sucessfully', data: todos });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
//relations
todoRouter.get('/todos', auth, async (req, res) => {
  try {
    const userTodos = await Todos.find({ fromUserId: req.user._id });
    if (userTodos.length == 0) {
      throw new Error();
    }
    res.status(200).json({ userTodos });
  } catch (err) {
    res.status(404).json({ message: 'todo not found' });
  }
});
todoRouter.patch('/todo/update/:id', auth, async (req, res) => {
  try {
    const requiredBody = z
      .object({
        todo: z.string().min(3).max(100).optional(),
        status: z.enum(['pending', 'in-progress', 'completed']).optional(),
      })
      .strict(); // .strict() to reject extra fields , .optional() it will tell even it will sue or not , .refine() for custom checks
    const parsedData = requiredBody.parse(req.body); //parse directly throw an error obj like issues  safeParse() method will didnt throw error it will give object{sucees:true,data:..parsedData} {success:false,error:ZodError}
    const { id } = req.params;
    const fromUserId = req.user._id;
    const todoObj = await Todos.findOne({ _id: id, fromUserId });
    if (!todoObj) {
      throw new Error('invalid action');
    }
    const{todo,status} = req.body;
    if(todo){ 
        todoObj.todo = todo;
        
    }
    if(status){
        todoObj.status = status;
    }
    const Todo = new Todos(todoObj)
    await Todo.save();
    

    

    res.json({ updatedTodo: Todo });
  } catch (err) {
    if (err.issues) {
      res.status(400).json({ message: err.issues });
      return;
    }
    res.status(400).json({ message: err.message });
  }
});

module.exports = todoRouter;
