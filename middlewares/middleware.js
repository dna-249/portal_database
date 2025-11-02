const jwt = require("jsonwebtoken")
const {Portal} = require("../model/portal")
exports.studentLogin = async (req,res,next) =>{
  try {
    const {name, password} = req.body;
    const student = await Portal.findOne({name:name,password:password})
    if(!student) {
        res.status(404).json("not found")
    }
    const token = jwt.sign({name:student.name,password:student.password},process.env.secret)
    res.send(res.json(token)) 
    next()
  } catch (error) {
   console.log(error) 
  }
}
 



