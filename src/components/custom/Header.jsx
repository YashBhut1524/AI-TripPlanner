import Logo from "@/components/animations/animationFile/Logo.jsx";
import { Button } from "../ui/button";
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import ThemeIcon from "./ThemeIcon";

function Header() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div
            className={`shadow-md flex items-center justify-between px-6 py-3 
                ${darkMode ? "bg-[#0d0d1a] shadow-[#23213c] text-gray-300" : "bg-[#f9f9f9] shadow-[#dcdcdc] text-gray-800"}
            `}
            >
            {/* Logo Section */}
            <Logo msg={"TripVerse"} />

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <ThemeIcon />
                <Button
                className={`rounded-md px-4 py-2 font-medium bg-[#5e17eb] text-white hover:bg-[#7735f7]`}
                >
                Sign In
                </Button>
            </div>
        </div>
    );
}

export default Header;
