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
     putPushStudent(subjects,newStudent)
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

const putPushStudent = async (subjects,id) => {
try {
    
        await Portal.findByIdAndUpdate({_id:id?._id},{
        $push:{
        QURAN:[{ CA1:subjects?.QURAN.CA1, CA2:subjects?.QURAN.CA2, Ass:subjects?.QURAN.Ass, Exam:subjects?.QURAN.Exam}],
        TAJWEED:[{CA1:subjects?.TAJWEED.CA1, CA2:subjects?.TAJWEED.CA2, Ass:subjects?.TAJWEED.Ass,  Exam:subjects?.TAJWEED.Exam}],
        TAUHEED:[{CA1:subjects?.TAUHEED.CA1, CA2:subjects?.TAUHEED.CA2, Ass:subjects?.TAUHEED.Ass,  Exam:subjects?.TAUHEED.Exam}],
        FIQH:[{CA1:subjects?.FIQH.CA1,  CA2:subjects?.FIQH.CA2, Ass:subjects?.FIQH.Ass, Exam:subjects?.FIQH.Exam}],
        HADITH:[{CA1:subjects?.HADITH.CA1, CA2:subjects?.HADITH.CA2, Ass:subjects?.HADITH.Ass,  Exam:subjects?.HADITH.Exam}],
        ARABIC:[{CA1:subjects?.ARABIC.CA1, CA2:subjects?.ARABIC.CA2, Ass:subjects?.ARABIC.Ass,  Exam:subjects?.ARABIC.Exam}],
        AZKHAR:[{CA1:subjects?.AZKHAR.CA1, CA2:subjects?.AZKHAR.CA2, Ass:subjects?.AZKHAR.Ass,  Exam:subjects?.AZKHAR.Exam}],
        SIRAH:[{CA1:subjects?.SIRAH.CA1, CA2:subjects?.SIRAH.CA2, Ass:subjects?.SIRAH.Ass,  Exam:subjects?.SIRAH.Exam}],
        HURUF:[{CA1:subjects?.HURUF.CA1, CA2:subjects?.HURUF.CA2, Ass:subjects?.HURUF.Ass,  Exam:subjects?.HURUF.Exam}],

    
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