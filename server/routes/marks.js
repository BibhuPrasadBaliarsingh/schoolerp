import express from "express";
import {
  getAllMarks,
  getMarksById,
  createMarks,
  updateMarks,
  deleteMarks,
  getStudentMarksheet,
  verifyMarks
} from "../controllers/marksController.js";

const router = express.Router();

router.get("/", getAllMarks);
router.get("/marksheet", getStudentMarksheet);
router.get("/:id", getMarksById);
router.post("/", createMarks);
router.put("/:id", updateMarks);
router.delete("/:id", deleteMarks);
router.post("/:id/verify", verifyMarks);

export default router;
