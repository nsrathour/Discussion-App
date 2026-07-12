import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

function AnswerForm({ onSubmit }) {
    const { isAuthenticated } = useAuth();

    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!answer.trim()) {
            return toast.error("Answer cannot be empty");
        }

        if (answer.trim().length < 10) {
            return toast.error(
                "Answer should be at least 10 characters"
            );
        }

        try {
            setLoading(true);

            await onSubmit(answer);

            setAnswer("");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500">
                Please login to write an answer.
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
            <h2 className="text-xl font-semibold mb-4">
                Write Your Answer
            </h2>

            <textarea
                rows="6"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your answer here..."
                className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
                {loading ? "Submitting..." : "Submit Answer"}
            </button>
        </form>
    );
}

export default AnswerForm;