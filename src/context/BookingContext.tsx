import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  BookingSearch,
  Room,
  RoomMealPlan,
  BookingFinancials,
  GuestDetails,
  PaymentMethod,
  BookingConfirmationData
} from '../types';
import { ROOMS_DATA } from '../data/rooms';

interface BookingContextType {
  search: BookingSearch;
  setSearch: React.Dispatch<React.SetStateAction<BookingSearch>>;
  updateSearchDates: (checkIn: string, checkOut: string) => void;
  updateGuests: (adults: number, children: number, roomsCount?: number) => void;
  
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
  
  selectedMealPlan: RoomMealPlan;
  setSelectedMealPlan: (plan: RoomMealPlan) => void;
  
  extraBeds: number;
  setExtraBeds: (count: number) => void;
  
  financials: BookingFinancials;
  
  guestDetails: GuestDetails;
  setGuestDetails: React.Dispatch<React.SetStateAction<GuestDetails>>;
  
  // Payment demonstration state
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  paymentState: 'idle' | 'processing' | 'success' | 'failed' | 'cancelled';
  setPaymentState: (state: 'idle' | 'processing' | 'success' | 'failed' | 'cancelled') => void;
  paymentErrorMsg: string | null;
  setPaymentErrorMsg: (msg: string | null) => void;
  
  // Confirmed booking state
  confirmationData: BookingConfirmationData | null;
  setConfirmationData: (data: BookingConfirmationData | null) => void;
  completeBooking: (method: PaymentMethod) => BookingConfirmationData;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Helper to format date string YYYY-MM-DD
export function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

export function calculateNightsBetween(checkIn: string, checkOut: string): number {
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 1;
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial date defaults
  const today = new Date();
  const defaultCheckIn = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2));
  const defaultCheckOut = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4));

  const [search, setSearch] = useState<BookingSearch>(() => {
    const saved = localStorage.getItem('sba_booking_search');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      checkIn: defaultCheckIn,
      checkOut: defaultCheckOut,
      adults: 2,
      children: 0,
      roomsCount: 1,
    };
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(() => {
    const savedId = localStorage.getItem('sba_selected_room_id');
    if (savedId) {
      const match = ROOMS_DATA.find(r => r.id === savedId);
      if (match) return match;
    }
    return ROOMS_DATA[2]; // Default to Double Room With Sea View
  });

  const [selectedMealPlan, setSelectedMealPlan] = useState<RoomMealPlan>(() => {
    return selectedRoom?.mealPlans[1] || ROOMS_DATA[0].mealPlans[0]; // Default to Breakfast included
  });

  const [extraBeds, setExtraBeds] = useState<number>(0);

  const [guestDetails, setGuestDetails] = useState<GuestDetails>(() => {
    const saved = localStorage.getItem('sba_guest_details');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      fullName: "",
      email: "",
      phone: "",
      cityCountry: "",
      specialRequests: "",
      estimatedArrivalTime: "14:00",
    };
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success' | 'failed' | 'cancelled'>('idle');
  const [paymentErrorMsg, setPaymentErrorMsg] = useState<string | null>(null);

  const [confirmationData, setConfirmationData] = useState<BookingConfirmationData | null>(() => {
    const saved = localStorage.getItem('sba_confirmed_booking');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return null;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sba_booking_search', JSON.stringify(search));
  }, [search]);

  useEffect(() => {
    if (selectedRoom) {
      localStorage.setItem('sba_selected_room_id', selectedRoom.id);
      // Reset meal plan if selected room changes
      if (!selectedRoom.mealPlans.some(m => m.id === selectedMealPlan.id)) {
        setSelectedMealPlan(selectedRoom.mealPlans[0]);
      }
    }
  }, [selectedRoom, selectedMealPlan]);

  useEffect(() => {
    localStorage.setItem('sba_guest_details', JSON.stringify(guestDetails));
  }, [guestDetails]);

  useEffect(() => {
    if (confirmationData) {
      localStorage.setItem('sba_confirmed_booking', JSON.stringify(confirmationData));
    }
  }, [confirmationData]);

  const updateSearchDates = (checkIn: string, checkOut: string) => {
    // Validate check-out is after check-in
    let validCheckOut = checkOut;
    if (new Date(checkOut) <= new Date(checkIn)) {
      validCheckOut = addDays(checkIn, 1);
    }
    setSearch(prev => ({ ...prev, checkIn, checkOut: validCheckOut }));
  };

  const updateGuests = (adults: number, children: number, roomsCount: number = 1) => {
    setSearch(prev => ({
      ...prev,
      adults: Math.max(1, adults),
      children: Math.max(0, children),
      roomsCount: Math.max(1, roomsCount),
    }));
  };

  // Pricing calculations
  const financials: BookingFinancials = useMemo(() => {
    const nights = calculateNightsBetween(search.checkIn, search.checkOut);
    const room = selectedRoom || ROOMS_DATA[0];
    const quantity = search.roomsCount;

    const roomSubtotal = room.directRate * nights * quantity;
    const rackSubtotal = room.rackRate * nights * quantity;
    const directSavings = Math.max(0, rackSubtotal - roomSubtotal);

    const mealPlanCharges = (selectedMealPlan?.priceDeltaPerNight || 0) * nights * search.adults * quantity;
    const extraBedCharges = extraBeds * (room.extraBedCharge || 800) * nights;

    const grossAmount = roomSubtotal + mealPlanCharges + extraBedCharges;
    
    // GST Hospitality: 12% under ₹7,500/night, 18% above ₹7,500/night
    const effectiveNightlyRate = (roomSubtotal / (nights * quantity));
    const taxRate = effectiveNightlyRate > 7500 ? 0.18 : 0.12;
    const taxAmount = Math.round(grossAmount * taxRate);
    const grandTotal = grossAmount + taxAmount;

    return {
      nights,
      roomSubtotal,
      extraBedCharges,
      mealPlanCharges,
      grossAmount,
      directSavings,
      taxRate,
      taxAmount,
      grandTotal,
    };
  }, [search, selectedRoom, selectedMealPlan, extraBeds]);

  const completeBooking = (method: PaymentMethod): BookingConfirmationData => {
    const activeRoom = selectedRoom || ROOMS_DATA[0];
    const refCode = `SBA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const txId = method === 'razorpay' ? `pay_demo_${Math.random().toString(36).substring(2, 12)}` : `offline_${Date.now()}`;

    const confirmation: BookingConfirmationData = {
      bookingReference: refCode,
      createdAt: new Date().toISOString(),
      guest: guestDetails,
      search,
      selectedRoom: activeRoom,
      selectedMealPlan,
      financials,
      paymentMethod: method,
      paymentStatus: method === 'pay_at_property' ? 'pay_at_checkin' : 'simulated_test',
      transactionId: txId,
      isDemoBooking: true,
    };

    setConfirmationData(confirmation);
    setPaymentState('success');

    // Keep a running log of website bookings for the owner dashboard preview
    try {
      const history: BookingConfirmationData[] = JSON.parse(localStorage.getItem('sba_booking_history') || '[]');
      localStorage.setItem('sba_booking_history', JSON.stringify([confirmation, ...history].slice(0, 20)));
    } catch (e) {
      // Ignore storage errors
    }
    return confirmation;
  };

  const resetBooking = () => {
    setPaymentState('idle');
    setPaymentErrorMsg(null);
    setConfirmationData(null);
    localStorage.removeItem('sba_confirmed_booking');
  };

  return (
    <BookingContext.Provider
      value={{
        search,
        setSearch,
        updateSearchDates,
        updateGuests,
        selectedRoom,
        setSelectedRoom,
        selectedMealPlan,
        setSelectedMealPlan,
        extraBeds,
        setExtraBeds,
        financials,
        guestDetails,
        setGuestDetails,
        paymentMethod,
        setPaymentMethod,
        paymentState,
        setPaymentState,
        paymentErrorMsg,
        setPaymentErrorMsg,
        confirmationData,
        setConfirmationData,
        completeBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
