const mongoose = require('mongoose');
const { Portal } = require("../model/portal");

// Create a new student (Initializes an empty academic record for their session)

const yearTerm = async (id) => {
    // Corrected findById syntax (pass id directly)
    const student = await Portal.findById(id);
    if (!student) throw new Error("Student not found");
    
    return {
        term: student.term,
        year: student.session
    };
};
const postStudent = async (req, res) => {
    try {
        const { 
            password, studentPhoto, moralEthics, punctuality, handWriting, honesty, fluency, selfControl, responsibility, initiative, politeness, headRemark,
            classTeacherRemark, payment, school, studentName, classes, term, session, admissionNo, sex, subjects, age 
        } = req.body;

        // Automatically structure the first academic year based on their session/year
        // For example, if session is "2026", it creates a 2026 object ready for scores.
        const currentYearRecord = {
            year: session || new Date().getFullYear().toString(), 
            firstTerm: {},
            secondTerm: {},
            thirdTerm: {}
        };

        const newStudent = await Portal.create({
            ...req.body, // Spread remaining simple fields
            class: classes,
            academicYears: [currentYearRecord] // Inject dynamic year
        });

        res.status(201).json({ message: "Successfully uploaded", student: newStudent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllStudent = async (req, res) => {
    try {
        const students = await Portal.find({});
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOneStudent = async (req, res) => {
    try {
        const { _id } = req.params;
        const student = await Portal.findById(_id);
        if (!student) return res.status(404).json("Student not found");
        
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const putOneStudent = async (req, res) => {
    try {
        const { _id, name } = req.params;
        let student;

        if (_id) {
            student = await Portal.findByIdAndUpdate(_id, req.body, { new: true });
        } else if (name) {
            student = await Portal.findOneAndUpdate({ studentName: name }, req.body, { new: true });
        }

        if (!student) {
            return res.status(404).json("Student not found");
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Add a brand new Academic Year for a student progressing to a new class/session


const putPullStudent = async (req, res) => {
    try {
        const { _id, _id2, object } = req.params;

        const student = await Portal.findOneAndUpdate(
            { _id: _id },
            { $pull: { [object]: { _id: _id2 } } },
            { new: true }
        );
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putPushStudent = async (req, res) => {
    const { object, id } = req.params;
    const {
        CA1, CA2, Ass, Exam,// <-- Added year, term, subject here
        date, tajweed, weeks, terms, hifz, tajError, hifzError, toV, fromV, chapter,
        prevStarting, preStopping, preScore, newStarting, newStopping, newScore, hodComment,
        parentName, parentComment, parentDate, teacherComment, teacherName, teacherSign,
        headRemark, classTeacherRemark
    } = req.body;

        const { year, term} = await yearTerm(id)
        

    try {
        // --- UPDATED: Pushing Academic Scores using Dynamic Years ---
        // Expected variables in req.body: year (e.g. "2026"), term (e.g. "firstTerm"), subject (e.g. "QURAN")
        if (CA1 || CA2 || Ass || Exam) {
            const test = await Portal.findOneAndUpdate(
                { _id: id }, // 1. Find the student AND the specific year
                {
                    // 2. Use the $ operator to push into that specific year's term and subject array
                    $push: { [`academicYears.${year}.${term}.${object}`]: { CA1, CA2, Ass, Exam}}
                },
                { new: true }
            );
        console.log(test)


        } 
        // --- Daily Logs & Parent Info (Unchanged from previous logic) ---
        else if (parentDate || parentComment || parentName) {
            await Portal.findByIdAndUpdate(id, {
                $push: {
                    parentName: { parentName },
                    parentComment: { parentComment },
                    parentDate: { parentDate }
                }
            });
        } else if (newStarting || newStopping || newScore || hodComment) {
            await Portal.findByIdAndUpdate(id, {
                $push: {
                    newStarting: { newStarting },
                    newStopping: { newStopping },
                    newScore: { newScore },
                    hodComment: { hodComment },
                    prevStarting: { prevStarting },
                    preStopping: { preStopping },
                    preScore: { preScore },
                }
            });
        } else if (weeks || terms || teacherComment || teacherName || teacherSign) {
            // Assuming 'object' is a variable holding a string (e.g., 'subjects' or 'hifzRecords')
// and you want to push that into the specific term of a specific year.

await Portal.findByIdAndUpdate(
    id, 
    {
    //     // 1. $push is only for arrays (assuming the dynamic [object] is an array in your schema)
    //     $push: {
    //         [`academicYears.${year}.${term}.${object}`]: { 
    //             date, tajweed, hifz, tajError, hifzError, toV, fromV, chapter 
    //         }
    //     },
    //     // 2. $set is for updating standard string/number fields
        $push: {
            [`academicYears.${year}.${term}.weeks`]: weeks,
            [`academicYears.${year}.${term}.terms`]: terms,
            [`academicYears.${year}.${term}.teacherComment`]: teacherComment,
            [`academicYears.${year}.${term}.teacherName`]: teacherName,
            [`academicYears.${year}.${term}.teacherSign`]: teacherSign
        }
    },
    {
        // 3. arrayFilters tells MongoDB to find the element in the academicYears array 
        // where the "year" matches your variable (e.g., "2025")
        new: true // Optional: returns the updated document instead of the old one
    }
);
        }else if (headRemark || classTeacherRemark|| politeness || initiative|| moralEthics || punctuality || responsibility){
            await Portal.findOneAndUpdate(id,{
            $push:{
                // moralEthics:  moralEthics,
                // punctuality:punctuality,
                // handWriting: handWriting,
                // honesty: honesty,
                // fluency: fluency,
                // selfControl: selfControl,
                // responsibility:responsibility,
                // initiative:initiative,
                // politeness: politeness,
                [`academicYears.${year}.${term}.headRemark`]: headRemark,
                [`academicYears.${year}.${term}.classTeacherRemark`]: classTeacherRemark
            }
            })

        } else {
            await Portal.findByIdAndUpdate(id, {
                $push: {
                    [object]: { date, tajweed, hifz, tajError, hifzError, toV, fromV, chapter }
                }
            });
        }

        res.status(200).json("Successful");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const putSetProgress = async (req, res) => {
    try {
        const { object, idx, _id } = req.params;
        const {
            date, tajweed, weeks, terms, hifz, tajError, hifzError, toV, fromV, chapter,
            prevStarting, preStopping, preScore, newStarting, newStopping, newScore, hodComment,
            parentName, parentComment, parentDate, teacherComment, teacherName, teacherSign,
        } = req.body;

        const student = await Portal.findOneAndUpdate(
            { _id: _id },
            {
                $set: {
                    [`${object}.${idx}`]: { date, tajweed, hifz, tajError, hifzError, toV, fromV, chapter },
                    [`weeks.${idx}`]: { weeks },
                    [`terms.${idx}`]: { terms },
                    [`teacherComment.${idx}`]: { teacherComment },
                    [`teacherName.${idx}`]: { teacherName },
                    [`teacherSign.${idx}`]: { teacherSign },
                    [`newStarting.${idx}`]: { newStarting },
                    [`newStopping.${idx}`]: { newStopping },
                    [`newScore.${idx}`]: { newScore },
                    [`hodComment.${idx}`]: { hodComment },
                    [`prevStarting.${idx}`]: { prevStarting },
                    [`preStopping.${idx}`]: { preStopping },
                    [`preScore.${idx}`]: { preScore },
                    [`parentName.${idx}`]: { parentName },
                    [`parentComment.${idx}`]: { parentComment },
                    [`parentDate.${idx}`]: { parentDate }
                }
            },
            { new: true }
        );
        
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putSetStudent = async (req, res) => {
    try {
        const { _id ,object} = req.params;
        const { CA1, CA2, Ass, Exam, headRemark,
                 classTeacherRemark} = req.body; // <-- Passing target data from body

        const { year, term} = await yearTerm(_id)
        
        // --- UPDATED: Setting Academic Scores using Dynamic Years ---
        if (CA1 || CA2 || Ass || Exam){
      const student = await Portal.findOneAndUpdate(
            { _id: _id }, // Match the student and the specific year block
            { 
                // Overwrite the first index (.0) of the specific term and subject
                $set: { [`academicYears.${year}.${term}.${object}`]: { CA1, CA2, Ass, Exam}}

            },
            { new: true }
        );

        if (!student) {
            return res.status(404).json("Student or Year not found");
        }
        res.status(200).json(student);
        } else{
            const student = await Portal.findOneAndUpdate(
            { _id: _id }, // Match the student and the specific year block
            { 
                // Overwrite the first index (.0) of the specific term and subject
                $set: { [`academicYears.${year}.${term}.headRemark`]: headRemark,
                [`academicYears.${year}.${term}.classTeacherRemark`]: classTeacherRemark}

            },
            { new: true }
        );

        if (!student) {
            return res.status(404).json("Student or Year not found");
        }
        res.status(200).json(student);
        }
        

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOneStudent = async (req, res) => {
    try {
        const { _id } = req.params;
        const student = await Portal.findByIdAndDelete(_id);

        if (!student) {
            return res.status(404).json("Student not found");
        }
        res.status(200).json({ message: "Student deleted successfully", student });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    deleteOneStudent,
    putSetProgress
};