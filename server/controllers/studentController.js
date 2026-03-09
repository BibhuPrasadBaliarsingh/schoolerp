import Student from "../models/Student.js";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const { class: classId, section, status, academicYear } = req.query;
    let query = {};
    
    if (classId) query.class = classId;
    if (section) query.section = section;
    if (status) query.status = status;
    if (academicYear) query.academicYear = academicYear;
    
    const students = await Student.find(query)
      .populate("userId", "email username")
      .populate("class", "className section")
      .populate("busRoute", "registrationNumber route");
      
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("userId", "email username")
      .populate("class", "className section")
      .populate("busRoute");
      
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create student
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get students by class
export const getStudentsByClass = async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.classId, status: "active" })
      .populate("userId", "email username");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
