import express from "express";

import protect from "../middleware/authMiddleware.js";

import { addAnswer , deleteAnswer,
    updateAnswer,
    acceptAnswer
 } from "../controllers/answerController.js";

const router = express.Router();

router.post("/:questionId", protect, addAnswer);

router.patch("/:id/accept", protect, acceptAnswer);

router.put("/:id", protect, updateAnswer);

router.delete("/:id", protect, deleteAnswer);

export default router;