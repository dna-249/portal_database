const mongoose = require('mongoose');
const { Portal} = require("../model/portal")


const postStudent = async(req,res) => {

    try {
   
    const {   moralEthics, punctuality, handWriting, honesty, fluency,  selfControl, responsibility, initiative,  politeness,  headRemark,
   classTeacherRemark,  school,studentName, classes, term, session, admissionNo, sex, subjects, age } = req.body

    const sub = subjects?.reduce((accumulator, subject) => {
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
    
    QURAN:[{ CA1:sub[0]?.QURAN.CA1, CA2:sub[0]?.QURAN.CA2, Ass:sub[0]?.QURAN.Ass, Exam:sub[0]?.QURAN.Exam}],
    TAJWEED:[{CA1:sub[0]?.TAJWEED.CA1, CA2:sub[0]?.TAJWEED.CA2, Ass:sub[0]?.TAJWEED.Ass,  Exam:sub[0]?.TAJWEED.Exam}],
    TAUHEED:[{CA1:sub[0]?.TAUHEED.CA1, CA2:sub[0]?.TAUHEED.CA2, Ass:sub[0]?.TAUHEED.Ass,  Exam:sub[0]?.TAUHEED.Exam}],
    FIQH:[{CA1:sub[0]?.FIQH.CA1,  CA2:sub[0]?.FIQH.CA2, Ass:sub[0]?.FIQH.Ass, Exam:sub[0]?.FIQH.Exam}],
    HADITH:[{CA1:sub[0]?.HADITH.CA1, CA2:sub[0]?.HADITH.CA2, Ass:sub[0]?.HADITH.Ass,  Exam:sub[0]?.HADITH.Exam}],
    ARABIC:[{CA1:sub[0]?.ARABIC.CA1, CA2:sub[0]?.ARABIC.CA2, Ass:sub[0]?.ARABIC.Ass,  Exam:sub[0]?.ARABIC.Exam}],
    AZKHAR:[{CA1:sub[0]?.AZKHAR.CA1, CA2:sub[0]?.AZKHAR.CA2, Ass:sub[0]?.AZKHAR.Ass,  Exam:sub[0]?.AZKHAR.Exam}],
    SIRAH:[{CA1:sub[0]?.SIRAH.CA1, CA2:sub[0]?.SIRAH.CA2, Ass:sub[0]?.SIRAH.Ass,  Exam:sub[0]?.SIRAH.Exam}],
    HURUF:[{CA1:sub[0]?.HURUF.CA1, CA2:sub[0]?.HURUF.CA2, Ass:sub[0]?.HURUF.Ass,  Exam:sub[0]?.HURUF.Exam}],

    

  
   moralEthics:  moralEthics,
   punctuality:punctuality,
   handWriting: handWriting,
   honesty: honesty,
   fluency: fluency,
   selfControl: selfControl,
   responsibility:responsibility,
   initiative:initiative,
   politeness: politeness,
   headRemark: headRemark,
   classTeacherRemark: classTeacherRemark,
        
                 })
                 res.json("successfully uploaded")
        } catch (error) {
        console.log(error)
        res.send(error)
    }
                    
}

const getAllStudent = async (req,res) =>{
    try{
        const student = await Portal.find({})
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