import express from "express";
import {
  getAllAdmitCards,
  getAdmitCardById,
  getAdmitCardByStudentExam,
  createAdmitCard,
  bulkCreateAdmitCards,
  updateAdmitCard,
  deleteAdmitCard,
  verifyAdmitCard,
  cancelAdmitCard
} from "../controllers/admitCardController.js";

const router = express.Router();

router.get("/", getAllAdmitCards);
router.get("/student/:studentId/exam/:examId", getAdmitCardByStudentExam);
router.get("/:id", getAdmitCardById);
router.post("/", createAdmitCard);
router.post("/bulk", bulkCreateAdmitCards);
router.put("/:id", updateAdmitCard);
router.delete("/:id", deleteAdmitCard);
router.post("/:id/verify", verifyAdmitCard);
router.post("/:id/cancel", cancelAdmitCard);

export default router;
