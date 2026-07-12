import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SearchBar from "../components/common/SearchBar";
import Sidebar from "../components/common/Sidebar";
import QuestionCard from "../components/question/QuestionCard";

import {
    getAllQuestions,
    toggleUpvote,
    searchQuestions,
} from "../services/questionService";

function Home() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            setLoading(true);

            const data = await getAllQuestions();

            setQuestions(data.questions);
        } catch (error) {
            console.error("Failed to fetch questions:", error);

            toast.error("Failed to load questions");
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async (id) => {
        try {
            await toggleUpvote(id);

            fetchQuestions();

            toast.success("Upvote updated");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to update upvote"
            );
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);

        try {
            if (!query.trim()) {
                fetchQuestions();
                return;
            }

            const data = await searchQuestions(query);

            setQuestions(data.questions);
        } catch (error) {
            console.error(error);

            toast.error("Search failed");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Heading */}
            <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
                    Community Discussions
                </h1>

                <p className="mt-2 text-gray-500 text-sm sm:text-base">
                    Ask questions, share knowledge and help others.
                </p>

            </div>

            {/* Search */}
            <SearchBar onSearch={handleSearch} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Questions */}
                <div className="lg:col-span-2 space-y-5">

                    {loading ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm">

                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                            <p className="text-gray-500">
                                Loading discussions...
                            </p>

                        </div>
                    ) : questions.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm">

                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                No Questions Found
                            </h2>

                            <p className="mt-3 text-gray-500">
                                Try another search or be the first one to ask.
                            </p>

                        </div>
                    ) : (
                        questions.map((question) => (
                            <QuestionCard
                                key={question._id}
                                question={question}
                                onUpvote={handleUpvote}
                            />
                        ))
                    )}

                </div>

                {/* Sidebar */}
                <Sidebar />

            </div>

        </div>
    );
}

export default Home;