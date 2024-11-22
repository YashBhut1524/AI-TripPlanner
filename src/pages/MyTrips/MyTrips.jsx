import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/FireBaseConfig";
import ThemeContext from "@/context/ThemeContext";
import TripCardItem from "./components/TripCardItem";

export default function MyTrips() {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
        getUserTrips();
    }, []);

    const handleRetry = () => {
        window.location.reload();
    };

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            setIsAuthorized(false);
            setLoading(false);
            return;
        }
        setLoading(true);

        try {
            const q = query(
                collection(db, "Ai-Trips"),
                where("userEmail", "==", user?.email)
            );
            const querySnapshot = await getDocs(q);
            const trips = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthorized) {
        return (
            <div
                className={`flex flex-col justify-start items-center pt-10 pb-20 px-5 sm:px-8 h-auto ${
                    darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                }`}
            >
                <h2 className="font-bold text-3xl mb-4 text-center">Unauthorized Access</h2>
                <p className="text-lg text-center mb-6">
                    You are not authorized to view this trip. Please check your account or go back to the homepage.
                </p>
                <div className="flex flex-wrap gap-4 justify-center w-full max-w-sm sm:max-w-md">
                    <button
                        className={`px-6 py-3 w-full sm:w-auto rounded-lg font-semibold ${
                            darkMode
                                ? "bg-[#5e17eb] text-white hover:bg-[#7735f7]"
                                : "bg-[#6200ea] text-white hover:bg-[#4500a5]"
                        }`}
                        onClick={handleRetry}
                    >
                        Retry
                    </button>
                    <button
                        className={`px-6 py-3 w-full sm:w-auto rounded-lg font-semibold ${
                            darkMode
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

    if (loading) {
        return (
            <div
                className={`flex justify-center items-center h-screen ${
                    darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                }`}
            >
                <h2 className="text-2xl font-semibold">Loading trips...</h2>
            </div>
        );
    }

    if (userTrips.length === 0) {
        return (
            <div
                className={`flex flex-col justify-center items-center h-[40vh] pb-5 ${
                    darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
                }`}
            >
                <h2 className="font-bold text-3xl mb-4 text-center">No Trips Created</h2>
                <p className="text-lg text-center mb-6">
                    It looks like you haven’t created any trips yet. Start planning now!
                </p>
                <button
                    className={`px-6 py-3 rounded-lg font-semibold ${
                        darkMode
                            ? "bg-[#5e17eb] text-white hover:bg-[#7735f7]"
                            : "bg-[#6200ea] text-white hover:bg-[#4500a5]"
                    }`}
                    onClick={() => navigate("/create-trip")}
                >
                    Create a Trip
                </button>
            </div>
        );
    }

    return (
        <div
            className={`h-full px-4 sm:px-6 md:px-32 lg:px-56 xl:px-60 pb-20 ${
                darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"
            }`}
        >
            <h2 className="font-extrabold text-3xl pb-10">My Trips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {userTrips.map((trip) => (
                    <TripCardItem key={trip.id} trip={trip} />
                ))}

                {/* Add Trip Card */}
                <div
                    className={`relative flex items-center justify-center p-4 rounded-xl border cursor-pointer ${
                        darkMode
                            ? "bg-[#1a1a2e] border-[#5e17eb] hover:border-[#7735f7] hover:shadow-[0_4px_20px_rgba(94,23,235,0.6)] text-white"
                            : "bg-white border-gray-300 hover:border-[#6200ea] hover:shadow-[0_4px_15px_rgba(98,0,234,0.2)] text-gray-900"
                    } transition-all duration-300`}
                >
                    <Link to="/create-trip">
                        <div className="flex flex-col items-center justify-center">
                            <div
                                className={`text-4xl font-bold ${
                                    darkMode ? "text-[#5e17eb]" : "text-[#6200ea]"
                                } transition-transform duration-300 hover:scale-110`}
                            >
                                +
                            </div>
                            <p
                                className={`mt-2 text-sm font-medium ${
                                    darkMode ? "text-gray-400" : "text-gray-700"
                                }`}
                            >
                                Add Trip
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
