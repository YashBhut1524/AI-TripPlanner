import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import toast from "react-hot-toast";
import ThemeContext from "@/context/ThemeContext";
import AuthContext from "@/context/AuthContext"; // Import AuthContext
import { AI_PROMPT, SelectBudgetOptions, SelectTravelerList } from "@/constans/options.js";
import { chatSession } from "@/service/AIModel";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import Logo from "@/components/animations/animationFile/Logo";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/FireBaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
    const { darkMode } = useContext(ThemeContext); // Access theme context
    const { user, loginUser } = useContext(AuthContext); // Access user and loginUser from AuthContext
    const [place, setPlace] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const getUserProfile = async (tokenResponse) => {
        try {
            const response = await axios.get(
                "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                        Accept: "application/json",
                    },
                }
            );
            loginUser(response.data); // Update global user state
            setOpenDialog(false);
            toast.success("Successfully logged in!");
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to fetch user profile.");
        }
    };

    const login = useGoogleLogin({
        onSuccess: getUserProfile,
        onError: (error) => toast.error("Login failed: ", error),
    });

    const SaveAITrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const docId = Date.now().toString(); // Generate a unique document ID
    
        try {
            // Attempt to parse TripData to validate JSON format
            let parsedTripData;
            try {
                parsedTripData = JSON.parse(TripData); // Parse TripData
            } catch (jsonError) {
                console.error("Invalid JSON data from AI:", TripData, jsonError);
                toast.error("Failed to parse AI trip data. Please check the format and try again.");
                setLoading(false);
                return; // Exit function if parsing fails
            }
    
            // Save to Firestore
            await setDoc(doc(db, "Ai-Trips", docId), {
                userPreferences: formData,
                tripData: parsedTripData, // Use parsed JSON data
                userEmail: user?.email,
                id: docId,
            });
    
            toast.success("Trip saved successfully!");
            navigate(`/view-trip/${docId}`)
        } catch (error) {
            console.error("Error saving trip:", error);
            toast.error("Failed to save trip. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePlanMyTrip = async () => {
    let formErrors = {};

    // Validate each field
    if (!formData?.location) formErrors.location = "Destination is required.";
    if (!formData?.numOfDays) formErrors.numOfDays = "Number of days is required.";
    if (formData?.numOfDays > 10) formErrors.numOfDays = "Your trip duration should be 10 days or shorter.";
    if (!formData?.budget) formErrors.budget = "Budget is required.";
    if (!formData?.traveler) formErrors.traveler = "Traveler count is required.";

    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        toast.error("Please fill in all required fields.");
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        return;
    } else {
        setErrors({});
    }

    // Check if user is logged in
    if (!user) {
        setOpenDialog(true);
        return;
    }

    // Prepare AI Prompt
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", formData?.location?.label)
        .replace("{numOfDays}", formData?.numOfDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget);

    try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        // console.log("AI Response:", result?.response?.text());

        // Save trip
        await SaveAITrip(result?.response?.text());

        // Clear the form and reset errors
        setFormData({});
        setPlace(null);
        setErrors({});
        toast.success("Trip planned successfully!");
    } catch (error) {
        console.error("Error communicating with AI:", error);
        toast.error("Failed to generate your trip. Please try again.");
    } finally {
        setLoading(false);
    }
};


    return (
        <>
        <div
        className={`overflow-y-hidden sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 pt-10 ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"}`}
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
                                setPlace(value);
                                handleInputChange("location", value);
                                setErrors((prev) => ({ ...prev, location: "" })); // Clear error on change
                            },
                            styles: {
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: darkMode ? "#353548" : "#fff",
                                    color: darkMode ? "#fff" : "#000",
                                    borderColor: errors.location ? 'red' : (darkMode ? "#555" : "#ccc"), // Apply red border on error
                                }),
                                input: (baseStyles) => ({
                                    ...baseStyles,
                                    color: darkMode ? "#fff" : "#000",
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
                    {errors.location && <p className="text-red-500">{errors.location}</p>}
                </div>
                <div>
                    <h2 className="font-bold pb-3 text-lg">How Many Days you are planning for trip?</h2>
                    <Input
                        min="1"
                        max="2"
                        placeholder="Ex. 3"
                        type="number"
                        className={`w-[30%] px-4 py-2 rounded-md border ${darkMode ? "bg-[#353548] text-white border-[#555]" : "bg-white text-black border-[#ccc]"} ${errors.numOfDays ? "border-red-500" : ""}`}
                        onChange={(e) => {
                            handleInputChange("numOfDays", e.target.value);
                            setErrors((prev) => ({ ...prev, numOfDays: "" }));
                        }}
                    />
                    {errors.numOfDays && <p className="text-red-500">{errors.numOfDays}</p>}
                </div>
                <div className="pt-7">
                    <h2 className="font-bold pb-3 text-lg">What is your budget?</h2>
                    <p>The budget is exclusively allocated for activities and dining purposes</p>
                    <div className="py-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`p-4 border rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer 
                                    ${darkMode ? "bg-[#1e1e2e] border-gray-700 text-white" : " border-gray-300 text-black"}
                                    ${formData?.budget === option.title ? `bg-[#6200ea] scale-[105%] shadow-md text-white ${darkMode ? "border-[#6200ea]" : "border-[#7735F7] bg-[#713ae2]"}` : ""} 
                                    ${errors.budget ? "border-red-500" : ""}`} // Red border on error
                                onClick={() => {
                                    handleInputChange("budget", option.title);
                                    setErrors((prev) => ({ ...prev, budget: "" })); // Clear error on selecting option
                                }}
                            >
                                <div className="text-4xl mb-3">{option.icon}</div>
                                <h2 className="text-xl font-bold mb-2">{option.title}</h2>
                                <p className="text-sm">{option.description}</p>
                            </div>
                        ))}
                    </div>
                    {errors.budget && <p className="text-red-500">{errors.budget}</p>}
                </div>
                <div className="pt-7">
                    <h2 className="font-bold pb-3 text-lg">How many travelers?</h2>
                    <p>Tell us your group size, and we’ll take care of the rest!</p>
                    <div className="py-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 mt-5">
                        {SelectTravelerList.map((option, index) => (
                            <div
                                key={index}
                                className={`p-4 border rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer 
                                    ${darkMode ? "bg-[#1e1e2e] border-gray-700 text-white" : "bg-white border-gray-300 text-black"}
                                    ${formData?.traveler === option.title ? `bg-[#6200ea] scale-[105%] shadow-md text-white ${darkMode ? "border-[#6200ea]" : "border-[#7735F7] bg-[#713ae3]"}` : ""} 
                                    ${errors.traveler ? "border-red-500" : ""}`} // Red border on error
                                onClick={() => {
                                    handleInputChange("traveler", option.title);
                                    setErrors((prev) => ({ ...prev, traveler: "" })); // Clear error on selecting option
                                }}
                            >
                                <h2 className="text-4xl mb-3">{option.icon}</h2>
                                <h2 className="text-xl font-bold mb-2">{option.title}</h2>
                                <p className="text-sm">{option.description}</p>
                            </div>
                        ))}
                    </div>
                    {errors.traveler && <p className="text-red-500">{errors.traveler}</p>}
                </div>
                <div className="flex justify-end">
                    <Button
                        disabled={loading}
                        className={`w-[50%] sm:w-[23%] md:w-[43%] lg:w-[20%] px-1 py-3 mt-10 mb-32 font-bold rounded-lg shadow-lg transition text-lg bg-[#6200ea] text-white hover:bg-[#4500a5]`}
                        onClick={handlePlanMyTrip}
                    >
                        {loading 
                            ? <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin"/>
                            : <>
                                Plan My Trip    
                            </>
                        }
                    </Button>
                </div>
                <Dialog open={openDialog} onOpenChange={(isOpen) => setOpenDialog(isOpen)}>
                    <DialogContent>
                        <DialogHeader>
                            {/* Close Button */}
                            <button
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                onClick={() => setOpenDialog(false)}
                                aria-label="Close"
                            >
                            </button>
                            <DialogDescription>
                                <div className="flex items-center gap-0">
                                    <Logo />
                                    <span
                                        className={`tracking-tight xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl font-extrabold text-[#000]`}
                                    >
                                        TripVerse
                                    </span>
                                </div>
                                <h2 className="font-extrabold text-xl mt-8">Sign In with Google</h2>
                                <p>Sign in to the App with Google Authentication securely</p>
                                <Button
                                    disable={loading}
                                    onClick={login}
                                    className="mt-10 w-full flex items-center gap-2"
                                >
                                    <FcGoogle className="h-7 w-7" />
                                    <span>Sign In With Google</span>
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
        </>
    );
}

export default CreateTrip;
