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
            className={`rounded-lg border-1 p-2 absolute right-8 xl:right-32 shadow-lg ${
                darkMode
                ? "shadow-gray-800 bg-slate-700 border-neutral-900"
                : "bg-[#2b2a3d] border-[#fff] shadow-[#838282]"
            }`}
            onClick={toggleDarkMode}
        >
            {darkMode ? (
                <MoonIcon className="stroke-yellow-500 fill-yellow-500 h-6 w-6 cursor-pointer stroke-1" />
            ) : (
                <SunIcon className="h-6 w-6 cursor-pointer stroke-1 fill-yellow-500" />
            )}
        </button>
    );
}

export default ThemeIcon;
