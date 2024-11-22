/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import TimeToTravel from "@/images/TimeToTravel.jpg";

function Activity({ activity, trip }) {
    const [photo, setPhoto] = useState(""); // State to store photo URL

    useEffect(() => {
        if (activity) {
            getPlacePhoto();
        }
    }, [activity]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: `${activity?.placeName},${activity?.placeAddress}`,
        };

        try {
            const result = await GetPlaceDetails(data);
            const photo = result?.places[0]?.photos?.[Math.floor(Math.random() * 10)]; // Get the first photo
            const photoURL = photo ? PHOTO_REF_URL.replace("{NAME}", photo.name) : TimeToTravel; // Fallback to TimeToTravel if no photo found
            setPhoto(photoURL);
        } catch (error) {
            // console.error("Error fetching place details: ", error);
            setPhoto(TimeToTravel); // Fallback to TimeToTravel on error
        }
    };

    return (
        <>
            <img
                src={photo}
                alt="Travel"
                className="w-[100vw] h-[30vh] object-cover rounded-lg mb-4"
            />
            <div>
                <h3 className="font-semibold text-xl mb-2">{activity.placeName}</h3>
                <p className="text-sm mb-1">{activity.placeDetails}</p>
                <p className="text-sm">
                    <span className="font-bold text-md">Best Time To Visit: </span>
                    {activity.bestTimetoVisit}
                </p>
                <p className="text-sm">
                    <span className="font-bold text-md">Tickets: </span>
                    {activity.ticketPricing}
                </p>
                <p className="text-sm">
                    <span className="font-bold text-md">Travel Time: </span>
                    {activity.travelTime}
                </p>
                <Button className="mt-5">
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.placeName)},${encodeURIComponent(
                            trip?.userPreferences?.location?.label
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaMapLocationDot />
                    </a>
                </Button>
            </div>
        </>
    );
}

export default Activity;
