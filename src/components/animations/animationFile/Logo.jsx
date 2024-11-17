import animationData from "@/components/animations/json/logo.json";
import ThemeContext from "@/context/ThemeContext";
import lottie from "lottie-web";
import { useContext, useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
function Logo({ msg }) { // Accept the msg prop
    const logo = useRef(null);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: logo.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData, // Use the imported animation data
        });

        // Cleanup function
        return () => {
            animation.stop();
            animation.destroy();
        };
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div 
                ref={logo} 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 xl:w-26 xl:h-26 mr-2" 
            />
            <span 
                className={`tracking-tight xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl font-extrabold 
                    ${darkMode ? "text-[#FFFFFF]" : "text-[#000]"}
                `}
            >
                {msg}
            </span>
        </div>
    );
};

export default Logo;
