import Answer from "../models/Answers.js";
import Question from "../models/Question.js";

export const addAnswer = async (req, res) => {
    try {
        const { answer } = req.body;
        const { questionId } = req.params;

        if (!answer) {
            return res.status(400).json({
                message: "Answer is required",
            });
        }

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        const newAnswer = await Answer.create({
            answer,
            questionId,
            userId: req.user.userId,
        });

        res.status(201).json({
            message: "Answer added successfully",
            answer: newAnswer,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const acceptAnswer = async (req, res) => {
    try {
        const { id } = req.params;

        const answer = await Answer.findById(id);

        if (!answer) {
            return res.status(404).json({
                message: "Answer not found",
            });
        }

        const question = await Question.findById(answer.questionId);

        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        if (
            question.userId.toString() !== req.user.userId &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access Denied",
            });
        }

        await Answer.updateMany(
            { questionId: answer.questionId },
            { isAccepted: false }
        );

        answer.isAccepted = true;

        await answer.save();

        res.status(200).json({
            message: "Answer accepted successfully",
            answer,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;

        if (!answer) {
            return res.status(400).json({
                message: "Answer is required",
            });
        }

        const existingAnswer = await Answer.findById(id);

        if (!existingAnswer) {
            return res.status(404).json({
                message: "Answer not found",
            });
        }

        if (
            existingAnswer.userId.toString() !== req.user.userId &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access Denied",
            });
        }

        existingAnswer.answer = answer;

        await existingAnswer.save();

        res.status(200).json({
            success: true,
            message: "Answer updated successfully",
            answer: existingAnswer,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;

        const answer = await Answer.findById(id);

        if (!answer) {
            return res.status(404).json({
                message: "Answer not found",
            });
        }

        if (
            answer.userId.toString() !== req.user.userId &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access Denied",
            });
        }

        await answer.deleteOne();

        res.status(200).json({
            message: "Answer deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};