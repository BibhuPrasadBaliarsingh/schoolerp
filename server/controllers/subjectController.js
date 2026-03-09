import Subject from "../models/Subject.js";

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const { classLevel, status, type } = req.query;
    let query = {};
    
    if (classLevel) query.classLevel = classLevel;
    if (status) query.status = status;
    if (type) query.type = type;
    
    const subjects = await Subject.find(query).populate("teacher", "username email");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get subject by ID
export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("teacher", "username email");
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create subject
export const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update subject
export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete subject
export const deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
