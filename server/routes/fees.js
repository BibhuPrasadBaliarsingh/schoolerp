import express from "express";
import Fee from "../models/Fee.js";
import authMiddleware, { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const fees = await Fee.find();
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ error: "Fee not found" });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Fee.findByIdAndDelete(req.params.id);
    res.json({ message: "Fee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
