import Class from "../models/Class.js";

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const { academicYear, status } = req.query;
    let query = {};
    
    if (academicYear) query.academicYear = academicYear;
    if (status) query.status = status;
    
    const classes = await Class.find(query)
      .populate("classTeacher", "username email")
      .populate("subjects", "subjectName subjectCode")
      .populate("students", "firstName lastName rollNumber");
      
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get class by ID
export const getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate("classTeacher", "username email")
      .populate("subjects", "subjectName subjectCode")
      .populate("students", "firstName lastName rollNumber");
      
    if (!classData) return res.status(404).json({ error: "Class not found" });
    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create class
export const createClass = async (req, res) => {
  try {
    const classData = await Class.create(req.body);
    res.status(201).json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update class
export const updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classData) return res.status(404).json({ error: "Class not found" });
    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete class
export const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add student to class
export const addStudentToClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      { $push: { students: req.body.studentId } },
      { new: true }
    );
    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add subject to class
export const addSubjectToClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      { $push: { subjects: req.body.subjectId } },
      { new: true }
    );
    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
