require("dotenv").config()

const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");
const { studentRouter } = require("./routers/router");



const corsConfig = {
    origin : ["*"],
    credential : true,
    methods : ["GET","POST","PUT","DELETE"],
    headers:["*"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

mongoose.connect(process.env.KEY).
then(()=> console.log("connected to database now")).
catch(err => console.log(err))


app.get("/",(req,res)=>{
    res.send("hello from backend")
})


app.use("/student", studentRouter)




app.listen(Port, ()=>{
    console.log("server is Running")
    
})