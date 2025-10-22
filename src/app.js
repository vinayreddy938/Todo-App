const express = require("express");
const app = express();
const connectDb = require("./utils/db")
const  todoRouter = require("./routes/todo")
const userRouter = require("./routes/userRouter")
const cookieParser= require("cookie-parser");

app.use(express.json());
app.use(cookieParser())
app.use("/",todoRouter);
app.use("/",userRouter);

connectDb().then(()=>{
app.listen(4000,()=>{
    console.log("server started")
})
}).catch((err)=>{
    console.log(err)
})
