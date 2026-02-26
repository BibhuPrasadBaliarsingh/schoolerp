import IncomeExpense from "../models/IncomeExpense.js";

// Get all income/expense records or filter by type
export const getAllIncomeExpenses = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type) query.type = type;
    const records = await IncomeExpense.find(query);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get income/expense record by ID
export const getIncomeExpenseById = async (req, res) => {
  try {
    const record = await IncomeExpense.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create income/expense record
export const createIncomeExpense = async (req, res) => {
  try {
    const record = await IncomeExpense.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update income/expense record
export const updateIncomeExpense = async (req, res) => {
  try {
    const record = await IncomeExpense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete income/expense record
export const deleteIncomeExpense = async (req, res) => {
  try {
    await IncomeExpense.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
