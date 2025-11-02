const jwt = require("jsonwebtoken")
const {Portal} = require("../model/portal")
exports.studentLogin = async (req,res,next) =>{
  try {
    const {studentName, password} = req.body;
    const student = await Portal.findOne({studentName:studentName,password:password})
    if(!student) {
        res.status(404).json("not found")
    }
    const token = jwt.sign({studentName:student.studentName,password:student.password},process.env.secret)
    res.json(token) 
    next()
  } catch (error) {
   console.log(error) 
  }
}
 



