// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelerList } from "@/constans/options.js";
import ThemeContext from "@/context/ThemeContext";
import { useContext, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
    const { darkMode } = useContext(ThemeContext);
    const [place, setPlace] = useState("");

    return (
        <div
            className={`overflow-y-hidden sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 pt-10 ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                }`}
        >
            <h2 className="text-3xl font-bold">Create Your Perfect Journey.🏕️</h2>
            <p className={`mt-4 text-lg ${darkMode ? "text-[#FFFF]" : "text-[#333333]"}`}>
                Share a few details about your ideal trip, and let us craft a personalized itinerary just for you.
            </p>
            <div className="pt-10 flex flex-col gap-10">
                <div>
                    <h2 className="font-bold pb-3 text-lg">What is the destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_KEY}
                        selectProps={{
                            place,
                            onChange: (value) => {
                                setPlace(value),
                                    console.log(value);
                            },
                            styles: {
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: darkMode ? "#353548" : "#fff",
                                    color: darkMode ? "#fff" : "#000",
                                    borderColor: darkMode ? "#555" : "#ccc",
                                }),
                                input: (baseStyles) => ({
                                    ...baseStyles,
                                    color: darkMode ? "#fff" : "#000", // Text color for user input
                                }),
                                singleValue: (baseStyles) => ({
                                    ...baseStyles,
                                    color: darkMode ? "#fff" : "#000",
                                }),
                                menu: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: darkMode ? "#1e1e2e" : "#fff",
                                    color: darkMode ? "#fff" : "#000",
                                    borderRadius: "4px",
                                    overflow: "hidden",
                                }),
                                option: (baseStyles, { isFocused }) => ({
                                    ...baseStyles,
                                    backgroundColor: isFocused ? (darkMode ? "#333" : "#e6e6e6") : "transparent",
                                    color: darkMode ? "#fff" : "#000",
                                    cursor: "pointer",
                                }),
                            },
                        }}
                    />
                </div>
                <div>
                    <h2 className="font-bold pb-3 text-lg">How Many Days you are planning for trip?</h2>
                    <Input
                        placeholder="Ex. 3"
                        type="number"
                        className={`w-[30%] px-4 py-2 rounded-md border ${darkMode
                            ? "bg-[#353548] text-white border-[#555]"
                            : "bg-white text-black border-[#ccc]"
                            }`}
                    />
                </div>
                <div className="pt-7">
                    <h2 className="font-bold pb-3 text-lg">What is you budget?</h2>
                    <p>The budget is exclusively allocated for activities and dinning purpose</p>
                    <div className="py-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`p-4 border rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer ${darkMode ? "bg-[#1e1e2e] border-gray-700 text-white" : "bg-white border-gray-300 text-black"
                                    }`}
                            >
                                <div className="text-4xl mb-3">{option.icon}</div> {/* Adjust icon size */}
                                <h2 className="text-xl font-bold mb-2">{option.title}</h2>
                                <p className="text-sm">{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-7">
                    <h2 className="font-bold pb-3 text-lg">What is you budget?</h2>
                    <p>The budget is exclusively allocated for activities and dinning purpose</p>
                    <div className="py-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                        {SelectTravelerList.map((option, index) => (
                            <div
                                key={index}
                                className={`p-4 border rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer ${darkMode ? "bg-[#1e1e2e] border-gray-700 text-white" : "bg-white border-gray-300 text-black"
                                    }`}
                            >
                                <div className="text-4xl mb-3">{option.icon}</div> {/* Adjust icon size */}
                                <h2 className="text-xl font-bold mb-2">{option.title}</h2>
                                <p className="text-sm">{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className={`w-[50%] sm:w-[23%] md:w-[43%] lg:w-[20%] px-1 py-3 mt-10 mb-32 font-bold rounded-lg shadow-lg transition text-lg bg-[#6200ea] text-white hover:bg-[#4500a5]`}
                    >
                        Plan My Trip
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;
