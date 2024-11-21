/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import ThemeContext from "@/context/ThemeContext"
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useContext, useEffect, useState } from "react"
import { IoShareSocialSharp } from "react-icons/io5";

function InfoSection({ trip }) {

    const { darkMode } = useContext(ThemeContext)
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        trip && getPlacePhoto()
    }, [trip])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userPreferences?.location?.label, // Correctly pass the location
        };

        try {
            const result = await GetPlaceDetails(data);
            let photoURL = null;

            // Loop to find a valid photo URL, starting from index 1, up to index 9
            for (let i = 1; i <= 9; i++) {
                const photo = result?.places[0]?.photos[i];
                if (photo) {
                    photoURL = PHOTO_REF_URL.replace("{NAME}", photo.name);
                    break;
                }
            }

            // If a valid photo is found, set it, else fall back to a default image
            setPhoto(photoURL || "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png");
        } catch (error) {
            console.error("Error fetching place details: ", error);
            setPhoto("https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png"); // Default image in case of an error
        }
    };

    return (
        <div>
            {/* Image with responsive and perfect fit */}
            <img
                src={photo}
                alt="Time To Travel"
                className={`w-full pt-2 max-h-[55vh] object-cover rounded-xl shadow-md ${darkMode ? "shadow-white" : "shadow-black"}`}
            />
            <div className="flex justify-between items-center">
                <div className={`my-5 flex flex-col gap-2`}>
                    <h2 className={`text-2xl font-bold`}>{trip?.userPreferences?.location?.label}</h2>
                    <div className="pt-3 flex flex-wrap gap-2">
                        <p className={`p-1 px-3 rounded-full text-sm md:text-base ${darkMode ? "bg-[#353548] text-white" : "bg-[#000000] text-white"}`}>
                            📆 {trip?.userPreferences?.numOfDays} Day
                        </p>
                        <p className={`p-1 px-3 rounded-full text-sm md:text-base ${darkMode ? "bg-[#353548] text-white" : "bg-[#000000] text-white"}`}>
                            💰 {trip?.userPreferences?.budget} budget
                        </p>
                        {trip?.userPreferences?.traveler === "Just Me"
                            ? <p className={`p-1 px-3 rounded-full text-sm md:text-base ${darkMode ? "bg-[#353548] text-white" : "bg-[#000000] text-white"}`} >
                                🧍Travelling Solo
                            </p>
                            : <p className={`p-1 px-3 rounded-full text-sm md:text-base ${darkMode ? "bg-[#353548] text-white" : "bg-[#000000] text-white"}`} >
                                🥂 Travelling as {trip?.userPreferences?.traveler}
                            </p>
                        }
                    </div>
                </div>
                <Button
                    className={`flex items-center justify-center p-2 text-sm md:p-3 md:text-base lg:p-4 lg:text-lg rounded-full transition-transform transform hover:scale-105 ${darkMode ? "bg-[#353548] text-white" : "bg-[#000000] text-white"}`}
                >
                    <IoShareSocialSharp className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </Button>
            </div>
        </div>
    )
}

export default InfoSection
