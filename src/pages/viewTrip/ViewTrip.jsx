import ThemeContext from '@/context/ThemeContext'
import { db } from '@/service/FireBaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import InfoSection from './components/InfoSection'
import Hotels from './components/Hotels'
import Itinerary from './components/Itinerary'

function ViewTrip() {
    const { darkMode } = useContext(ThemeContext)
    const { tripId } = useParams()
    const navigate = useNavigate()

    const [trip, setTrip] = useState(null)
    const [loading, setLoading] = useState(true)

    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(user);
    // console.log(trip?.userEmail);
    

    useEffect(() => {
        if (tripId) {
            getTripData()
        }
    }, [tripId])

    const getTripData = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, 'Ai-Trips', tripId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setTrip(docSnap.data())
            } else {
                toast.error("No Trip Found!")
                setTrip(null)
            }
        } catch (error) {
            console.error("Error fetching trip data:", error)
            toast.error("Failed to fetch trip data. Please try again.")
            setTrip(null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div
                className={`flex justify-center items-center h-screen ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                    }`}
            >
                <h2 className="text-2xl font-semibold">Loading trip details...</h2>
            </div>
        )
    }

    if (!trip) {
        return (
            <div
                className={`flex flex-col justify-start items-center pt-10 pb-20 px-5 sm:px-8 h-auto ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                    }`}
            >
                <h2 className="font-bold text-3xl mb-4 text-center">No Trip Found</h2>
                <p className="text-lg text-center mb-6">
                    It seems like the trip you’re looking for does not exist. Try refreshing or go back to the homepage to start planning a new one.
                </p>
                <div className="flex flex-wrap gap-4 justify-center w-full max-w-sm sm:max-w-md">
                    <button
                        className={`px-6 py-3 w-full sm:w-auto rounded-lg font-semibold ${darkMode
                                ? "bg-[#5e17eb] text-white hover:bg-[#7735f7]"
                                : "bg-[#6200ea] text-white hover:bg-[#4500a5]"
                            }`}
                        onClick={getTripData}
                    >
                        Retry
                    </button>
                    <button
                        className={`px-6 py-3 w-full sm:w-auto rounded-lg font-semibold ${darkMode
                                ? "bg-gray-600 text-white hover:bg-gray-500"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                        onClick={() => navigate("/")}
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        );
    }
    
    if (trip?.userEmail !== user?.email) {
        return (
            <div
                className={`flex flex-col justify-start items-center pt-10 pb-20 px-5 sm:px-8 h-auto ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                    }`}
            >
                <h2 className="font-bold text-3xl mb-4 text-center">Unauthorized Access</h2>
                <p className="text-lg text-center mb-6">
                    You are not authorized to view this trip. Please check your account or go back to the homepage.
                </p>
                <div className="flex flex-wrap gap-4 justify-center w-full max-w-sm sm:max-w-md">
                    <button
                        className={`px-6 py-3 w-full sm:w-auto rounded-lg font-semibold ${darkMode
                                ? "bg-[#5e17eb] text-white hover:bg-[#7735f7]"
                                : "bg-[#6200ea] text-white hover:bg-[#4500a5]"
                            }`}
                        onClick={getTripData}
                    >
                        Retry
                    </button>
                    <button
                        className={`px-6 py-3 w-full sm:w-auto rounded-lg font-semibold ${darkMode
                                ? "bg-gray-600 text-white hover:bg-gray-500"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                        onClick={() => navigate("/")}
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`overflow-y-hidden px-10 pb-10 md:px-32 lg:px-44 xl:px-56 ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                }`}
        >
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Hotels */}
            <Hotels trip={trip} />
            {/* Itinerary */}
            <Itinerary trip={trip} />
        </div>
    )
}

export default ViewTrip
