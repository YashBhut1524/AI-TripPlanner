
import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "I cannot directly access real-time information, including hotel prices, availability, images, and geo-coordinates.  Also, providing image URLs requires a direct link which I do not have access to.  Therefore, I cannot fulfill your request completely.  This response provides a template and example data you can adapt by using online travel agencies (like Expedia, Booking.com, Kayak) to fill in the missing information.\n\n\n```json\n{\n  \"tripName\": \"Las Vegas Budget Trip for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": 2,\n  \"hotels\": [\n    {\n      \"hotelName\": \"Example Hotel 1\",\n      \"hotelAddress\": \"123 Example Street, Las Vegas, NV 89101\",\n      \"price\": {\"range\": \"50-80 USD per night\"}, \n      \"hotelImageUrl\": \"PLACEHOLDER_IMAGE_URL_1\",\n      \"geoCoordinates\": {\"latitude\": 36.1699, \"longitude\": -115.1398},\n      \"rating\": 3.5,\n      \"description\": \"A budget-friendly hotel with basic amenities, located a bit outside the Strip.\"\n    },\n    {\n      \"hotelName\": \"Example Hotel 2\",\n      \"hotelAddress\": \"456 Another Ave, Las Vegas, NV 89109\",\n      \"price\": {\"range\": \"70-100 USD per night\"},\n      \"hotelImageUrl\": \"PLACEHOLDER_IMAGE_URL_2\",\n      \"geoCoordinates\": {\"latitude\": 36.1146, \"longitude\": -115.1729},\n      \"rating\": 4.0,\n      \"description\": \"Slightly more upscale, but still budget-conscious hotel, closer to the Strip.\"\n    },\n    // Add more hotels here using the same structure\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free walking street with light shows and entertainment.\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_3\",\n        \"geoCoordinates\": {\"latitude\": 36.1699, \"longitude\": -115.14},\n        \"ticketPricing\": \"Free\",\n        \"travelTime\": \"30 minutes (from most hotels)\"\n      },\n      {\n        \"placeName\": \"Neon Museum\",\n        \"placeDetails\": \"Outdoor museum showcasing vintage Vegas signs (requires tickets).\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_4\",\n        \"geoCoordinates\": {\"latitude\": 36.1433, \"longitude\": -115.127},\n        \"ticketPricing\": \"Check online for pricing\",\n        \"travelTime\": \"20 minutes (from Fremont Street)\"\n      },\n      {\n        \"placeName\": \"Downtown Las Vegas Buffet (Cheap Eats)\",\n        \"placeDetails\": \"Find affordable buffets for dinner in Downtown.\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_5\",\n        \"geoCoordinates\": \"Find specific restaurant coordinates online\", \n        \"ticketPricing\": \"Variable, check online\",\n        \"travelTime\": \"10 minutes (walking)\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Las Vegas Strip (walk)\",\n        \"placeDetails\": \"Walk the Strip, see the sights, and people-watch.\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_6\",\n        \"geoCoordinates\": \"Check online for Strip boundaries\",\n        \"ticketPricing\": \"Free\",\n        \"travelTime\": \"All day\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Free water show outside the Bellagio.\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_7\",\n        \"geoCoordinates\": {\"latitude\": 36.1147, \"longitude\": -115.1713},\n        \"ticketPricing\": \"Free\",\n        \"travelTime\": \"Variable\"\n      },\n      {\n        \"placeName\": \"In-N-Out Burger (Cheap Eats)\",\n        \"placeDetails\": \"Popular budget-friendly burger chain.\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_8\",\n        \"geoCoordinates\": \"Check online for locations\", \n        \"ticketPricing\": \"Variable\",\n        \"travelTime\": \"Variable\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Scenic hiking and outdoor activities (requires transportation).\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_9\",\n        \"geoCoordinates\": {\"latitude\": 36.1616, \"longitude\": -115.8006},\n        \"ticketPricing\": \"Check for entrance fees\",\n        \"travelTime\": \"30-45 minutes by car or taxi\"\n      },\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Outdoor art installation (requires transportation).\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_10\",\n        \"geoCoordinates\": {\"latitude\": 36.0154, \"longitude\": -114.9496},\n        \"ticketPricing\": \"Free\",\n        \"travelTime\": \"30 minutes by car from Red Rock\"\n      },\n        {\n        \"placeName\": \"Local Casino Buffet (Cheap Eats)\",\n        \"placeDetails\": \"Many casinos offer more affordable buffets later in the day.\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_11\",\n        \"geoCoordinates\": \"Find specific restaurant coordinates online\", \n        \"ticketPricing\": \"Variable, check online\",\n        \"travelTime\": \"Variable\"\n      }\n\n    ]\n  }\n}\n```\n\n\nRemember to replace all the `PLACEHOLDER_IMAGE_URL` entries and pricing/coordinate information with actual data from your research.  Use Google Maps to find geo-coordinates.  Have a great trip!\n" },
                ],
            },
        ],
    });
