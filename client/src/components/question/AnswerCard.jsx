import { FaCheckCircle, FaRegClock, FaUserCircle } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";

function AnswerCard({ answer }) {
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
            hover:-translate-y-0.5
            transition-all
            duration-300
        "
        >
            {answer.isAccepted && (
                <div
                    className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-green-50
                    text-green-700
                    text-sm
                    font-semibold
                    mb-5
                "
                >
                    <FaCheckCircle />

                    Accepted Answer
                </div>
            )}

            <p
                className="
                text-gray-700
                leading-8
                whitespace-pre-wrap
            "
            >
                {answer.answer}
            </p>

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
                gap-3
            "
            >
                <div
                    className="
                    flex
                    items-center
                    gap-2
                "
                >
                    <FaUserCircle
                        className="
                        text-2xl
                        text-gray-500
                    "
                    />

                    <span
                        className="
                        font-medium
                        text-gray-700
                    "
                    >
                        {answer.userId?.name}
                    </span>
                </div>

                <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-500
                "
                >
                    <FaRegClock />

                    {formatDate(answer.createdAt)}
                </div>
            </div>
        </div>
    );
}

export default AnswerCard;