import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";

function CreateTrip() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <>
            CreateTrip
        </>
    );
}

export default CreateTrip;
