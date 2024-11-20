/* eslint-disable react/prop-types */
import ThemeContext from "@/context/ThemeContext";
import TimeToTravel from "@/images/TimeToTravel.jpg";
import { useContext, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import 'material-icons/iconfont/material-icons.css';
import './style.css';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import map from "@/images/map.png";

function Hotels({ trip }) {
    const { darkMode } = useContext(ThemeContext);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const dialogStyles = darkMode
        ? "bg-[#0d0d1a] text-white border-gray-700"
        : "bg-white text-black border-gray-300";

    return (
        <div className="my-8">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4">Hotel Recommendations</h2>

            {/* Carousel for Hotels */}
            <div className="mt-6">
                <Carousel className="relative overflow-hidden">
                    <CarouselContent className="flex gap-4 -ml-4">
                        {trip?.tripData?.hotels?.map((hotel, index) => (
                            <Dialog key={index}>
                                {/* Wrap CarouselItem with DialogTrigger */}
                                <DialogTrigger asChild>
                                    <CarouselItem
                                        onClick={() => setSelectedHotel(hotel)}
                                        className={`pl-4 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 transition-transform transform hover:scale-105 hover:rounded-xl relative group select-none`}
                                    >
                                        {/* Card Container */}
                                        <div className="relative bg-gradient-to-b from-gray-50 to-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl">
                                            {/* Hotel Image */}
                                            <img
                                                className={`w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-110`}
                                                src={TimeToTravel}
                                                alt={hotel.hotelName}
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pl-10 pb-2">
                                                <p className="text-base text-[#d0ef35] sm:text-xl font-extrabold mb-1">
                                                    {hotel.hotelName}
                                                </p>
                                                <p className="text-white font-bold text-xs sm:text-sm mb-2">
                                                    {hotel.description}
                                                </p>
                                                <p className="text-white font-bold text-xs sm:text-sm flex items-center">
                                                    <span>💸</span>
                                                    {hotel.price.range}
                                                </p>
                                                <p className="text-white font-semibold text-xs sm:text-sm flex items-center">
                                                    <span className="material-icons">star</span>
                                                    {hotel.rating || "N/A"}
                                                </p>
                                                <p className="text-white font-semibold text-xs sm:text-sm flex items-center gap-0">
                                                    <span className="material-icons">location_on</span>
                                                    {hotel.hotelAddress}
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                </DialogTrigger>

                                {/* Dialog Content */}
                                <DialogContent className={`rounded-lg shadow-lg ${dialogStyles}`}>
                                    <DialogHeader>
                                        <DialogTitle className="text-3xl font-extrabold">
                                            {selectedHotel?.hotelName}
                                        </DialogTitle>
                                        <DialogDescription>
                                            Explore more about this hotel.
                                        </DialogDescription>
                                    </DialogHeader>
                                    {/* Map Button */}
                                    <div className="flex justify-end mb-1">
                                        <Button
                                            className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full"
                                            title="View on Map"
                                        >
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName)} ${encodeURIComponent(hotel.hotelAddress)}`}
                                                target="_blank"
                                                rel="noopener noreferrer" // Adds security by preventing the new tab from accessing the original window's context
                                            >
                                                <img
                                                    src={map}
                                                    alt="Map"
                                                    className="h-6 w-6 object-contain"
                                                />
                                            </a>
                                        </Button>
                                    </div>

                                    {/* Hotel Details */}
                                    <div className="-mt-4">
                                        <img
                                            className={`w-full h-48 sm:h-56 md:h-64 lg:h-72 object-contain rounded-lg`}
                                            src={TimeToTravel}
                                            alt={selectedHotel?.hotelName}
                                        />
                                        <p className="text-sm mt-4">
                                            <strong>Description:</strong> {selectedHotel?.description}
                                        </p>
                                        <p className="text-sm mt-2">
                                            <strong>Price Range:</strong> {selectedHotel?.price.range}
                                        </p>
                                        <p className="text-sm mt-2">
                                            <strong>Rating:</strong> {selectedHotel?.rating || "N/A"}
                                        </p>
                                        <p className="text-sm mt-2">
                                            <strong>Address:</strong> {selectedHotel?.hotelAddress}
                                        </p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <CarouselPrevious className="absolute left-4 top-1/3 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 z-20" />
                    <CarouselNext className="absolute right-4 top-1/3 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 z-20" />
                </Carousel>
            </div>
        </div>
    );
}

export default Hotels;
