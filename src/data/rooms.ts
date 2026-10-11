import { Room } from '../types';

export const ROOMS_DATA: Room[] = [
  {
    id: "double-room-balcony",
    crsId: 31320,
    name: "Double Room With Balcony",
    tagline: "Tropical garden breeze and a private open-air sit-out",
    category: "balcony",
    rackRate: 4700,
    directRate: 4200,
    baseOccupancy: 2,
    maxOccupancy: 3,
    maxChildren: 1,
    extraBedAvailable: true,
    extraBedCharge: 800,
    bedType: "King Bed (Plush Coastal Mattress)",
    sizeSqFt: 280,
    view: "Private Garden & Coconut Canopy View",
    availabilityCount: 5,
    images: [
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608820/serene-beach-agonda-canacona-pic-4.JPEG",
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/9574/gallery/img_68ec89fc29cc42.94969317.jpg",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608822/serene-beach-agonda-canacona-pic-5.JPEG",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678611/1678611149/serene-beach-agonda-canacona-pic-8.JPEG"
    ],
    description: "Spacious air-conditioned retreat featuring artisanal cane furnishings and a shaded balcony overlooking Agonda's swaying palms.",
    longDescription: "The Double Room With Balcony is tailored for couples and solo wanderers seeking a calm haven after a day along the shore. Wake up to gentle tropical birdsong, enjoy your morning coffee on your private breezy veranda, and step onto the sand within seconds. Furnished with thoughtful natural wood finishes, a restful King bed with crisp cotton linens, and a clean modern bathroom.",
    amenities: [
      "Private Furnished Balcony",
      "Whisper-quiet Air Conditioning",
      "Complimentary High-speed WiFi",
      "Ensuite Bathroom with Hot Shower",
      "Tea & Coffee Station",
      "Daily Housekeeping",
      "Wardrobe & Luggage Rack",
      "Direct Beach Path Access"
    ],
    features: [
      "Save ₹500/night directly",
      "Private outdoor balcony",
      "2 mins stroll to beachfront cafes",
      "Quiet garden setting"
    ],
    mealPlans: [
      {
        id: "room_only",
        name: "Room Only (European Plan)",
        priceDeltaPerNight: 0,
        description: "Standard room accommodation with complimentary water and tea/coffee."
      },
      {
        id: "room_breakfast",
        name: "Room With Breakfast (Bed & Breakfast)",
        priceDeltaPerNight: 400,
        description: "Fresh coastal Goan or continental breakfast served daily from 8:00 AM to 10:30 AM."
      }
    ]
  },
  {
    id: "family-room-side-sea-view",
    crsId: 31319,
    name: "Family Room with Side Sea View",
    tagline: "Expansive comfort with ocean air and side beach vantage",
    category: "family",
    rackRate: 5500,
    directRate: 5000,
    baseOccupancy: 2,
    maxOccupancy: 4,
    maxChildren: 2,
    extraBedAvailable: true,
    extraBedCharge: 900,
    bedType: "King Bed + Comfortable Daybed / Extra Bed",
    sizeSqFt: 360,
    view: "Side Arabian Sea & Palm Grove View",
    availabilityCount: 2,
    images: [
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/9574/gallery/img_68ec8a01187f86.94006040.jpg",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608830/serene-beach-agonda-canacona-pic-6.JPEG",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678611/1678611071/serene-beach-agonda-canacona-pic-7.JPEG",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608808/serene-beach-agonda-canacona-pic-9.JPEG"
    ],
    description: "A generous suite designed for families or small groups of friends, combining breezy side ocean views with ample space to relax.",
    longDescription: "Our Family Room with Side Sea View brings together the best of both worlds: generous interior floor space and refreshing coastal sea breezes. Open your windows to catch glimpse of the sunlit Arabian Sea through the coastal coconut grove. Ideal for parents traveling with children or groups of close friends needing extra room without compromising on comfort.",
    amenities: [
      "Side Sea View Patio / Balcony",
      "Spacious Multi-Guest Layout",
      "Whisper-quiet Air Conditioning",
      "Fast WiFi for Work & Streaming",
      "Large Ensuite Bathroom with Hot Water",
      "Electric Kettle & Tea Corner",
      "Seating Lounge Area",
      "Complimentary Beach Towels"
    ],
    features: [
      "Save ₹500/night directly",
      "Ideal for families up to 4 guests",
      "Side sea view and evening breeze",
      "Shortest walking distance to water"
    ],
    mealPlans: [
      {
        id: "room_only",
        name: "Room Only (European Plan)",
        priceDeltaPerNight: 0,
        description: "Standard room accommodation."
      },
      {
        id: "room_breakfast",
        name: "Room With Breakfast (Bed & Breakfast)",
        priceDeltaPerNight: 500,
        description: "Daily breakfast for the family with Goan and continental selections."
      }
    ]
  },
  {
    id: "double-room-sea-view",
    crsId: 31321,
    name: "Double Room With Sea View",
    tagline: "Front-row Arabian Sea horizons and golden hour sunsets",
    category: "sea_view",
    rackRate: 5500,
    directRate: 5000,
    baseOccupancy: 2,
    maxOccupancy: 3,
    maxChildren: 1,
    extraBedAvailable: true,
    extraBedCharge: 900,
    bedType: "King Bed (Sea-Facing)",
    sizeSqFt: 310,
    view: "Unobstructed Arabian Sea & Sunset Vista",
    availabilityCount: 2,
    images: [
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/9574/gallery/img_68ec89fe9021a9.15470954.jpg",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678609/1678609657/serene-beach-agonda-canacona-pic-10.JPEG",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678609/1678609660/serene-beach-agonda-canacona-pic-11.JPEG",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678611/1678611092/serene-beach-agonda-canacona-pic-12.JPEG"
    ],
    description: "Fall asleep to the tranquil rhythm of Arabian Sea waves and wake to golden ocean light filtering right through your front balcony.",
    longDescription: "Our Double Room With Sea View puts you at the edge of the world. Positioned to capture uninterrupted ocean vistas and romantic evening sunsets, this room is the most sought-after choice for couples celebrating anniversaries or seeking an authentic beach holiday. Enjoy chilled drinks on your private terrace while watching fishing boats drift past in the distance.",
    amenities: [
      "Front-facing Sea View Balcony",
      "Direct Sunset Observation",
      "Premium Air Conditioning",
      "Private Ensuite Bathroom",
      "High-speed WiFi",
      "Mini Fridge & Tea Maker",
      "Artisan Bath Amenities",
      "Beach Lounger Access"
    ],
    features: [
      "Save ₹500/night directly",
      "Direct oceanfront sunset view",
      "Romantic couple favorite",
      "Unmatched tranquility"
    ],
    mealPlans: [
      {
        id: "room_only",
        name: "Room Only (European Plan)",
        priceDeltaPerNight: 0,
        description: "Standard room accommodation."
      },
      {
        id: "room_breakfast",
        name: "Room With Breakfast (Bed & Breakfast)",
        priceDeltaPerNight: 450,
        description: "Beachfront breakfast with tropical fruits, eggs, and freshly brewed Goan filter coffee."
      }
    ]
  },
  {
    id: "family-room-sea-view",
    crsId: 31333,
    name: "Family Room With Sea View",
    tagline: "Our premier signature oceanfront sanctuary",
    category: "family",
    rackRate: 7500,
    directRate: 7000,
    baseOccupancy: 2,
    maxOccupancy: 4,
    maxChildren: 2,
    extraBedAvailable: true,
    extraBedCharge: 1000,
    bedType: "King Bed + Extra Double Bed Setup",
    sizeSqFt: 420,
    view: "Panoramic Arabian Sea & Golden Beachfront",
    availabilityCount: 2,
    images: [
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/9574/gallery/img_68ec89fd5a1873.39652709.jpg",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678611/1678611147/serene-beach-agonda-canacona-pic-1.JPEG",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608784/serene-beach-agonda-canacona-pic-2.JPEG",
      "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608807/serene-beach-agonda-canacona-pic-3.JPEG"
    ],
    description: "The flagship oceanfront suite at Serene Beach Agonda, offering sweeping panoramic views of the entire beach and sea.",
    longDescription: "The Family Room With Sea View is our premier offering. Designed with grand proportions and panoramic glass balcony doors that open out directly onto the salty ocean air. Perfect for families wanting an unforgettable holiday together, or travelers who refuse to compromise on space, scenery, and luxury. Direct access leads you straight from your private doorway into the warm sand.",
    amenities: [
      "Panoramic Oceanfront Terrace",
      "Supreme Floor Space (420 sq ft)",
      "Multi-Bed Configuration for 4",
      "Independent Air Conditioning",
      "Ensuite Bath with Rainfall Shower",
      "Mini Bar / Fridge & Tea Station",
      "Dedicated High-Speed WiFi Router",
      "Dedicated Concierge Support"
    ],
    features: [
      "Save ₹500/night directly",
      "Largest suite at Serene Beach Agonda",
      "Direct panoramic ocean view",
      "Prime beach access"
    ],
    mealPlans: [
      {
        id: "room_only",
        name: "Room Only (European Plan)",
        priceDeltaPerNight: 0,
        description: "Standard room accommodation."
      },
      {
        id: "room_breakfast",
        name: "Room With Breakfast (Bed & Breakfast)",
        priceDeltaPerNight: 600,
        description: "Comprehensive daily breakfast spread for up to 4 guests."
      }
    ]
  }
];
