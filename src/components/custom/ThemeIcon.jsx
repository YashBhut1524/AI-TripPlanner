import ThemeContext from "@/context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";

function ThemeIcon() {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button
            className={`relative flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out
                ${darkMode
                    ? "bg-slate-700 border-neutral-900 shadow-gray-800"
                    : "bg-[#2b2a3d] border-[#fff] shadow-[#838282]"
                }
                md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 w-10 h-10
            `}
            onClick={toggleDarkMode}
        >
            {darkMode ? (
                <MoonIcon className="stroke-yellow-500 fill-yellow-500 w-5 h-5 cursor-pointer" />
            ) : (
                <SunIcon className="stroke-yellow-500 fill-yellow-500 w-5 h-5 cursor-pointer" />
            )}
        </button>
    );
}

export default ThemeIcon;
