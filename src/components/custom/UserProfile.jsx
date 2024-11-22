import { useUserProfile } from "@/context/UserProfileContext";
import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
import AuthContext from "@/context/AuthContext";
import toast from "react-hot-toast";

const UserProfile = () => {
    const { showUserProfile, setShowUserProfile } = useUserProfile();
    const { darkMode } = useContext(ThemeContext);
    const { user, logoutUser } = useContext(AuthContext);

    if (!showUserProfile) return null;

    const logout = () => {
        logoutUser();
        setShowUserProfile(false);
        toast.success("Successfully logged out!");
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background Blur */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setShowUserProfile(false)}
            ></div>

            {/* User Profile Card */}
            <div
                className={`relative p-8 rounded-lg shadow-lg z-50 w-full max-w-md
            ${darkMode ? "bg-[#1e1e2e] text-gray-100" : "bg-gray-100 text-gray-900"}
        `}
            >
                {/* Close Button */}
                <button
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
                    onClick={() => setShowUserProfile(false)}
                >
                    ✕
                </button>

                {/* User Details */}
                <div className="flex flex-col items-center text-center">
                    <img
                        src={user.picture}
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full shadow-md mb-4"
                    />
                    <h2 className={`text-2xl font-bold`}>
                        {user.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-400 italic">
                        {user.verified_email ? "Verified User" : "Unverified User"}
                    </p>
                </div>

                {/* Email */}
                <div className="mt-6 text-center">
                    <p className=" text-lg">
                        <span className="font-bold">Email:</span>{" "}
                        <span className="text-sm font-semibold">{user.email}</span>
                    </p>
                </div>

                {/* Logout Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={logout}
                        className={`rounded-md font-semibold py-2 px-6 transition-colors ${darkMode ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-purple-500 hover:bg-purple-600 text-white"}
                        `}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
