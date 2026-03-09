import AdmitCard from "../models/AdmitCard.js";

// Get all admit cards
export const getAllAdmitCards = async (req, res) => {
  try {
    const { student, exam, academicYear, status } = req.query;
    let query = {};
    
    if (student) query.student = student;
    if (exam) query.exam = exam;
    if (academicYear) query.academicYear = academicYear;
    if (status) query.status = status;
    
    const admitCards = await AdmitCard.find(query)
      .populate("student", "firstName lastName rollNumber studentId")
      .populate("exam", "examName examType examDate")
      .populate("issuedBy", "username email");
      
    res.json(admitCards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get admit card by ID
export const getAdmitCardById = async (req, res) => {
  try {
    const admitCard = await AdmitCard.findById(req.params.id)
      .populate({
        path: "student",
        populate: { path: "class", select: "className section" }
      })
      .populate("exam", "examName examType term academicYear")
      .populate({
        path: "examSchedule.subject",
        select: "subjectName subjectCode"
      })
      .populate("issuedBy", "username email");
      
    if (!admitCard) return res.status(404).json({ error: "Admit Card not found" });
    res.json(admitCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get admit card by student and exam
export const getAdmitCardByStudentExam = async (req, res) => {
  try {
    const { studentId, examId } = req.params;
    
    const admitCard = await AdmitCard.findOne({ 
      student: studentId, 
      exam: examId,
      status: "issued"
    })
      .populate({
        path: "student",
        populate: { path: "class", select: "className section" }
      })
      .populate("exam", "examName examType term academicYear")
      .populate({
        path: "examSchedule.subject",
        select: "subjectName subjectCode"
      });
      
    if (!admitCard) return res.status(404).json({ error: "Admit Card not found" });
    res.json(admitCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create admit card
export const createAdmitCard = async (req, res) => {
  try {
    const admitCard = await AdmitCard.create(req.body);
    res.status(201).json(admitCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bulk create admit cards for a class
export const bulkCreateAdmitCards = async (req, res) => {
  try {
    const { admitCards } = req.body; // Array of admit card data
    const cards = await AdmitCard.insertMany(admitCards);
    res.status(201).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update admit card
export const updateAdmitCard = async (req, res) => {
  try {
    const admitCard = await AdmitCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admitCard) return res.status(404).json({ error: "Admit Card not found" });
    res.json(admitCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete admit card
export const deleteAdmitCard = async (req, res) => {
  try {
    await AdmitCard.findByIdAndDelete(req.params.id);
    res.json({ message: "Admit Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify admit card
export const verifyAdmitCard = async (req, res) => {
  try {
    const admitCard = await AdmitCard.findByIdAndUpdate(
      req.params.id,
      { 
        isVerified: true, 
        verifiedBy: req.user.id,
        verificationDate: new Date()
      },
      { new: true }
    );
    res.json(admitCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel admit card
export const cancelAdmitCard = async (req, res) => {
  try {
    const admitCard = await AdmitCard.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    res.json(admitCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
