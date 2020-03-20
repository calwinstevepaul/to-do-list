require('dotenv').config()
var express =require('express')
var app= express()
var cors= require('cors')
var bodyparser = require('body-parser')
var client =require('./config/connection')


const authcontroller = require("./controller/auth")();
const taskcontroller = require("./controller/task")();
const admincontroller = require("./controller/admindetails")();

let authPath = require("./router/auth")(authcontroller);
let taskPath = require("./router/task")(taskcontroller);
let adminPath =require("./router/admindetails")(admincontroller);

app.use(bodyparser.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("hello")
})
app.use('/auth',authPath.getRouter());
app.use('/task',taskPath.getRouter());
app.use('/admin',adminPath.getRouter());

client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
  });

app.listen(9000,()=>{
    console.log('listening.......')
})
