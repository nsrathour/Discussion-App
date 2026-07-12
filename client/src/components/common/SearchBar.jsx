import { useState } from "react";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;

        setQuery(value);

        onSearch(value);
    };

    return (
        <div className="mb-8">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search questions..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default SearchBar;