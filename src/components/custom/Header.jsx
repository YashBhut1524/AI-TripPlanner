import Logo from "@/components/animations/animationFile/Logo.jsx";
import { Button } from "../ui/button";
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import ThemeIcon from "./ThemeIcon";

function Header() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div
            className={`top-0 left-0 w-full shadow-md flex items-center justify-between sm:flex-row md:flex-row px-6 py-0 border-b-2
                ${darkMode ? "bg-[#0d0d1a] border-[#23213c] text-gray-300" : "bg-[#f9f9f9] border-[#dcdcdc] text-gray-800"}
                sm:px-4 md:px-6 lg:px-8
            `}
        >
            {/* Logo Section */}
            <div className="flex justify-center sm:w-full lg:w-auto">
                <Logo msg={"TripVerse"} />
            </div>

            {/* Right Section */}
            <div className="flex items-center sm:justify-end md:justify-end lg:justify-center xl:justify-center sm:w-full lg:w-auto sm:flex-row md:flex-row sm:gap-6 lg:gap-5">
                <Button
                    className={`rounded-md font-medium bg-[#5e17eb] text-white hover:bg-[#7735f7] 
                    sm:px-3 sm:py-2 sm:text-sm md:px-3 md:py-2 md:text-base lg:px-5 lg:py-3 lg:text-lg`}
                >
                    Sign In
                </Button>
                <ThemeIcon />
            </div>
        </div>
    );
}

export default Header;
