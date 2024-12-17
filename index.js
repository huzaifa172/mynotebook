const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const task = require('./models/task')



// middle wares 
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//Router
app.get("/", async (req, res)=>{

  let taskContent = await task.find();

  res.render("index", {task : taskContent})

});

// create
app.post("/create", async (req, res)=>{
  let {title , details }= req.body; 
  let createTask = await task.create({
    title,
    details
  });
  res.redirect("/")
});

// remove
app.get("/delete/:id", async (req, res)=>{
  let deleteTask = await task.findOneAndDelete({_id : req.params.id});
  res.redirect("/");
});


// edit task 
app.get("/edit/:taskId", async (req, res)=>{
  let editedTask = await task.findOne({_id : req.params.taskId});
  console.log(editedTask)

  res.render("edit", {editedTask})
});
  
// update
app.post("/update/:taskId", async (req, res)=>{
let {title , details} = req.body;
 console.log(req.params.taskId)
  
 await task.findOneAndUpdate({_id : req.params.taskId}, {title , details}, {new : true});
 
 res.redirect("/")
});


// read 
app.get("/read/:id", async (req, res)=>{
  let readTask = await task.findOne({_id: req.params.id});

  res.render("read", {readTask})
})


// servre
app.listen(3000, ()=>{
console.log("my Nootboot is working great")
});