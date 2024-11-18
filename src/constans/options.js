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

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {numOfDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n\n"