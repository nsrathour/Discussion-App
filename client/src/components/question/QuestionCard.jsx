import { Link } from "react-router-dom";
import {
    FaArrowUp,
    FaEye,
    FaUserCircle,
    FaRegClock,
} from "react-icons/fa";

import { formatDate } from "../../utils/formatDate";

function QuestionCard({
    question,
    showActions = false,
    onEdit,
    onDelete,
    onUpvote,
}) {
    return (
        <div
            className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-6
            shadow-sm
            hover:shadow-md
            hover:-translate-y-1
            transition-all
            duration-300
        "
        >
            <Link to={`/question/${question._id}`}>

                {/* Title */}

                <div className="flex justify-between items-start gap-4">

                    <h2
                        className="
                        text-2xl
                        font-bold
                        text-gray-900
                        hover:text-blue-600
                        transition-colors
                    "
                    >
                        {question.title}
                    </h2>

                    <button
                        onClick={(e) => {
                            e.preventDefault();

                            onUpvote?.(question._id);
                        }}
                        className="
                        flex
                        items-center
                        gap-2
                        text-gray-500
                        hover:text-blue-600
                        transition
                    "
                    >
                        <FaArrowUp />

                        <span className="font-medium">
                            {question.upvotes.length}
                        </span>
                    </button>

                </div>

                {/* Body */}

                <p
                    className="
                    mt-4
                    text-gray-600
                    leading-7
                    line-clamp-2
                "
                >
                    {question.question}
                </p>

                {/* Footer */}

                <div
                    className="
                    mt-6
                    pt-5
                    border-t
                    border-gray-100
                    flex
                    justify-between
                    items-center
                    flex-wrap
                    gap-4
                "
                >
                    <div
                        className="
                        flex
                        items-center
                        gap-2
                        text-gray-700
                    "
                    >
                        <FaUserCircle className="text-xl" />

                        <span className="font-medium">
                            {question.userId?.name}
                        </span>
                    </div>

                    <div
                        className="
                        flex
                        items-center
                        gap-5
                        text-sm
                        text-gray-500
                    "
                    >
                        <span className="flex items-center gap-1">
                            <FaEye />

                            {question.views}
                        </span>

                        <span className="flex items-center gap-1">
                            <FaRegClock />

                            {formatDate(question.createdAt)}
                        </span>
                    </div>

                </div>

            </Link>

            {showActions && (

                <div
                    className="
                    mt-6
                    pt-5
                    border-t
                    border-gray-100
                    flex
                    justify-end
                    gap-3
                "
                >
                    <button
                        onClick={() => onEdit(question)}
                        className="
                        px-5
                        py-2
                        rounded-xl
                        bg-gray-800
                        text-white
                        hover:bg-black
                        transition
                    "
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(question._id)}
                        className="
                        px-5
                        py-2
                        rounded-xl
                        border
                        border-red-300
                        text-red-600
                        hover:bg-red-50
                        transition
                    "
                    >
                        Delete
                    </button>

                </div>

            )}
        </div>
    );
}

export default QuestionCard;