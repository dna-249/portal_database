const jwt = require("jsonwebtoken");
const { Portal } = require("../model/portal");

exports.studentVerify = async (req, res) => {
    const authHeader = req.headers.authorization;
    const { studentName, password } = req.body; 

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Authentication failed: Token is missing or invalid format." });
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, process.env.secret);

        const student = await Portal.findOne({ studentName: studentName, password: password });

        if (!student) {
            return res.status(404).json({ success: false, message: "Verification failed: Student record not found or credentials invalid." });
        }

        return res.status(200).json({
            success: true,
            message: "Student verified successfully.",
            _id: student._id,
            student
        });

    } catch (error) {
        console.error("Verification error:", error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token has expired. Please log in again." });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token structure or signature." });
        }

        return res.status(500).json({ success: false, message: "An internal server error occurred during verification." });
    }
};