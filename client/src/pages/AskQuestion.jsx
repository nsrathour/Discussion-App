import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createQuestion } from "../services/questionService";

function AskQuestion() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        question: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, question } = formData;

        if (!title.trim() || !question.trim()) {
            return toast.error("Title and Question are required");
        }

        if (title.trim().length < 10) {
            return toast.error("Title should be at least 10 characters");
        }

        if (question.trim().length < 20) {
            return toast.error("Question should be at least 20 characters");
        }

        try {
            setLoading(true);

            await createQuestion({
                title,
                question,
            });

            toast.success("Question posted successfully");

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to post question"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

                <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
                    Ask a Question
                </h1>

                <p className="mt-2 text-gray-500">
                    Share your question with the community and get helpful answers.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >

                    {/* Title */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Question Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. How do I implement JWT authentication in MERN?"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Question */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Describe Your Question
                        </label>

                        <textarea
                            rows="10"
                            name="question"
                            placeholder="Explain your problem in detail..."
                            value={formData.question}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex flex-col sm:flex-row justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-black transition-all duration-300 disabled:opacity-60"
                        >
                            {loading ? "Posting..." : "Post Question"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AskQuestion;