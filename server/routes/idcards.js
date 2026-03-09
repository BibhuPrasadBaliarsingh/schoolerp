import express from "express";
import {
  getAllIDCards,
  getIDCardById,
  getIDCardByStudent,
  createIDCard,
  updateIDCard,
  deleteIDCard,
  replaceIDCard
} from "../controllers/idCardController.js";

const router = express.Router();

router.get("/", getAllIDCards);
router.get("/student/:studentId", getIDCardByStudent);
router.get("/:id", getIDCardById);
router.post("/", createIDCard);
router.put("/:id", updateIDCard);
router.delete("/:id", deleteIDCard);
router.post("/:id/replace", replaceIDCard);

export default router;
