
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
    payment:{type:String},
    
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
   
    weeks:[{ weeks: {type:String}}],
    terms:[{ terms: {type:String}}], 
    teacherComment:[{ teacherComment: {type:String}}],
    teacherName:[{teacherName: {type:String}}], 
    teacherSign:[{ teacherSign: {type:String}}] ,

    mon:[{  date: {type:String}, tajweed: {type:String}, hifz: {type:String}, tajError: {type:String}, hifzError: {type:String}, toV: {type:String}, fromV: {type:String}, chapter: {type:String}, }],
    tue:[{  date: {type:String}, tajweed: {type:String}, hifz: {type:String}, tajError: {type:String}, hifzError: {type:String}, toV: {type:String}, fromV: {type:String}, chapter: {type:String},  }],
    wed:[{ date: {type:String}, tajweed: {type:String}, hifz: {type:String}, tajError: {type:String}, hifzError: {type:String}, toV: {type:String}, fromV: {type:String}, chapter: {type:String},  }],
    thur:[{ date: {type:String}, tajweed: {type:String}, hifz: {type:String}, tajError: {type:String}, hifzError: {type:String}, toV: {type:String}, fromV: {type:String}, chapter: {type:String}, }], 
    fri:[{ date: {type:String}, tajweed: {type:String}, hifz: {type:String}, tajError: {type:String}, hifzError: {type:String}, toV: {type:String}, fromV: {type:String}, chapter: {type:String}, }], 
    sat:[{ date: {type:String}, tajweed: {type:String}, hifz: {type:String}, tajError: {type:String}, hifzError: {type:String}, toV: {type:String}, fromV: {type:String}, chapter: {type:String}, }], 
    sun:[{  date: {type:String}, tajweed: {type:String}, hifz: {type:String}, tajError: {type:String}, hifzError: {type:String}, toV: {type:String}, fromV: {type:String}, chapter: {type:String}, }], 
        
   
    prevStarting: [{ prevStarting: {type:String}}],
    preStopping:[{preStopping: {type:String}}], 
    preScore:[{ preScore: {type:String}}],
    newStarting:  [{newStarting: {type:String}}],
    newStopping:  [{newStopping: {type:String}}],
    newScore:  [{ newScore: {type:String}}],
    hodComment: [{ hodComment: {type:String}}],


    parentName:[{ parentName: {type:String}}],
    parentComment:[{parentComment: {type:String}}],
    parentDate:[{ parentDate: {type:String}}]


});

const Portal = mongoose.model("portal",studentData)

module.exports = { Portal };
