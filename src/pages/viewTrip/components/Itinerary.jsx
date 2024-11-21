/* eslint-disable react/prop-types */
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import TimeToTravel from "@/images/TimeToTravel.jpg";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";

function Itinerary({ trip }) {
    const { darkMode } = useContext(ThemeContext); // Access theme context

    const itinerary = trip?.tripData?.itinerary;

    if (!itinerary) {
        return (
            <div
                className={`overflow-y-hidden sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 pt-10 ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                    }`}
            >
                <h2 className="font-bold text-3xl mb-6">Places to Visit</h2>
                <p className="text-lg">No itinerary available for this trip.</p>
            </div>
        );
    }

    return (
        <div
            className={`overflow-y-hidden pt-10 ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                }`}
        >
            <h2 className="font-bold text-3xl mb-6">Places to Visit</h2>
            <div className="space-y-6">
                {Object.keys(itinerary).map((dayKey, index) => {
                    const day = itinerary[dayKey];
                    return (
                        <div
                            key={index}
                            className={`${darkMode
                                    ? "bg-[#1a1a30] text-white border-[#6200ea]"
                                    : "bg-white text-gray-800 border-[#6200ea]"
                                } w-full p-6 rounded-lg shadow-lg `}
                        >
                            <h2 className="text-2xl font-semibold mb-2 pb-2">{`Day ${index + 1}`}</h2>
                            <Carousel>
                                <CarouselContent className="-mx-4">
                                    {day.plan.map((item, idx) => (
                                        <CarouselItem
                                            key={idx}
                                            className={`pl-4 w-[30vw] ${darkMode
                                                    ? "bg-[#282840] text-white hover:bg-[#713ae1] hover:text-[#ffff]"
                                                    : "bg-[#d6d4d4] text-[#000] hover:bg-[#928d9c]"
                                                } rounded-lg p-6 ml-4 shadow-md hover:shadow-lg transition-all lg:basis-1/2 xl:basis-1/2 flex flex-col items-start justify-center `}
                                        >
                                            <img
                                                src={TimeToTravel}
                                                alt="Travel"
                                                className="w-[100vw] h-[30vh] object-cover rounded-lg mb-4"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-xl mb-2">{item.placeName}</h3>
                                                <p className="text-sm mb-1">{item.placeDetails}</p>
                                                <p className="text-sm"><span className="font-bold text-md">Best Time To Visit: </span>{item.bestTimetoVisit}</p>
                                                <p className="text-sm"><span className="font-bold text-md">Tickets: </span>{item.ticketPricing}</p>
                                                <p className="text-sm"><span className="font-bold text-md">Travel Time: </span>{item.travelTime}</p>
                                                <Button className='mt-5'>
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.placeName)},${encodeURIComponent(item.placeAddress)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer" // Adds security by preventing the new tab from accessing the original window's context
                                                    >
                                                        <FaMapLocationDot />
                                                    </a>
                                                </Button>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious
                                    className={`absolute left-1 top-1/2 transform -translate-y-1/2 ${darkMode
                                            ? "text-white bg-[#282840] hover:bg-[#d6d6db]"
                                            : "text-gray-800 bg-gray-200 hover:bg-[#373737] hover:text-[#ffff]"
                                        } p-2 rounded-full transition-all`}
                                >
                                    &#8249;
                                </CarouselPrevious>
                                <CarouselNext
                                    className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${darkMode
                                            ? "text-white bg-[#282840] hover:bg-[#d6d6db]"
                                            : "text-gray-800 bg-gray-200 hover:bg-[#373737] hover:text-[#ffff]"
                                        } p-2 rounded-full transition-all`}
                                >
                                    &#8250;
                                </CarouselNext>
                            </Carousel>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Itinerary;
