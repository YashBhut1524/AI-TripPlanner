import Logo from "@/components/animations/animationFile/Logo.jsx";
import { Button } from "../ui/button";
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import ThemeIcon from "./ThemeIcon";
import toast from "react-hot-toast";

function Header() {
    const { darkMode } = useContext(ThemeContext);
    const { user, logoutUser } = useContext(AuthContext);

    // Logout Function
    const logout = () => {
        logoutUser();
        toast.success("Successfully logged out!");
    };

    return (
        <div
            className={`top-0 left-0 w-full shadow-md flex items-center justify-between px-6 py-4 border-b-2
                ${darkMode ? "bg-[#0d0d1a] border-[#23213c] text-gray-300" : "bg-[#f9f9f9] border-[#dcdcdc] text-gray-800"}`}
        >
            <div className="flex justify-center">
                <Logo msg={"TripVerse"} />
            </div>

            <div className="flex items-center gap-6">
                <ThemeIcon />
                {user ? (
                    <Button
                        onClick={logout}
                        className="rounded-md font-medium bg-[#5e17eb] text-white hover:bg-[#7735f7]"
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        onClick={() => toast.info("Please sign in to access more features.")}
                        className="rounded-md font-medium bg-[#5e17eb] text-white hover:bg-[#7735f7]"
                    >
                        Sign In
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;
