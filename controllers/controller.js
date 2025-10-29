const mongoose = require('mongoose');
const { Portal} = require("../model/portal")


const postStudent = async(req,res) => {
    const { } = req.body
    await Portal.create({
    school: school,
    studentName:studentName,
    class:classes,
    term: term,
    session: session,
    admissionNo:admissionNo,
    age: age,
    sex: sex,
    
    QURAN:[{ CA1:CA1, CA2:CA2, Ass:Ass, Exam: Exam}],
    TAJWEED:[{CA1:CA1, CA2:CA2, Ass:Ass,  Exam: Exam}],
    TAUHEED:[{CA1:CA1, CA2:CA2, Ass:Ass,  Exam: Exam}],
    FIQH:[{CA1:CA1,  CA2:CA2, Ass:Ass, Exam: Exam}],
    HADITH:[{CA1:CA1, CA2:CA2, Ass:Ass,  Exam: Exam}],
    ARABIC:[{CA1:CA1, CA2:CA2, Ass:Ass,  Exam: Exam}],
    AZKHAR:[{CA1:CA1, CA2:CA2, Ass:Ass,  Exam: Exam}],
    SIRAH:[{CA1:CA1, CA2:CA2, Ass:Ass,  Exam: Exam}],
    HURUF:[{CA1:CA1, CA2:CA2, Ass:Ass,  Exam: Exam}],

    

  
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