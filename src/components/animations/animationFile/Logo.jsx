import animationData from "@/components/animations/json/logo.json";
import ThemeContext from "@/context/ThemeContext";
import lottie from "lottie-web";
import { useContext, useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
function Logo({ msg }) { // Accept the msg prop
    const logo = useRef(null);
    const {darkMode} = useContext(ThemeContext)

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
            <div ref={logo} style={{ width: '70px', height: '70px', marginRight: '0px' }} />
            <span 
                className={`tracking-tight text-4xl font-extrabold 
                    ${darkMode 
                        ? "text-[#FFFFFF]" 
                        : "text-[#000]"
                    }`}
            >
                {msg}
            </span>
        </div>
    );
};

export default Logo;
