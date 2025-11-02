const jwt = require("jsonwebtoken")
const {Portal} =require("../model/portal")

exports.studentVerify = async (req,res,next)=>{
    const {header,studentName,password} = req.body

    try {
       const token = await header;
       const student = await Portal.findOne({studentName:studentName,password:password})
       if(!token){
        console.log("access denied")
       } 
       const verified = jwt.verify(token, process.env.secret)
       req.studentName = verified;
       req.password = verified;
       res.json(student)
       next()
    } catch (error) {
        console.log(error)
    }
}