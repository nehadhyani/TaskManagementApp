const mongoose = require('mongoose');
require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("request received");
  next();
});

const {Schema} = mongoose;
const todoSchema = new Schema({
  name: { type: String, required: true },
  done: Number
});
var task = mongoose.model('task', todoSchema);

//getTask

app.post("/tasks", async (req,res)=>{
  try {
    const tasks = await task.find({});
    res.send(tasks);
  } catch (err) {
    res.send("error");
  }
});

//addTask

app.post("/add", async (req,res)=>{
  const newTask = new task({
    name: req.body.data,
    done: 0
  });

  try {
    const neww = await newTask.save();
    const tasks = await task.find({});
    res.send(tasks);
  } catch (err) {
    res.send("error");
  }
});

//updateTaskName

app.post("/updateTask", async (req,res)=>{
  try {
    const { name } = req.body;
    const task1 = await task.findOneAndUpdate(
      { _id: req.body.id },
      {
        name
      }
    );
    const tasks = await task.find({});
    res.send(tasks);
  } catch (err) {
    res.send("error");
  }
});

//doneOrNot

app.post("/updateDone", async (req,res)=>{
  try {
    const { done } = req.body;
    const task1 = await task.findOneAndUpdate(
      { _id: req.body.id },
      {
        done
      }
    );
    const tasks = await task.find({});
    res.send(tasks);
  } catch (err) {
    res.send("error");
  }
});

//delete

app.post("/delete", async (req,res)=>{
  try {
    const task1 = await task.findById(req.body.id).remove();
    const tasks = await task.find({});
    res.send(tasks);
  } catch (err) {
    res.send("error");
  }
});

const URI = process.env.MONGO_URI2
mongoose.connect(URI, {useNewUrlParser : true, useUnifiedTopology: true}, (err) => {
  if(err) {
    console.log("Error: " + err.message);
  } else {
    console.log("success");
  }
})

app.listen(8000,(err)=>{
  if(err){
    console.log("Error in starting server");
  }
  else{
    console.log("Server is running on port 8000");
  }
});