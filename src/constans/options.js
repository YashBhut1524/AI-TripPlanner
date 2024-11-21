export const SelectTravelerList = [
    {
        id: 1,
        title: "Just Me",
        description: "A solo traveler in exploration.",
        icon: "🧍",
        people: "1",
    },
    {
        id: 2,
        title: "A Couple",
        description: "Perfect for a romantic getaway.",
        icon: "👫",
        people: "2 People",
    },
    {
        id: 3,
        title: "Family",
        description: "Fun-filled trips with loved ones.",
        icon: "👨‍👩‍👧‍👦",
        people: "3 to 5 People",
    },
    {
        id: 4,
        title: "Friends",
        description: "Great for group adventures with friends.",
        icon: "👯‍♂️",
        people: "3+ People",
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        description: "Budget-friendly and affordable.",
        icon: "💰",
    },
    {
        id: 2,
        title: "Moderate",
        description: "Balanced expenses for comfort.",
        icon: "💵",
    },
    {
        id: 3,
        title: "Expensive",
        description: "Luxurious and high-end experience.",
        icon: "💎",
    },
];

// export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {numOfDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {numOfDays} days with each day plan with best time to visit in JSON format.and keep in mind dont put any comment and not wanting text in result.Repeat the hotes and all for long trips if required but fill all details dont leave anything black and whatever happen dont add any comment // or and unwanted text please.\n\n"

export const AI_PROMPT = `
Generate a travel plan for Location: {location}, for {numOfDays} days, for {traveler}, with a {budget} budget. 
Provide a JSON output structured as follows:
1. A list of **at least 5 hotels**, including:
   - "hotelName"
   - "hotelAddress"
   - "price" (as a range)
   - "hotelImageUrl"
   - "geoCoordinates" (latitude and longitude)
   - "rating"
   - "description"
2. An itinerary with:
   - "day{dayNumber}" (where dayNumber is 1, 2, ..., {numOfDays})
     - "plan": 
         - "placeName"
         - "placeDetails"
         - "placeImageUrl"
         - "placeAddress"
         - "geoCoordinates" (latitude and longitude)
         - "ticketPricing"
         - "travelTime"
         - "bestTimetoVisit"

**Important Instructions:**
- Include at least **5 hotels** matching the budget and travelers, with full details for each hotel.
- For each request Provide fully detailed plan for all days. Each day should be represented as day1,day2, etc., and each day should contain a plan with all required details dont keep //Add day 6 plan here following the same structure put real values. Try to add atleast 2-3 activity and max till 5-6 activity perday
- Avoid repeating activities unless necessary, and ensure sufficient variety.
- Do not include any comments, placeholders, or invalid JSON syntax like \`//...\`. Ensure the JSON is valid and parseable.
- Output only valid JSON.
`;
