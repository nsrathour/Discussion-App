import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, isAuthenticated, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/login");
    };

    const navLink = (path) =>
        `relative px-1 py-2 text-[15px] font-medium transition-colors duration-300
        ${
            location.pathname === path
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
        }
        after:absolute
        after:left-0
        after:bottom-0
        after:h-[2px]
        after:rounded-full
        after:bg-blue-500
        after:transition-all
        after:duration-500
        after:ease-out
        after:content-['']
        ${
            location.pathname === path
                ? "after:w-full"
                : "after:w-0 hover:after:w-full"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                >
                    <span className="text-gray-800">Discuss</span>
                    <span className="text-blue-600">It</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">

                    <Link to="/" className={navLink("/")}>
                        Home
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link
                                to="/ask"
                                className={navLink("/ask")}
                            >
                                Ask Question
                            </Link>

                            <Link
                                to="/my-questions"
                                className={navLink("/my-questions")}
                            >
                                My Questions
                            </Link>

                            <Link
                                to="/profile"
                                className={navLink("/profile")}
                            >
                                Profile
                            </Link>
                        </>
                    )}

                </div>

                {/* Desktop Right Side */}
                <div className="hidden md:flex items-center gap-3">

                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">

                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>

                                <span className="text-gray-700 font-medium">
                                    {user?.name}
                                </span>

                            </div>

                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 rounded-xl bg-gray-800 text-white hover:bg-black transition-all duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-2xl text-gray-700"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-gray-50">

                    <div className="flex flex-col p-5 space-y-4">

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Home
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/ask"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    Ask Question
                                </Link>

                                <Link
                                    to="/my-questions"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    My Questions
                                </Link>

                                <Link
                                    to="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    Profile
                                </Link>

                                <div className="flex items-center gap-3 py-2">

                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <span className="font-medium text-gray-700">
                                        {user?.name}
                                    </span>

                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-xl bg-gray-800 text-white"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-2 rounded-xl border border-gray-300 text-center"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-center"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                    </div>

                </div>
            )}
        </nav>
    );
}

export default Navbar;