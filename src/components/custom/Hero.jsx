import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";

function Hero() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div
            className={`flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center px-4 ${
                darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
            }`}
        >
            <div className={`text-[50px] font-extrabold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                <span>
                    Travel beyond limits with{" "}
                    <span className={`${darkMode ? "text-[#6200ea]" : "text-[#6200ea]"}`}>
                        AI
                    </span>{" "}
                    at your side
                </span>
            </div>
            <div className={`text-[40px] font-semibold mt-3 ${darkMode ? "text-[#ffff]" : "text-[#333333]"}`}>
                Experience journeys crafted just for you, effortlessly.
            </div>
            <div className={`text-[20px] mt-4 max-w-4xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Discover hidden gems, plan effortlessly, and enjoy trips tailored just for you.
            </div>
            <div>
                <Link to={"/create-trip"}>
                    <button
                        className={`px-8 py-4 mt-10 font-bold rounded-lg shadow-lg transition text-lg bg-[#6200ea] text-white hover:bg-[#4500a5]`}
                    >
                        Start Your Adventure
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;
