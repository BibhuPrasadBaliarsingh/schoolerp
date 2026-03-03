import express from "express";
import IncomeExpense from "../models/IncomeExpense.js";
import authMiddleware, { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type) query.type = type;
    const records = await IncomeExpense.find(query);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const record = await IncomeExpense.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const record = await IncomeExpense.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const record = await IncomeExpense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await IncomeExpense.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
