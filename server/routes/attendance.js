import express from "express";
import {
  getAllAttendance,
  getAttendanceById,
  markAttendance,
  markBulkAttendance,
  updateAttendance,
  deleteAttendance,
  getStudentAttendanceStats,
  getClassAttendanceByDate
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAllAttendance);
router.get("/stats", getStudentAttendanceStats);
router.get("/class", getClassAttendanceByDate);
router.get("/:id", getAttendanceById);
router.post("/", markAttendance);
router.post("/bulk", markBulkAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
