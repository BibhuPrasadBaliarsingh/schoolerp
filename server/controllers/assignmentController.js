import Assignment from "../models/Assignment.js";

// Get all assignments or filter by createdBy and class
export const getAllAssignments = async (req, res) => {
  try {
    const { createdBy, class: cls } = req.query;
    let query = {};
    if (createdBy) query.createdBy = createdBy;
    if (cls) query.class = cls;
    const assignments = await Assignment.find(query);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create assignment
export const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete assignment
export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
