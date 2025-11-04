
const mongoose = require("mongoose")

 const studentData = mongoose.Schema({
    school: {type:String},
    studentName:{type:String},
    class: {type:String},
    term: {type:String},
    session: {type:String},
    admissionNo: {type:String},
    age:{type:String},
    sex: {type:String},
    studentPhoto: {type:String},
    password: {type:String},
    
    QURAN:[{ CA1:{type:String}, CA2:{type:String}, Ass:{type:String}, Exam: {type:String }}],
    TAJWEED:[{ CA1:{type:String},CA2:{type:String},Ass:{type:String}, Exam: {type:String }}],
    TAUHEED:[{ CA1:{type:String}, CA2:{type:String}, Ass:{type:String}, Exam:{type:String }}],
    FIQH:[{ CA1:{type:String},  CA2:{type:String}, Ass:{type:String}, Exam: {type:String }}],
    HADITH:[{ CA1:{type:String}, CA2:{type:String}, Ass:{type:String}, Exam:{type:String }}],
    ARABIC:[{ CA1:{type:String}, CA2:{type:String}, Ass:{type:String}, Exam:{type:String }}],
    AZKHAR:[{ CA1:{type:String}, CA2:{type:String}, Ass:{type:String}, Exam:{type:String }}],
    SIRAH:[{ CA1:{type:String}, CA2:{type:String}, Ass:{type:String}, Exam:{type:String }}],
    HURUF:[{ CA1:{type:String}, CA2:{type:String}, Ass:{type:String}, Exam:{type:String }}],

  
    moralEthics: {type:String},
    punctuality:{type:String},
    handWriting: {type:String},
    honesty: {type:String},
    fluency: {type:String},
    selfControl: {type:String},
    responsibility:{type:String},
    initiative:{type:String},
    politeness: {type:String},
    headRemark: {type:String},
    classTeacherRemark:{type:String},
});

const Portal = mongoose.model("portal",studentData)

module.exports = { Portal };
