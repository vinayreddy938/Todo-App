const moongoose = require("mongoose");
const URL = "mongodb+srv://binaybrddy:vinay123@cluster0.tunh3i4.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0";
const connectDb = async()=>{
   await moongoose.connect(URL)
   console.log("mongo db connected")
}
module.exports = connectDb;