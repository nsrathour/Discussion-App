import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        answer: {
            type: String,
            required: true,
            trim: true,
        },

        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isAccepted: {
    type: Boolean,
    default: false,
},
    },
    {
        timestamps: true,
    }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;