const jwt = require("jsonwebtoken");
const { Portal } = require("../model/portal");

exports.studentLogin = async (req, res) => {
    try {
        const { studentName, password } = req.body;

        if (!studentName || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Username and password are required." 
            });
        }

        const student = await Portal.findOne({ studentName: studentName, password: password });
        
        if (!student) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid username or password." 
            });
        }
        
        const token = jwt.sign(
            { id: student._id, studentName: student.studentName },
            process.env.secret,
            { expiresIn: '1h' }
        );
        
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token: token,
            studentId: student._id
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "An internal server error occurred during login." 
        });
    }
};