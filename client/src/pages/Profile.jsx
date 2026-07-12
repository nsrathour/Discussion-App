import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

                <div className="flex flex-col sm:flex-row items-center gap-6">

                    {/* Avatar */}

                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-sm">

                        {user?.name?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <h1 className="text-3xl font-black text-gray-900">
                            {user?.name}
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Welcome to your DiscussIt profile.
                        </p>

                    </div>

                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

                        <p className="text-sm text-gray-500">
                            Name
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-gray-900">
                            {user?.name}
                        </h2>

                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-gray-900 break-all">
                            {user?.email}
                        </h2>

                    </div>

                </div>

                <div className="mt-6">

                    <p className="text-sm text-gray-500 mb-3">
                        Role
                    </p>

                    <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-blue-700 font-medium">
                        {user?.role}
                    </span>

                </div>

                <div className="mt-10">

                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-black transition-all duration-300"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Profile;