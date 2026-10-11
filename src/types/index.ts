export interface RoomMealPlan {
  id: string;
  name: string;
  priceDeltaPerNight: number;
  description: string;
}

export interface Room {
  id: string;
  crsId: number;
  name: string;
  tagline: string;
  category: 'balcony' | 'sea_view' | 'family';
  rackRate: number; // Regular rate
  directRate: number; // Direct booking discounted rate
  baseOccupancy: number;
  maxOccupancy: number;
  maxChildren: number;
  extraBedAvailable: boolean;
  extraBedCharge: number;
  bedType: string;
  sizeSqFt: number;
  view: string;
  availabilityCount: number;
  images: string[];
  description: string;
  longDescription: string;
  amenities: string[];
  features: string[];
  mealPlans: RoomMealPlan[];
}

export interface BookingSearch {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
  roomsCount: number;
}

export interface BookingSelectionItem {
  roomId: string;
  quantity: number;
  mealPlanId: string;
  adults: number;
  children: number;
  extraBeds: number;
}

export interface BookingFinancials {
  nights: number;
  roomSubtotal: number;
  extraBedCharges: number;
  mealPlanCharges: number;
  grossAmount: number;
  directSavings: number; // How much saved by booking direct vs rack rate
  taxRate: number; // 0.12 (12%) or 0.18 (18%)
  taxAmount: number;
  grandTotal: number;
}

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  cityCountry?: string;
  specialRequests?: string;
  estimatedArrivalTime?: string;
}

export type PaymentMethod = 'razorpay' | 'upi' | 'card' | 'pay_at_property';

export interface BookingConfirmationData {
  bookingReference: string;
  createdAt: string;
  guest: GuestDetails;
  search: BookingSearch;
  selectedRoom: Room;
  selectedMealPlan: RoomMealPlan;
  financials: BookingFinancials;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pay_at_checkin' | 'simulated_test';
  transactionId: string;
  isDemoBooking: boolean;
}

export interface Attraction {
  id: string;
  name: string;
  cursiveTag?: string;
  highlightBadge?: string;
  category: 'Nature & Beaches' | 'Heritage & Culture' | 'Sunset & Views' | 'Dining & Shacks';
  distanceKm: number;
  driveTimeMin: number;
  travelMode: 'Walk' | 'Drive' | 'Boat / Drive';
  shortDesc: string;
  fullDesc: string;
  bestTimeToVisit: string;
  image: string;
  mapQuery: string;
}

export interface GuestReview {
  id: string;
  author: string;
  origin: string;
  cursiveTag?: string;
  ratingScore: number; // e.g. 9.5 or 5.0
  maxScore: number; // 10 or 5
  sourcePlatform: 'Agoda Verified' | 'Booking.com' | 'Google Reviews';
  reviewDate: string;
  headline: string;
  comment: string;
  roomStayed: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'rooms' | 'ocean' | 'resort' | 'dining';
  url: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  caption: string;
}
