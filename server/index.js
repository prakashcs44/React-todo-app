const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User  = require("./models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Todo = require("./models/Todo.js")
const verifyToken = require("./middleware/verifyToken.js")

const app = express();
const PORT = 4000;
const saltRounds = 10;
const secretKey = "erjnrfjknoiffojiqwdnwejnvkwjvn dkjv wek";


mongoose.connect("mongodb://127.0.0.1:27017/todo-app").then(()=>{
  console.log("DB connected...")
})
.catch((err)=>{
  console.error(err);
})

app.use(cors());
app.use(express.json());


app.post("/register",async (req,res)=>{
   try{
    const {email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,saltRounds);
    const newUser = await User.create({
     email,
     password:hashedPassword
    })
    res.status(200).json(newUser);
   }
   catch(err){
      res.status(400).json({message:"Error"});
   }
});

app.post("/login",async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email"});
    }
    const isPassword = bcrypt.compareSync(password,user.password);
    if(!isPassword){
      return res.status(400).json({message:"Incorrect password"});
    }
    const payload = {email,id:user._id};
    const token = jwt.sign(payload,secretKey);
    res.status(200).json({id:user._id,email:user.email,token});
  }
  catch(err){
    res.status(400).json({message:"Error"});
 }
});

app.get("/todos",verifyToken,async (req,res)=>{
  try{
    const {id} = req.user;
    const todos = await Todo.find({author:id});
    res.status(200).json(todos);
  }
  catch(err){
    res.status(400).json({message:"Error"});
 }
  
});

app.post("/add-todo",verifyToken,async (req,res)=>{
   try{
    const {title,content} = req.body;
    const {id} = req.user;
    const newTodo = await Todo.create({
      title,
      content,
      author:id
    });

    res.status(200).json(newTodo);
   }

   catch(err){
    res.status(400).json({message:"Error"});
 }
});

app.get("/todos/:id",verifyToken,async(req,res)=>{
  try{
   const {id} = req.params;
   const todo = await Todo.findOne({_id:id});
   if(!todo){
    return res.status(400).json({message:"Todo doesnt exists"});
   }
   res.status(200).json(todo);
  }
  catch(err){
    res.status(400).json({message:"Error"});
 }
});

app.post("/todos/complete/:id",verifyToken,async (req,res)=>{
  try{
    const {id} = req.params;
    const  todo = await Todo.findOne({_id:id});
    if(!todo){
      return res.status(400).json({message:"Todo doesnt exists"});
     }
  await Todo.updateOne({_id:id},{
      completed:!(todo.completed)
    });
    const userId = req.user.id;
    const todos = await Todo.find({author:userId});
    res.status(200).json(todos);
   
  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Error"});
 }

});

app.post("/todos/update/:id",verifyToken,async(req,res)=>{
  try{
    const {id} = req.params; 
    const {title,content} = req.body;
     await Todo.updateOne({_id:id},{
        title,
        content
    });
    const updatedTodo  = await Todo.findOne({_id:id});
    res.status(200).json(updatedTodo);

  }
  catch(err){
    res.status(400).json({message:"Error"});
 }
});

app.delete("/todos/delete/:id",verifyToken,async (req,res)=>{
  try{
    const {id} = req.params;
    await Todo.deleteOne({_id:id});
    const userId = req.user.id;
    const todos = await Todo.find({author:userId});
    res.status(200).json(todos);
  }
  catch(err){
    res.status(400).json({message:"Error"});
 }
});




app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));