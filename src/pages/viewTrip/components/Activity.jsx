/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";

function Activity({ activity, trip }) {

    // console.log("ACTIVITY: ", activity);
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        activity && getPlacePhoto()
    }, [activity])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: `${activity?.placeName},${activity?.placeAddress}`,
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
        <>
            <img
                src={photo}
                alt="Travel"
                className="w-[100vw] h-[30vh] object-cover rounded-lg mb-4"
            />
            <div>
                <h3 className="font-semibold text-xl mb-2">{activity.placeName}</h3>
                <p className="text-sm mb-1">{activity.placeDetails}</p>
                <p className="text-sm"><span className="font-bold text-md">Best Time To Visit: </span>{activity.bestTimetoVisit}</p>
                <p className="text-sm"><span className="font-bold text-md">Tickets: </span>{activity.ticketPricing}</p>
                <p className="text-sm"><span className="font-bold text-md">Travel Time: </span>{activity.travelTime}</p>
                <Button className='mt-5'>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.placeName)},${encodeURIComponent(trip?.userPreferences?.location?.label)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaMapLocationDot />
                    </a>
                </Button>
            </div>
        </>
    )
}

export default Activity