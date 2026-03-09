import express from "express";
import {
  getAllNotifications,
  getUserNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  getUnreadCount
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getAllNotifications);
router.get("/user/:userId", getUserNotifications);
router.get("/user/:userId/unread-count", getUnreadCount);
router.get("/:id", getNotificationById);
router.post("/", createNotification);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);
router.post("/:id/read", markAsRead);

export default router;
