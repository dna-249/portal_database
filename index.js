require("dotenv").config()

const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const mongoose = require("mongoose")



const corsConfig = {
    origin : ["https://attasfiyah-portal.vercel.app"],
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







app.listen(Port, ()=>{
const subjects=[
    {
      "name": "QUR'AN",
      "CA1": 5,
      "CA2": 6,
      "Ass": 4,
      "Exam": 55
    },
    {
      "name": "TAJWEED",
      "CA1": 7,
      "CA2": 5,
      "Ass": 6,
      "Exam": 54
    }
  ]
    const transformedScores = subjects.reduce((accumulator, subject) => {
    // A. Clean Key Generation
    const subjectKey = subject.name.toUpperCase().replace("'", ""); // QUR'AN -> QURAN

    // B. Isolate Scores
    // Destructure the subject object: 'name' is discarded, everything else goes into 'scores'.
    const { name, ...scores } = subject; // scores = { CA1: 5, CA2: 6, Ass: 4, Exam: 55 }

    // C. Mapping to the Accumulator
    // The key is the subject name, and the value is the scores object wrapped in an array [].
    accumulator[subjectKey] = [scores];

    return accumulator;
}, {}); // Start with an empty object {}

/*
'transformedScores' now holds:
{ "QURAN": [ { CA1: 5, CA2: 6, ... } ], "TAJWEED": [ { CA1: 7, CA2: 5, ... } ] }
*/ console.log(transformedScores)
    console.log("server is Running")
    
})