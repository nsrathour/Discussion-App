import express from "express";

import {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    deleteQuestion,
    searchQuestions,
    getMyQuestions,
    updateQuestion,
    toggleUpvote,
} from "../controllers/questionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", searchQuestions);

router.get("/", getAllQuestions);

router.get("/my", protect, getMyQuestions);

router.get("/:id", getQuestionById);

router.post("/", protect, createQuestion);

router.post("/:id/upvote", protect, toggleUpvote);

router.put("/:id", protect, updateQuestion);

router.delete("/:id", protect, deleteQuestion);

export default router;