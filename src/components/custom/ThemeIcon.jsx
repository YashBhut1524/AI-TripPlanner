import ThemeContext from "@/context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";

function ThemeIcon() {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"} flex justify-end px-10 py-5`}>
            <button
                className={`relative flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out
                    ${darkMode
                        ? "bg-slate-700 border-neutral-900 shadow-gray-800"
                        : "bg-[#2b2a3d] border-[#fff] shadow-[#838282]"
                    }
                `}
                onClick={toggleDarkMode}
            >
                {darkMode ? (
                    <MoonIcon className="w-5 h-5 cursor-pointer" />
                ) : (
                    <SunIcon className="stroke-yellow-500 fill-yellow-500 w-5 h-5 cursor-pointer" />
                )}
            </button>
        </div>
    );
}

export default ThemeIcon;
