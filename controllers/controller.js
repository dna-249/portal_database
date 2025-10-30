const mongoose = require('mongoose');
const { Portal} = require("../model/portal")


const postStudent = async(req,res) => {

    try {
   
    const {   moralEthics, punctuality, handWriting, honesty, fluency,  selfControl, responsibility, initiative,  politeness,  headRemark,
   classTeacherRemark,  school,studentName, classes, term, session, admissionNo, sex, subjects, age } = req.body


     const newStudent = await Portal.create({
    school: school,
    studentName:studentName,
    class:classes,
    term: term,
    session: session,
    admissionNo:admissionNo,
    age: age,
    sex: sex,
    QURAN:[{ CA1:"1", CA2:"2", Ass:"s", Exam:"am"}],
    TAJWEED:[{CA1:"CA1", CA2:"CA2", Ass:"Ass",  Exam:"Exam"}],
    TAUHEED:[{CA1:"CA1", CA2:"CA2", Ass:"Ass",  Exam:"Exam"}],
    FIQH:[{CA1:"",  CA2:"", Ass:"", Exam:"m"}],
    HADITH:[{CA1:"A1", CA2:"A2", Ass:"ss",  Exam:"xam"}],
    ARABIC:[{CA1:"A1", CA2:"A2", Ass:"ss",  Exam:"xam"}],
    AZKHAR:[{CA1:"A1", CA2:"A2", Ass:"ss",  Exam:"xam"}],
    SIRAH:[{CA1:"1", CA2:"2", Ass:"s",  Exam:"am"}],
    HURUF:[{CA1:"1", CA2:"2", Ass:"s",  Exam:"am"}],

    
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
     putPushStudent(subjects,studentName,newStudent)
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

const putPushStudent = async (subjects,name,id) => {
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

try {
    
        await Portal.findByIdAndUpdate({_id:id?._id},{
        $push:{
        QURAN:[{ CA1:sub?.QURAN[0].CA1, CA2:sub?.QURAN[0].CA2, Ass:sub?.QURAN[0].Ass, Exam:sub?.QURAN[0].Exam}],
        TAJWEED:[{CA1:sub?.TAJWEED[0].CA1, CA2:sub?.TAJWEED[0].CA2, Ass:sub?.TAJWEED[0].Ass,  Exam:sub?.TAJWEED[0].Exam}],
        TAUHEED:[{CA1:sub?.TAUHEED[0].CA1, CA2:sub?.TAUHEED[0].CA2, Ass:sub?.TAUHEED[0].Ass,  Exam:sub?.TAUHEED[0].Exam}],
        FIQH:[{CA1:sub?.FIQH[0].CA1,  CA2:sub?.FIQH[0].CA2, Ass:sub?.FIQH[0].Ass, Exam:sub?.FIQH[0].Exam}],
        HADITH:[{CA1:sub?.HADITH[0].CA1, CA2:sub?.HADITH[0].CA2, Ass:sub?.HADITH[0].Ass,  Exam:sub?.HADITH[0].Exam}],
        ARABIC:[{CA1:sub?.ARABIC[0].CA1, CA2:sub?.ARABIC[0].CA2, Ass:sub?.ARABIC[0].Ass,  Exam:sub?.ARABIC[0].Exam}],
        AZKHAR:[{CA1:sub?.AZKHAR[0].CA1, CA2:sub?.AZKHAR[0].CA2, Ass:sub?.AZKHAR[0].Ass,  Exam:sub?.AZKHAR[0].Exam}],
        SIRAH:[{CA1:sub?.SIRAH[0].CA1, CA2:sub?.SIRAH[0].CA2, Ass:sub?.SIRAH[0].Ass,  Exam:sub?.SIRAH[0].Exam}],
        HURUF:[{CA1:sub?.HURUF[0].CA1, CA2:sub?.HURUF[0].CA2, Ass:sub?.HURUF[0].Ass,  Exam:sub?.HURUF[0].Exam}],

        }
    })
     console.log("is working")
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