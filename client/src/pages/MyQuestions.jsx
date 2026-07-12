import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import QuestionCard from "../components/question/QuestionCard";

import {
    getMyQuestions,
    deleteQuestion,
} from "../services/questionService";

function MyQuestions() {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const data = await getMyQuestions();

            setQuestions(data.questions);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load questions"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmDelete) return;

        try {
            await deleteQuestion(id);

            toast.success("Question deleted successfully");

            setQuestions((prev) =>
                prev.filter((question) => question._id !== id)
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to delete question"
            );
        }
    };

    const handleEdit = (question) => {
        navigate(`/edit-question/${question._id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
                    My Questions
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage the questions you've shared with the community.
                </p>

            </div>

            {questions.length === 0 ? (

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-12 text-center">

                    <h2 className="text-2xl font-semibold text-gray-800">
                        No Questions Yet
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Start contributing by asking your first question.
                    </p>

                    <button
                        onClick={() => navigate("/ask")}
                        className="mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-black transition-all duration-300"
                    >
                        Ask Your First Question
                    </button>

                </div>

            ) : (

                <div className="space-y-5">

                    {questions.map((question) => (
                        <QuestionCard
                            key={question._id}
                            question={question}
                            showActions
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>

            )}

        </div>
    );
}

export default MyQuestions;