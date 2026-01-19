const mongoose = require('mongoose');
const { Portal} = require("../model/portal")


const postStudent = async(req,res) => {

    try {
   
    const { 
        password,studentPhoto,  moralEthics, punctuality, handWriting, honesty, fluency,  selfControl, responsibility, initiative,  politeness,  headRemark,
        classTeacherRemark,payment, school,studentName, classes, term, session, admissionNo, sex, subjects, age,
        
} = req.body


     const newStudent = await Portal.create({
    school: school,
    studentName:studentName,
    class:classes,
    term: term,
    session: session,
    admissionNo:admissionNo,
    age: age,
    sex: sex,
    password: password,
    payment: payment,
    studentPhoto:studentPhoto,

    
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
    const student = await Portal.findById(_id)
    res.status(200).json(student)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const putOneStudent =  async(req,res)=>{
    try {
       
        const {_id,name} = req.params
        if(_id){
        const student = await Portal.findByIdAndUpdate({_id:_id}, req.body)
        
        if(!student){
            res.status(404).json("student not found")
        }

        res.status(200).json(student)
    }

    if(name){

      const id = await Portal.findOne({studentName:name})
      const student = await Portal.findByIdAndUpdate({_id:id._id}, req.body)
        
        if(!student){
            res.status(404).json("student not found")
        }

        res.status(200).json(student)   
    }
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}

const putPullStudent = async (req,res) => {
    const {_id} = req.params;
    const {_id2} = req.params;
    const {object} = req.params

    const student =  await Portal.findOneAndUpdate({_id:_id},
        {$pull:
          {[`${object}`]:{_id:_id2}}
      })
      res.status(200).json(student)
                    
}

const putPushStudent = async (req,res) => {
    const {object,id} = req.params;
    const {CA1,CA2,Ass,Exam,
         date,     tajweed,  weeks,terms,   hifz,     tajError,     hifzError,     toV,     fromV,     chapter,   
        prevStarting,  preStopping,   preScore, newStarting, newStopping,   newScore,   hodComment ,  parentName, parentComment,   parentDate,
        teacherComment, teacherName,    teacherSign,
    } =req.body

try {
    if(CA1 ||CA2 ||Ass ||Exam){
         await Portal.findByIdAndUpdate({_id:id},{
        $push:{ [`${object}`]:[{ CA1:CA1, CA2:CA2, Ass:Ass, Exam:Exam}],
               }})

    }else if( parentDate ||parentComment|| parentName){
            await Portal.findByIdAndUpdate({_id:id},{
            $push:{ 
                ['parent.parentName']:[{ parentName: parentName}],
                ['parent.parentComment']:[{parentComment:parentComment}],
                ['parent.parentDate']:[{ parentDate:  parentDate}]
            }})

    }else if(newStarting ||newStopping|| newScore||hodComment){
            await Portal.findByIdAndUpdate({_id:id},{
                $push:{ ['management.newStarting']:  [{newStarting: newStarting}],
                        ['management.newStopping']:  [{newStopping: newStopping}],
                        ['management.newScore']:  [{ newScore: newScore}],
                        ['management.hodComment']: [{ hodComment:  hodComment}],
                        ['management.prevStarting']: [{ prevStarting: prevStarting}],
                        ['management.preStopping']:[{preStopping: preStopping}], 
                        ['management.preScore']:[{ preScore: preScore}],

                 }})
    
        } else if(weeks || terms || teacherComment || teacherName || teacherSign){
            await Portal.findByIdAndUpdate({_id:id},{
             $push:{ 
                [`teacher.${object}`]: [{ date: date,tajweed: tajweed,hifz: hifz,tajError:tajError,hifzError: hifzError,toV:toV,fromV: fromV,chapter:  chapter,} ], 
                ['teacher.weeks']:[{ weeks: weeks}],
                ['teacher.terms']:[{ terms: terms}], 
                ['teacher.teacherComment']:[{ teacherComment: teacherComment}],
                [' teacher.teacherName']:[{teacherName: teacherName}], 
                ['teacher.teacherSign']:[{ teacherSign:teacherSign}] ,
               }})
           } else {

            await Portal.findByIdAndUpdate({_id:id},{
             $push:{ 
                [`teacher.${object}`]: [{ date: date,tajweed: tajweed,hifz: hifz,tajError:tajError,hifzError: hifzError,toV:toV,fromV: fromV,chapter:  chapter,} ], 
               }})
           }
           

    
      
    res.json("successful")
    } catch (error) {
        console.log(error) 
     }  
    }
const putSetStudent = async (req,res) => {
    const {_id} = req.params;
    const {object} = req.params;
   
    // const {index} = req.params;
    const {CA1,CA2,Ass,Exam} =req.body
    const student =  await Portal.findOneAndUpdate({_id:_id},
        {$set:
          {
           [`${object}.0`]:[{ CA1:CA1, CA2:CA2, Ass:Ass, Exam:Exam}]
        }
      })
      res.status(200).json(student)  
}

const deleteOneStudent =  async(req,res)=>{
    try {
        const {_id}=req.params
        const student = await Portal.findByIdAndDelete({_id:_id}, req.body)

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