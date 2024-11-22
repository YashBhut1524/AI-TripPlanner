/* eslint-disable react/prop-types */
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState, useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/FireBaseConfig";

function TripCardItem({ trip }) {
    const { darkMode } = useContext(ThemeContext);
    const [photo, setPhoto] = useState("");

    const handleDeleteTrip = async () => {
        try {
            const tripRef = doc(db, "Ai-Trips", trip.id); // Reference to the trip document by ID

            // Delete the trip document
            await deleteDoc(tripRef);
            console.log("Trip deleted successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting trip: ", error);
        }
    };

    useEffect(() => {
        if (trip) {
            getPlacePhoto();
        }
    }, [trip]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userPreferences?.location?.label,
        };

        try {
            const result = await GetPlaceDetails(data);
            const photo = result?.places[0]?.photos[5]; // Use the 5th photo if available
            const photoURL = photo
                ? PHOTO_REF_URL.replace("{NAME}", photo.name)
                : "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png";
            setPhoto(photoURL);
        } catch (error) {
            console.error("Error fetching place details: ", error);
            setPhoto("https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png"); // Default fallback image
        }
    };

    return (
        <div
            className={`relative p-4 rounded-xl border ${darkMode
                ? "bg-[#1a1a2e] border-[#5e17eb] hover:border-[#7735f7] hover:shadow-[0_4px_20px_rgba(94,23,235,0.6)] text-white"
                : "bg-white border-gray-300 hover:border-[#6200ea] hover:shadow-[0_4px_15px_rgba(98,0,234,0.2)] text-gray-900"
                } transition-all duration-300`}
        >
            <Link to={`/view-trip/${trip.id}`}>
                <div

                >
                    {/* Image Section */}
                    <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                            src={photo}
                            alt="Trip Location"
                            className="w-full h-40 object-cover rounded-xl transform transition-transform duration-300 hover:scale-105"
                        />
                        <div
                            className={`absolute inset-0 bg-gradient-to-t ${darkMode
                                ? "from-[#0d0d1a] to-transparent opacity-70"
                                : "from-[#f8f9fa] to-transparent opacity-40"
                                } rounded-xl`}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold mb-2 truncate">
                            {trip?.userPreferences?.location?.label || "Unknown Location"}
                        </h3>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-3`}>
                            {trip?.userPreferences?.numOfDays || 0} Days Trip - Budget:{" "}
                            {trip?.userPreferences?.budget || "N/A"}
                        </p>
                        <p className="text-sm font-medium">
                            Traveling as{" "}
                            <span
                                className={`font-semibold ${darkMode ? "text-[#5e17eb]" : "text-[#6200ea]"}`}
                            >
                                {trip?.userPreferences?.traveler || "Solo"}
                            </span>
                        </p>
                    </div>

                    {/* Hover Overlay */}

                    <div
                        className={`absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100 bg-gradient-to-r ${darkMode
                            ? "from-[#5e17eb]/20 via-transparent to-[#7735f7]/20"
                            : "from-[#6200ea]/10 via-transparent to-[#4500a5]/10"
                            } transition-opacity duration-300`}
                    />
                </div>
            </Link>
            <Button
                onClick={handleDeleteTrip}
                className={`w-full py-2 px-4 mt-4 rounded-lg font-semibold transition-all duration-300 ${darkMode
                    ? "bg-[#5e17eb] text-white hover:bg-[#7735f7] border-[#5e17eb] hover:border-[#7735f7]"
                    : "bg-[#6200ea] text-white hover:bg-[#4500a5] border-[#6200ea] hover:border-[#4500a5]"
                    }`}
            >
                DELETE
            </Button>

        </div>

    );
}

export default TripCardItem;
