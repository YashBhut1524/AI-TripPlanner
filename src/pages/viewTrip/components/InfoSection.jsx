/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import ThemeContext from "@/context/ThemeContext"
import TimeToTravel from "@/images/TimeToTravel.jpg"
import { useContext } from "react"
import { IoShareSocialSharp } from "react-icons/io5";

function InfoSection({ trip }) {

    const { darkMode } = useContext(ThemeContext)

    return (
        <div>
            {/* Image with responsive and perfect fit */}
            <img
                src={TimeToTravel}
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
