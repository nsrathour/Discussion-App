import Question from "../models/Question.js";
import Answer from "../models/Answers.js";

export const searchQuestions = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                message: "Search query is required",
            });
        }

        const questions = await Question.find({
            $or: [
                {
                    title: {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    question: {
                        $regex: query,
                        $options: "i",
                    },
                },
            ],
        })
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: questions.length,
            questions,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getMyQuestions = async (req, res) => {
    try {
        const questions = await Question.find({
            userId: req.user.userId,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: questions.length,
            questions,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const createQuestion = async (req, res) => {
    try {
        const { title, question } = req.body;

        if (!title || !question) {
            return res.status(400).json({
                message: "Title and Question are required",
            });
        }

        const newQuestion = await Question.create({
            title,
            question,
            userId: req.user.userId,
        });

        res.status(201).json({
            message: "Question created successfully",
            question: newQuestion,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalQuestions = await Question.countDocuments();

        const questions = await Question.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalQuestions / limit),
            totalQuestions,
            questions,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id).populate(
            "userId",
            "name email"
        );

        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }
        
        question.views += 1;

await question.save();

        const answers = await Answer.find({
            questionId: id,
        })
            .populate("userId", "name email")
            .sort({ 
                isAccepted: -1,
                createdAt: -1 
             });

        res.status(200).json({
            question,
            answers,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, question } = req.body;

        if (!title || !question) {
            return res.status(400).json({
                message: "Title and Question are required",
            });
        }

        const existingQuestion = await Question.findById(id);

        if (!existingQuestion) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        if (
            existingQuestion.userId.toString() !== req.user.userId &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access Denied",
            });
        }

        existingQuestion.title = title;
        existingQuestion.question = question;

        await existingQuestion.save();

        res.status(200).json({
            success: true,
            message: "Question updated successfully",
            question: existingQuestion,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id);

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

        await Answer.deleteMany({
            questionId: id,
        });

        await question.deleteOne();

        res.status(200).json({
            message: "Question deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const toggleUpvote = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        const userId = req.user.userId;

        const alreadyUpvoted = question.upvotes.some(
            (id) => id.toString() === userId
        );

        if (alreadyUpvoted) {
            question.upvotes.pull(userId);

            await question.save();

            return res.status(200).json({
                message: "Upvote removed",
                totalUpvotes: question.upvotes.length,
            });
        }

        question.upvotes.push(userId);

        await question.save();

        res.status(200).json({
            message: "Question upvoted",
            totalUpvotes: question.upvotes.length,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};