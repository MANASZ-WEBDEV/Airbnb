const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Relax in this charming beachfront cottage with ocean views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stylish loft apartment in the heart of the city.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    },
    price: 1200,
    location: "New York",
    country: "United States",
  },
  {
    title: "Mountain Retreat Cabin",
    description: "Peaceful wooden cabin surrounded by mountains.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    },
    price: 900,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Luxury Villa with Pool",
    description: "Private villa with infinity pool and sea view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    },
    price: 3000,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Desert Glamping Tent",
    description: "Experience luxury camping under the stars.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    price: 600,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Lakefront Wooden House",
    description: "Beautiful house right next to a serene lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1475856034135-6b0eacb5b4d8",
    },
    price: 1400,
    location: "Zurich",
    country: "Switzerland",
  },
  {
    title: "Tokyo Studio Apartment",
    description: "Compact and modern studio in central Tokyo.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    },
    price: 1100,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Parisian Romantic Flat",
    description: "Cozy flat with Eiffel Tower views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    },
    price: 1800,
    location: "Paris",
    country: "France",
  },
  {
    title: "Countryside Farmhouse",
    description: "Traditional farmhouse surrounded by greenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
    },
    price: 800,
    location: "Tuscany",
    country: "Italy",
  },
  {
    title: "Beach Shack in Goa",
    description: "Simple beachside shack perfect for sunsets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 500,
    location: "Goa",
    country: "India",
  },

  // 25 more 👇

  {
    title: "Dubai Skyline Apartment",
    description: "Luxury apartment with Burj Khalifa view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    price: 2500,
    location: "Dubai",
    country: "UAE",
  },
  {
    title: "Bali Jungle Villa",
    description: "Private villa surrounded by tropical jungle.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    price: 1700,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "London City Apartment",
    description: "Modern apartment in central London.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    },
    price: 2000,
    location: "London",
    country: "UK",
  },
  {
    title: "Sydney Beach House",
    description: "Bright house near Bondi Beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    },
    price: 2100,
    location: "Sydney",
    country: "Australia",
  },
  {
    title: "Swiss Alps Chalet",
    description: "Snowy chalet with breathtaking mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1455587734955-081b22074882",
    },
    price: 1900,
    location: "Interlaken",
    country: "Switzerland",
  },
  {
    title: "New Delhi Penthouse",
    description: "Luxury penthouse with city skyline view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    price: 1300,
    location: "New Delhi",
    country: "India",
  },
  {
    title: "Barcelona Seaside Flat",
    description: "Colorful flat near the Mediterranean coast.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505692794403-34d4982e5f16",
    },
    price: 1400,
    location: "Barcelona",
    country: "Spain",
  },
  {
    title: "Toronto Condo",
    description: "High-rise condo in downtown Toronto.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
    },
    price: 1250,
    location: "Toronto",
    country: "Canada",
  },
  {
    title: "Cape Town Ocean Villa",
    description: "Stunning villa overlooking the Atlantic.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    },
    price: 1600,
    location: "Cape Town",
    country: "South Africa",
  },
  {
    title: "Iceland Glass Cabin",
    description: "Glass cabin perfect for northern lights.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
    },
    price: 1500,
    location: "Reykjavik",
    country: "Iceland",
  },

  {
    title: "Amsterdam Canal House",
    description: "Historic house along the canal.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1475856034135-6b0eacb5b4d8",
    },
    price: 1750,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Bangkok Highrise",
    description: "Modern apartment with city skyline view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    },
    price: 900,
    location: "Bangkok",
    country: "Thailand",
  },
  {
    title: "Maldives Overwater Bungalow",
    description: "Stay above crystal clear waters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 4000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "San Francisco Townhouse",
    description: "Colorful townhouse near Golden Gate.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    },
    price: 2300,
    location: "San Francisco",
    country: "United States",
  },
  {
    title: "Rio Beach Apartment",
    description: "Sunny apartment near Copacabana beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    },
    price: 1000,
    location: "Rio de Janeiro",
    country: "Brazil",
  },
  {
    title: "Himalayan Homestay",
    description: "Peaceful stay in the Himalayas.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    },
    price: 700,
    location: "Manali",
    country: "India",
  },
  {
    title: "Seoul Smart Apartment",
    description: "Tech-enabled apartment in Gangnam.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    },
    price: 1200,
    location: "Seoul",
    country: "South Korea",
  },
  {
    title: "Lisbon Rooftop Flat",
    description: "Rooftop terrace with sunset view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    },
    price: 1300,
    location: "Lisbon",
    country: "Portugal",
  },
  {
    title: "Moscow Luxury Suite",
    description: "Elegant suite in central Moscow.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    price: 1500,
    location: "Moscow",
    country: "Russia",
  },
  {
    title: "Mexico City Loft",
    description: "Colorful loft in cultural district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
    },
    price: 850,
    location: "Mexico City",
    country: "Mexico",
  },
];
module.exports = { data: sampleListings };