import Staff from "../models/Staff.js";

// Get all staff or filter by department and status
export const getAllStaff = async (req, res) => {
  try {
    const { department, status } = req.query;
    let query = {};
    if (department) query.department = department;
    if (status) query.status = status;
    const staff = await Staff.find(query);
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff by ID
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create staff
export const createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
