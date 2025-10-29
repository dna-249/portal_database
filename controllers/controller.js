const mongoose = require('mongoose');
const { Portal} = require("../model/portal")


const postStudent = async(req,res) => {
    const {school,studentName, classes, term, session, admissionNo, sex,subjects,age } = req?.body?.postPayload

    const sub = subjects.reduce((accumulator, subject) => {
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
*/ 


    await Portal.create({
    school: school,
    studentName:studentName,
    class:classes,
    term: term,
    session: session,
    admissionNo:admissionNo,
    age: age,
    sex: sex,
    
    QURAN:[{ CA1:sub.QURAN.CA1, CA2:sub.QURAN.CA2, Ass:sub.QURAN.Ass, Exam: sub.QURAN.Exam}],
    TAJWEED:[{CA1:sub.TAJWEED.CA1, CA2:sub.TAJWEED.CA2, Ass:sub.TAJWEED.Ass,  Exam:sub.TAJWEED.Exam}],
    TAUHEED:[{CA1:sub.TAUHEED.CA1, CA2:sub.TAUHEED.CA2, Ass:sub.TAUHEED.Ass,  Exam:sub.TAUHEED.Exam}],
    FIQH:[{CA1:sub.FIQH.CA1,  CA2:sub.FIQH.CA2, Ass:sub.FIQH.Ass, Exam:sub.FIQH.Exam}],
    HADITH:[{CA1:sub.HADITH.CA1, CA2:sub.HADITH.CA2, Ass:sub.HADITH.Ass,  Exam:sub.HADITH.Exam}],
    ARABIC:[{CA1:sub.ARABIC.CA1, CA2:sub.ARABIC.CA2, Ass:sub.ARABIC.Ass,  Exam:sub.ARABIC.Exam}],
    AZKHAR:[{CA1:sub.AZKHAR.CA1, CA2:sub.AZKHAR.CA2, Ass:sub.AZKHAR.Ass,  Exam:sub.AZKHAR.Exam}],
    SIRAH:[{CA1:sub.SIRAH.CA1, CA2:sub.SIRAH.CA2, Ass:sub.SIRAH.Ass,  Exam:sub.SIRAH.Exam}],
    HURUF:[{CA1:sub.HURUF.CA1, CA2:sub.HURUF.CA2, Ass:sub.HURUF.Ass,  Exam:sub.HURUF.Exam}],

    

  
   // moralEthics: {type:String},
   // punctuality:{type:String},
   // handWriting: {type:String},
   // honesty: {type:String},
  //  fluency: {type:String},
   // selfControl: {type:String},
  //  responsibility:{type:String},
  //  initiative:{type:String},
  //  politeness: {type:String},
   // headRemark: {type:String},
   // classTeacherRemark:{type:String},
        
                 })
                 res.send("successfully uploaded")
                    
}

const getAllStudent = async (req,res) =>{
    try{
        const student = await Student.find({})
        res.json(student)
    }catch(error){
        res.status(500).json({message:error.message})
    } 
    
}

const getOneStudent =  async(req,res)=>{
    try{
    const {_id} = req.params;
    const student = await Student.findById(_id)
    res.status(200).json(student)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const putOneStudent =  async(req,res)=>{
    try {
       
        const {_id} = req.params
        const student = await Student.findByIdAndUpdate({_id:_id}, req.body)
        
        if(!student){
            res.status(404).json("student not found")
        }

        res.status(200).json(student)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}

const putPullStudent = async (req,res) => {
    const {_id} = req.params;
    const {_id2} = req.params;
    const {object} = req.params

    const student =  await Student.findOneAndUpdate({_id:_id},
        {$pull:
          {[`${object}`]:{_id:_id2}}
      })
      res.status(200).json(student)
                    
}

const putPushStudent = async (req,res) => {
try {
    const {_id} = req.params
    const {object} = req.params
    const {date, subject, message,myId}= req.body;
    if(typeof date !== "undefined"){
    const student = await Student.findByIdAndUpdate({_id:_id},{
        $push:{
          [`${object}`]:[
                {
                    date:date,
                    subject:subject,
                    message:message,
                    myId:myId
                }]
        }
    })
      res.status(200).json(student)}
     
      else{
        const student = await Student.findByIdAndUpdate({_id:_id}, req.body)
        res.status(200).json(student)
      }
    } catch (error) {
        console.log(error) 
     }  
}

const putSetStudent = async (req,res) => {
    const {_id} = req.params;
    const {object} = req.params;
    const {key} = req.params;
    const {index} = req.params;
    const {value} = req.body;
    const student =  await Student.findOneAndUpdate({_id:_id},
        {$set:
          {
           [`${object}.${index}.${key}`]:value
        }
      })
      res.status(200).json(student)  
}

const deleteOneStudent =  async(req,res)=>{
    try {
        const {_id}=req.params
        const student = await Student.findByIdAndDelete({_id:_id}, req.body)

        if(!student){
            res.status(404).json("student not found")
        }else{
        res.status(200).json(student)}
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}

module.exports = {
    getOneStudent, 
    getAllStudent,
     postStudent,
     putPullStudent, 
     putPushStudent,
     putSetStudent,
     putOneStudent,
     deleteOneStudent
}