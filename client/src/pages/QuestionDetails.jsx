import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getQuestionById, toggleUpvote } from "../services/questionService";
import { addAnswer } from "../services/answerService";

import AnswerCard from "../components/question/AnswerCard";
import AnswerForm from "../components/question/AnswerForm";

function QuestionDetails() {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);

      const data = await getQuestionById(id);

      setQuestion(data.question);
      setAnswers(data.answers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnswer = async (answer) => {
    try {
      await addAnswer(id, answer);

      toast.success("Answer posted successfully");

      await fetchQuestion();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post answer");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (!question) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        Question not found.
      </div>
    );
  }

  const handleUpvote = async () => {
    try {
      await toggleUpvote(question._id);

      fetchQuestion();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update upvote");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

        <Link
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-blue-600 transition mb-8"
        >
            ← Back to Discussions
        </Link>

        {/* Question */}

        <div
            className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-8
            shadow-sm
        "
        >

            <div className="flex justify-between items-start gap-6">

                <h1
                    className="
                    text-4xl
                    font-black
                    text-gray-900
                    leading-tight
                "
                >
                    {question.title}
                </h1>

                <button
                    onClick={handleUpvote}
                    className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-gray-200
                    hover:bg-gray-100
                    transition-all
                "
                >
                    👍

                    <span className="font-semibold">
                        {question.upvotes.length}
                    </span>
                </button>

            </div>

            {/* Meta */}

            <div
                className="
                mt-6
                flex
                flex-wrap
                gap-6
                text-sm
                text-gray-500
            "
            >

                <span>
                    👤 {question.userId?.name}
                </span>

                <span>
                    👁 {question.views} Views
                </span>

            </div>

            <div className="my-8 border-t border-gray-100"></div>

            {/* Question Body */}

            <p
                className="
                text-gray-700
                text-lg
                leading-9
                whitespace-pre-wrap
            "
            >
                {question.question}
            </p>

        </div>

        {/* Answers */}

        <div className="mt-10">

            <div className="flex items-center justify-between mb-6">

                <h2
                    className="
                    text-3xl
                    font-bold
                    text-gray-900
                "
                >
                    Answers
                </h2>

                <span
                    className="
                    px-4
                    py-2
                    rounded-full
                    bg-gray-100
                    text-gray-700
                    font-medium
                "
                >
                    {answers.length}
                </span>

            </div>

            {answers.length === 0 ? (

                <div
                    className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    p-12
                    text-center
                    shadow-sm
                "
                >

                    <h3
                        className="
                        text-2xl
                        font-semibold
                        text-gray-800
                    "
                    >
                        No Answers Yet
                    </h3>

                    <p className="mt-3 text-gray-500">
                        Be the first person to answer this discussion.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {answers.map((answer) => (

                        <AnswerCard
                            key={answer._id}
                            answer={answer}
                        />

                    ))}

                </div>

            )}

        </div>

        {/* Answer Form */}

        <div className="mt-10">

            <AnswerForm
                onSubmit={handleAddAnswer}
            />

        </div>

    </div>
);
}

export default QuestionDetails;
