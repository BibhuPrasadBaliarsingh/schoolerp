import Marks from "../models/Marks.js";

// Get all marks
export const getAllMarks = async (req, res) => {
  try {
    const { student, exam, subject, class: classId, academicYear, term } = req.query;
    let query = {};
    
    if (student) query.student = student;
    if (exam) query.exam = exam;
    if (subject) query.subject = subject;
    if (classId) query.class = classId;
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;
    
    const marks = await Marks.find(query)
      .populate("student", "firstName lastName rollNumber studentId")
      .populate("exam", "examName examType examDate")
      .populate("subject", "subjectName subjectCode")
      .populate("class", "className section");
      
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get marks by ID
export const getMarksById = async (req, res) => {
  try {
    const marks = await Marks.findById(req.params.id)
      .populate("student", "firstName lastName rollNumber")
      .populate("exam", "examName examType")
      .populate("subject", "subjectName");
      
    if (!marks) return res.status(404).json({ error: "Marks not found" });
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create marks
export const createMarks = async (req, res) => {
  try {
    const marks = await Marks.create(req.body);
    res.status(201).json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update marks
export const updateMarks = async (req, res) => {
  try {
    const marks = await Marks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!marks) return res.status(404).json({ error: "Marks not found" });
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete marks
export const deleteMarks = async (req, res) => {
  try {
    await Marks.findByIdAndDelete(req.params.id);
    res.json({ message: "Marks deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student marksheet
export const getStudentMarksheet = async (req, res) => {
  try {
    const { studentId, academicYear, term } = req.query;
    
    const marks = await Marks.find({ 
      student: studentId, 
      academicYear, 
      term,
      isVerified: true 
    })
      .populate("exam", "examName examType")
      .populate("subject", "subjectName subjectCode totalMarks");
      
    // Calculate overall percentage
    let totalMarks = 0;
    let totalObtained = 0;
    
    marks.forEach(mark => {
      if (!mark.isAbsent) {
        totalMarks += mark.totalMarks;
        totalObtained += mark.marksObtained;
      }
    });
    
    const overallPercentage = totalMarks > 0 ? (totalObtained / totalMarks * 100).toFixed(2) : 0;
    
    res.json({
      marks,
      summary: {
        totalMarks,
        totalObtained,
        overallPercentage
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify marks
export const verifyMarks = async (req, res) => {
  try {
    const marks = await Marks.findByIdAndUpdate(
      req.params.id,
      { isVerified: true, verifiedBy: req.user.id },
      { new: true }
    );
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
