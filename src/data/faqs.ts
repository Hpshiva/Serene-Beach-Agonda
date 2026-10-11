export interface FAQItem {
  question: string;
  answer: string;
  category: 'Booking & Pricing' | 'Check-in & Stay' | 'Location & Travel' | 'Policies';
  isPendingConfirmation?: boolean;
}

export const FAQS_DATA: FAQItem[] = [
  {
    category: "Booking & Pricing",
    question: "Why should I book directly on this website instead of OTAs?",
    answer: "Booking directly with Serene Beach Agonda ensures you get the lowest guaranteed rate (saving up to ₹500/night with zero OTA commission markup), complimentary breakfast upgrade options, priority room placement with prime sea or garden breeze, and flexible date changes."
  },
  {
    category: "Booking & Pricing",
    question: "Is this website demo processing live payments?",
    answer: "This website serves as our interactive direct booking demonstration. In this demo mode, payments are safely simulated via our test checkout flow so you can explore the complete guest experience. Real reservation processing and production payment gateways will be live upon final owner confirmation."
  },
  {
    category: "Check-in & Stay",
    question: "What are your standard check-in and check-out timings?",
    answer: "Standard check-in is from 12:00 PM, and check-out is by 10:00 AM. Early check-in or late check-out is gladly accommodated subject to room availability upon request."
  },
  {
    category: "Check-in & Stay",
    question: "Are all rooms air-conditioned with ensuite bathrooms?",
    answer: "Yes, every room at Serene Beach Agonda features whisper-quiet split air conditioning, an ensuite private bathroom with 24-hour hot and cold water, high-speed WiFi, and private verandas or balconies."
  },
  {
    category: "Location & Travel",
    question: "How far is Serene Beach Agonda from the beach?",
    answer: "We are located directly beachfront in Agonda (121/8, Dhavalkhazan). You can walk out of your room and step onto the golden sands in under 30 seconds."
  },
  {
    category: "Location & Travel",
    question: "How do I reach the property from Goa airports or railway stations?",
    answer: "Dabolim International Airport (GOI) is approximately 60 km (~90 mins), Manohar International Airport (MOPA / GOX) is 105 km (~2 hrs 15 mins), and Madgaon Junction (Margao) is 36 km (~50 mins). Pre-paid airport taxis and private chauffeur pickups can be pre-arranged with our team."
  },
  {
    category: "Policies",
    question: "What is the cancellation policy for direct reservations?",
    answer: "Standard direct bookings qualify for free cancellation or date modification up to 7 days before your arrival date. Cancellations made between 7 days and 48 hours receive a 50% refund. Cancellations within 48 hours or no-shows are non-refundable."
  },
  {
    category: "Policies",
    question: "Is smoking or loud music permitted on the property?",
    answer: "To preserve Agonda Beach's peaceful atmosphere and protect local wildlife (including Olive Ridley sea turtle nesting zones), loud music and parties are not permitted on the premises. Smoking is allowed only in designated outdoor open-air zones."
  }
];
