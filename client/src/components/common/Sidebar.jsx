import { Link } from "react-router-dom";

function Sidebar() {
    const topics = [
        "React",
        "Node.js",
        "MongoDB",
        "JavaScript",
    ];

    return (
        <aside className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-fit">

            <Link
                to="/ask"
                className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-black transition-all duration-300"
            >
                + Ask Question
            </Link>

            <div className="mt-8">

                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Trending Topics
                </h3>

                <div className="flex flex-wrap gap-3">

                    {topics.map((topic) => (
                        <span
                            key={topic}
                            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
                        >
                            #{topic}
                        </span>
                    ))}

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;