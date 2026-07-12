import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getQuestionById,
    updateQuestion,
} from "../services/questionService";

function EditQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        question: "",
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchQuestion();
    }, [id]);

    const fetchQuestion = async () => {
        try {
            const data = await getQuestionById(id);

            setFormData({
                title: data.question.title,
                question: data.question.question,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load question"
            );
        } finally {
            setLoading(false);
        }
    };

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
            return toast.error(
                "Title should be at least 10 characters"
            );
        }

        if (question.trim().length < 20) {
            return toast.error(
                "Question should be at least 20 characters"
            );
        }

        try {
            setUpdating(true);

            await updateQuestion(id, {
                title,
                question,
            });

            toast.success("Question updated successfully");

            navigate("/my-questions");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update question"
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-10 text-lg">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white border rounded-xl shadow-md p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Edit Question
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div>
                        <label className="block mb-2 font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Question
                        </label>

                        <textarea
                            rows="8"
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => navigate("/my-questions")}
                            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={updating}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {updating
                                ? "Updating..."
                                : "Update Question"}
                        </button>

                    </div>
                </form>

            </div>
        </div>
    );
}

export default EditQuestion;