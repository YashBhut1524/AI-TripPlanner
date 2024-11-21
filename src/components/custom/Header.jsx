import Logo from "@/components/animations/animationFile/Logo.jsx";
import { Button } from "../ui/button";
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { useUserProfile } from "@/context/UserProfileContext";
import { useGoogleLogin } from "@react-oauth/google"; // Import Google Login
import axios from "axios"; // Import Axios for API requests

function Header() {
    const { darkMode } = useContext(ThemeContext); // Access theme context
    const { user, loginUser } = useContext(AuthContext); // Access user and loginUser from AuthContext
    const { setShowUserProfile } = useUserProfile(); // Manage user profile UI state

    // Google Login Success Handler
    const getUserProfile = async (tokenResponse) => {
        try {
            const response = await axios.get(
                "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                        Accept: "application/json",
                    },
                }
            );
            loginUser(response.data); // Update global user state
            toast.success("Successfully logged in!");
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to fetch user profile.");
        }
    };

    // Initialize Google Login
    const login = useGoogleLogin({
        onSuccess: getUserProfile,
        onError: (error) => toast.error("Login failed: ", error),
    });
    console.log(user?.picture);
    
    return (
        <div
            className={`top-0 left-0 w-full shadow-md flex items-center justify-between sm:gap-5 px-6 py-4 border-b-2
        ${darkMode ? "bg-[#0d0d1a] border-[#23213c] text-gray-300" : "bg-[#f9f9f9] border-[#dcdcdc] text-gray-800"}`}
        >
            <div className="flex justify-center">
                <Logo msg={"TripVerse"} />
            </div>
            <div className="flex items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-3 px-10">
                        {/* Avatar with Profile Button */}
                        <button onClick={() => setShowUserProfile(true)}>
                            <Avatar>
                                <img src={user?.picture} />
                                <AvatarFallback className={`bg-[#5e17eb] text-white`}>
                                    {user?.name[0]}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </div>
                ) : (
                    <Button
                        onClick={login} // Trigger Google Sign-In
                        className="rounded-md font-medium bg-[#5e17eb] text-white hover:bg-[#7735f7] py-2 px-4"
                    >
                        Sign In
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;
