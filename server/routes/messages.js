import express from "express";
import {
  getAllMessages,
  getConversation,
  getMessageById,
  sendMessage,
  updateMessage,
  deleteMessage,
  markAsRead,
  getUnreadCount,
  getConversationsList
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getAllMessages);
router.get("/conversation", getConversation);
router.get("/conversations/:userId", getConversationsList);
router.get("/unread-count/:userId", getUnreadCount);
router.get("/:id", getMessageById);
router.post("/", sendMessage);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);
router.post("/:id/read", markAsRead);

export default router;
