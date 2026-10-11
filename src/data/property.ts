export const PROPERTY_DATA = {
  name: "Serene Beach Agonda",
  tagline: "Your Private Coastal Haven on Agonda Beach",
  subheadline: "Steps from untouched golden sand and the gentle rhythm of the Arabian Sea in peaceful South Goa.",
  
  address: {
    line1: "121/8, Dhavalkhazan / Devalkajjan",
    area: "Agonda Beach, Canacona",
    state: "Goa",
    postalCode: "403702",
    country: "India",
    full: "121/8, Agonda Beach, Devalkajjan, Canacona, South Goa 403702, India",
    coordinates: {
      lat: 15.0474753,
      lng: 73.9849014,
    },
  },
  
  googleMapsUrl: "https://maps.app.goo.gl/LKW5idp1jyKdnCJe8",
  directionsEmbedUrl: "https://maps.google.com/maps?q=15.0474753,73.9849014&hl=en&z=16&output=embed",
  
  contacts: {
    phone: "+91 98765 43210", // Owner confirmation pending - configurable demo placeholder
    phoneDisplay: "+91 98765 43210 (Demo Contact)",
    whatsapp: "+919876543210",
    whatsappDisplay: "+91 98765 43210",
    email: "reservations@serenebeachagonda.com",
    isPhonePendingConfirmation: true,
  },
  
  checkInTime: "12:00 PM",
  checkOutTime: "10:00 AM",
  
  // Publicly verifiable ratings
  ratings: {
    agoda: {
      score: 8.4,
      max: 10,
      label: "Excellent",
      reviewsCount: 277,
      verifiedSource: "Agoda Public Listing",
    },
    bookingCom: {
      score: 8.3,
      max: 10,
      label: "Very Good",
      reviewsCount: 203,
      verifiedSource: "Booking.com Public Listing",
    },
    googleReference: {
      score: 4.6,
      max: 5,
      label: "Star Rating",
      reviewsCount: "339+",
      verifiedSource: "Supplied Commercial Reference (Owner Chat)",
      isPendingApiSync: true,
    },
  },

  directBookingBenefits: [
    {
      title: "Guaranteed Lowest Rates",
      desc: "Save up to ₹500/night directly compared to third-party travel agent channels.",
      badge: "Best Rate Guarantee",
    },
    {
      title: "Complimentary Breakfast Option",
      desc: "Enjoy fresh Goan poi bread, seasonal coastal fruit platters, and hot beverages by the sea.",
      badge: "Breakfast Perks",
    },
    {
      title: "Flexible Date Adjustments",
      desc: "Change your stay dates with zero penalty up to 7 days before arrival (subject to availability).",
      badge: "Flexibility",
    },
    {
      title: "Direct Host Care via WhatsApp",
      desc: "Personalized assistance for airport cab bookings, scooter rentals, and dolphin watching.",
      badge: "Personal Concierge",
    },
    {
      title: "Priority Room Placement",
      desc: "Get the best available rooms with optimal beach breeze and sea-facing viewpoints.",
      badge: "Best Room Selection",
    },
  ],

  amenities: [
    { name: "Direct Beach Access", desc: "Steps from your room onto the soft golden sands of Agonda", icon: "Waves" },
    { name: "Ocean & Balcony Views", desc: "Private sit-outs with refreshing sea breezes and sunset panoramas", icon: "Eye" },
    { name: "Climate Control AC", desc: "Whisper-quiet air conditioning in all suites and rooms", icon: "Wind" },
    { name: "High-Speed WiFi", desc: "Reliable internet for remote work and digital nomads", icon: "Wifi" },
    { name: "On-site Coastal Dining", desc: "Fresh Goan curries, seafood catches, and healthy continental options", icon: "Utensils" },
    { name: "Daily Housekeeping", desc: "Fresh linens, towels, and spotless ensuite bathrooms", icon: "Sparkles" },
    { name: "Scooter & Taxi Hire", desc: "Assistance with hassle-free local vehicle rentals", icon: "Compass" },
    { name: "Free Guest Parking", desc: "Secure on-premises parking space for cars and bikes", icon: "Car" },
  ],

  transitDistances: [
    { hub: "Agonda Beach", distance: "0 meters", duration: "1 min walk", mode: "Walk" },
    { hub: "Canacona Railway Station", distance: "9 km", duration: "15 mins", mode: "Drive" },
    { hub: "Madgaon Junction (Margao)", distance: "36 km", duration: "50 mins", mode: "Drive" },
    { hub: "Goa Dabolim Airport (GOI)", distance: "60 km", duration: "1 hr 30 mins", mode: "Drive" },
    { hub: "Manohar MOPA Airport (GOX)", distance: "105 km", duration: "2 hrs 15 mins", mode: "Drive" },
  ],
};
