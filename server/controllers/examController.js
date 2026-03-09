import Exam from "../models/Exam.js";

// Get all exams
export const getAllExams = async (req, res) => {
  try {
    const { class: classId, subject, academicYear, term, status } = req.query;
    let query = {};
    
    if (classId) query.class = classId;
    if (subject) query.subject = subject;
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;
    if (status) query.status = status;
    
    const exams = await Exam.find(query)
      .populate("class", "className section")
      .populate("subject", "subjectName subjectCode")
      .populate("invigilator", "username email");
      
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get exam by ID
export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("class", "className section")
      .populate("subject", "subjectName subjectCode")
      .populate("invigilator", "username email");
      
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create exam
export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update exam
export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete exam
export const deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Publish exam result
export const publishExamResult = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { resultPublished: true, resultPublishDate: new Date() },
      { new: true }
    );
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
