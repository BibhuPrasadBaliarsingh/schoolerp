import express from "express";
import {
  getAllExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  publishExamResult
} from "../controllers/examController.js";

const router = express.Router();

router.get("/", getAllExams);
router.get("/:id", getExamById);
router.post("/", createExam);
router.put("/:id", updateExam);
router.delete("/:id", deleteExam);
router.post("/:id/publish", publishExamResult);

export default router;
