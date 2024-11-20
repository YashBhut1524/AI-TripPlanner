import ThemeContext from '@/context/ThemeContext'
import { db } from '@/service/FireBaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import InfoSection from './components/InfoSection'
import Hotels from './components/Hotels'

function ViewTrip() {

    const { darkMode } = useContext(ThemeContext)
    const { tripId } = useParams()

    const [trip, setTrip] = useState([])

    useEffect(() => {
        tripId && getTripData()
    }, [tripId])

    const getTripData = async () => {
        const docRef = doc(db, 'Ai-Trips', tripId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            toast.error("No Trip Found!!")
        }
    }

    return (
        <div
            className={`overflow-y-hidden px-10 pb-10 md:px-32 lg:px-44 xl:px-56  ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"}`}
        >
            {/* Information Section */}
            <InfoSection trip={trip}/>
            {/* Hotels */}
            <Hotels trip={trip}/>
            {/* Itinerary */}
            {/* Footer */}
        </div>
    )
}

export default ViewTrip