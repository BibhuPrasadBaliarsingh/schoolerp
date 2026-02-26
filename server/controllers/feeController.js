import Fee from "../models/Fee.js";

// Get all fees
export const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get fee by ID
export const getFeeById = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ error: "Fee not found" });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create fee
export const createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update fee
export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete fee
export const deleteFee = async (req, res) => {
  try {
    await Fee.findByIdAndDelete(req.params.id);
    res.json({ message: "Fee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
