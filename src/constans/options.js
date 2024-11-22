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
-Please dont give name like Example-Hotel etc i want real names for it other wise just dont add that hotel and also dont include comments, just give me JSON that can be parse without any error
-In hotel please provide real details of the hotel with proper address
- Provide only real, accurate, and verifiable data. If limited information is available, include only the authentic details, even if fewer activities or options are provided.
- Ensure at least **2-3 hotels** are listed, aligned with the budget and traveler requirements, and provide complete details for each.
- For each request, deliver a fully detailed plan for all days. Each day should be represented as day1, day2, and so on, with a comprehensive plan including all required details. Do not leave placeholders like //Add day 6 plan here. Use real data instead.
- Aim for at least 2-3 activities per day, with a maximum of 5-6, ensuring variety and avoiding unnecessary repetition.
- Use valid JSON syntax only. Avoid comments, placeholders, or any invalid syntax such as \`//...\`.
- Include the **actual names of hotels** that exist in the location, with accurate details such as address, price range, rating, and more. Do not use placeholders or generic names like 'Hotel A' or 'Hotel B'.
- Ensure the output is valid and parseable JSON.
-Dont include Departure as day Itinerary.
`;
