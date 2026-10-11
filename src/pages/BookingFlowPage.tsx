import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Users,
  Bed,
  Check,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CreditCard,
  QrCode,
  Building2,
  Lock,
  Tag,
  Clock,
  Sparkles,
  RefreshCw,
  XCircle,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking, formatDate, addDays, calculateNightsBetween } from '../context/BookingContext';
import { ROOMS_DATA } from '../data/rooms';
import { Room, PaymentMethod } from '../types';
import { PROPERTY_DATA } from '../data/property';

export const BookingFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    search,
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
    completeBooking
  } = useBooking();

  // Multi-step progress (1: Dates, 2: Rooms, 3: Guest, 4: Payment)
  const initialStepParam = searchParams.get('step');
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (initialStepParam === 'guest') return 3;
    if (initialStepParam === 'rooms') return 2;
    if (initialStepParam === 'payment') return 4;
    return selectedRoom ? 2 : 1;
  });

  // Local form state for Step 1
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [adults, setAdults] = useState(search.adults);
  const [children, setChildren] = useState(search.children);
  const [roomsCount, setRoomsCount] = useState(search.roomsCount);
  const [dateError, setDateError] = useState<string | null>(null);

  // Validation errors for Step 3
  const [guestErrors, setGuestErrors] = useState<{ [key: string]: string }>({});

  // Payment modal state
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [isSimulatingProcessing, setIsSimulatingProcessing] = useState(false);

  // Read URL params if passed
  useEffect(() => {
    const pCheckIn = searchParams.get('checkin');
    const pCheckOut = searchParams.get('checkout');
    const pAdults = searchParams.get('adults');
    const pChildren = searchParams.get('children');
    const pRoomId = searchParams.get('roomId');

    if (pCheckIn && pCheckOut) {
      setCheckIn(pCheckIn);
      setCheckOut(pCheckOut);
      updateSearchDates(pCheckIn, pCheckOut);
    }
    if (pAdults) setAdults(Number(pAdults));
    if (pChildren) setChildren(Number(pChildren));

    if (pRoomId) {
      const found = ROOMS_DATA.find((r) => r.id === pRoomId);
      if (found) setSelectedRoom(found);
    }
  }, [searchParams]);

  // Handle Step 1 Save
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(checkOut) <= new Date(checkIn)) {
      setDateError('Check-out date must be after check-in date.');
      return;
    }
    setDateError(null);
    updateSearchDates(checkIn, checkOut);
    updateGuests(adults, children, roomsCount);
    setCurrentStep(2);
  };

  // Handle Step 2 Select Room
  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setCurrentStep(3);
  };

  // Validate Step 3 Guest Info
  const validateGuestDetails = () => {
    const errors: { [key: string]: string } = {};
    if (!guestDetails.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!guestDetails.email.trim() || !/\S+@\S+\.\S+/.test(guestDetails.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!guestDetails.phone.trim() || guestDetails.phone.length < 8) {
      errors.phone = 'Please provide a valid phone number (min 8 digits).';
    }
    setGuestErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateGuestDetails()) {
      setCurrentStep(4);
    }
  };

  // Launch simulated payment flow
  const handleProceedToPayment = () => {
    if (paymentMethod === 'pay_at_property') {
      const conf = completeBooking('pay_at_property');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      navigate('/booking/confirmation');
      return;
    }

    // Launch simulated Razorpay modal
    setShowRazorpayModal(true);
  };

  // Simulate Razorpay outcome
  const handleSimulateSuccess = () => {
    setIsSimulatingProcessing(true);
    setTimeout(() => {
      setIsSimulatingProcessing(false);
      setShowRazorpayModal(false);
      completeBooking('razorpay');
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      navigate('/booking/confirmation');
    }, 1500);
  };

  const handleSimulateFailure = () => {
    setIsSimulatingProcessing(true);
    setTimeout(() => {
      setIsSimulatingProcessing(false);
      setPaymentState('failed');
      setPaymentErrorMsg('Payment simulation rejected: Card declined or invalid test OTP.');
      setShowRazorpayModal(false);
    }, 1200);
  };

  const handleSimulateCancel = () => {
    setShowRazorpayModal(false);
    setPaymentState('cancelled');
    setPaymentErrorMsg('Transaction was cancelled by the guest. You can retry with another method.');
  };

  const stepsList = [
    { num: 1, label: 'Stay Dates' },
    { num: 2, label: 'Room Selection' },
    { num: 3, label: 'Guest Details' },
    { num: 4, label: 'Review & Pay' },
  ];

  return (
    <div className="w-full bg-[#FBF9F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stepper Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E8E2D5] -translate-y-1/2 z-0" />
            {stepsList.map((st) => {
              const isPast = currentStep > st.num;
              const isCurrent = currentStep === st.num;
              return (
                <div key={st.num} className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => {
                      if (st.num < currentStep) setCurrentStep(st.num);
                    }}
                    disabled={st.num > currentStep}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                      isPast
                        ? 'bg-[#224840] text-white shadow-sm'
                        : isCurrent
                        ? 'bg-[#0D2229] text-white ring-4 ring-[#224840]/20 shadow-md'
                        : 'bg-white text-[#A8B5B2] border border-[#E8E2D5]'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA135]" /> : st.num}
                  </button>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold mt-2 ${
                      isCurrent ? 'text-[#0D2229]' : 'text-[#566B70]'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: DATES & GUESTS */}
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#224840]">
                Step 1 of 4
              </span>
              <h2 className="font-condensed font-bold uppercase tracking-tight text-2xl sm:text-3xl text-[#0D2229] mt-1">
                Choose Stay Dates & Travelers
              </h2>
              <p className="text-xs sm:text-sm text-[#566B70] mt-1">
                Select your check-in and check-out dates to calculate live availability and direct booking discount rates.
              </p>
            </div>

            {dateError && (
              <div className="mb-6 text-xs text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{dateError}</span>
              </div>
            )}

            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#132328] block mb-1">
                    Check-in Date (12:00 PM) *
                  </label>
                  <input
                    type="date"
                    min={formatDate(new Date())}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (new Date(checkOut) <= new Date(e.target.value)) {
                        setCheckOut(addDays(e.target.value, 1));
                      }
                    }}
                    required
                    className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-3 text-sm text-[#132328] font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#132328] block mb-1">
                    Check-out Date (10:00 AM) *
                  </label>
                  <input
                    type="date"
                    min={addDays(checkIn, 1)}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-3 text-sm text-[#132328] font-medium"
                  />
                </div>
              </div>

              {/* Guests Setup */}
              <div className="grid grid-cols-3 gap-4 border-y border-[#E8E2D5] py-5">
                <div>
                  <label className="text-xs font-bold text-[#132328] block mb-1">Adults (Age 12+)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#132328] block mb-1">Children (0-11)</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>{n} Child{n > 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#132328] block mb-1">Rooms</label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>{n} Room{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-[#566B70]">
                  <strong>{calculateNightsBetween(checkIn, checkOut)} Nights</strong> stay duration
                </div>

                <button
                  type="submit"
                  className="btn-primary py-3 px-8 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>Continue to Room Selection</span>
                  <ArrowRight className="w-4 h-4 text-[#CBA135]" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: ROOM SELECTION */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#224840]">
                  Step 2 of 4
                </span>
                <h2 className="font-condensed font-bold uppercase tracking-tight text-3xl text-[#0D2229] mt-1">
                  Select Your Beachside Room
                </h2>
                <p className="text-xs sm:text-sm text-[#566B70] mt-1">
                  Showing available rooms for <strong>{financials.nights} nights</strong> ({search.checkIn} to {search.checkOut}).
                </p>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="btn-secondary px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 self-start"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Stay Dates</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {ROOMS_DATA.map((r) => {
                const isSelected = selectedRoom?.id === r.id;
                const savings = (r.rackRate - r.directRate) * financials.nights;
                return (
                  <div
                    key={r.id}
                    className={`bg-white border-2 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#224840] ring-4 ring-[#224840]/10 shadow-lg'
                        : 'border-[#E8E2D5] hover:border-[#224840]/40'
                    }`}
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFE6]">
                        <img src={r.images[0]} alt={r.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-[#0D2229]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                          {r.view}
                        </div>
                        <div className="absolute top-4 right-4 bg-[#C86D51] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          Save ₹{savings.toLocaleString('en-IN')} direct
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-condensed font-bold uppercase tracking-tight text-2xl text-[#0D2229]">{r.name}</h3>
                        </div>
                        <p className="text-xs text-[#566B70] mb-4">{r.description}</p>

                        <div className="flex items-center gap-4 text-xs text-[#132328] mb-4">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-[#224840]" /> Up to {r.maxOccupancy} Guests
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-[#224840]" /> {r.bedType}
                          </span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {r.amenities.slice(0, 3).map((a, i) => (
                            <span key={i} className="text-[11px] bg-[#F3EFE6] text-[#224840] px-2 py-0.5 rounded-md">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Select */}
                    <div className="p-6 pt-0 border-t border-[#E8E2D5] flex items-center justify-between gap-4 mt-auto">
                      <div>
                        <div className="text-[11px] text-[#566B70]">
                          <span className="line-through">₹{r.rackRate}</span> • Direct Rate
                        </div>
                        <div className="font-condensed font-black text-2xl text-[#0D2229]">
                          ₹{r.directRate.toLocaleString('en-IN')}{' '}
                          <span className="text-xs font-normal text-[#566B70]">/ night</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectRoom(r)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all ${
                          isSelected
                            ? 'bg-[#224840] text-white'
                            : 'btn-primary'
                        }`}
                      >
                        <span>{isSelected ? 'Room Selected' : 'Select This Room'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#CBA135]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: GUEST DETAILS FORM */}
        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Form */}
            <div className="lg:col-span-7 bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#224840]">
                  Step 3 of 4
                </span>
                <h2 className="font-condensed font-bold uppercase tracking-tight text-2xl sm:text-3xl text-[#0D2229] mt-1">
                  Primary Guest Information
                </h2>
                <p className="text-xs sm:text-sm text-[#566B70] mt-1">
                  Please provide your contact details for reservation voucher generation and WhatsApp arrival coordination.
                </p>
              </div>

              <form onSubmit={handleStep3Submit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#132328] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={guestDetails.fullName}
                    onChange={(e) => setGuestDetails({ ...guestDetails, fullName: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className={`w-full bg-[#FBF9F5] border rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840] ${
                      guestErrors.fullName ? 'border-red-500' : 'border-[#E8E2D5]'
                    }`}
                  />
                  {guestErrors.fullName && (
                    <span className="text-[11px] text-red-500 mt-1 block">{guestErrors.fullName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#132328] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                      placeholder="e.g. maya@example.com"
                      className={`w-full bg-[#FBF9F5] border rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840] ${
                        guestErrors.email ? 'border-red-500' : 'border-[#E8E2D5]'
                      }`}
                    />
                    {guestErrors.email && (
                      <span className="text-[11px] text-red-500 mt-1 block">{guestErrors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#132328] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full bg-[#FBF9F5] border rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840] ${
                        guestErrors.phone ? 'border-red-500' : 'border-[#E8E2D5]'
                      }`}
                    />
                    {guestErrors.phone && (
                      <span className="text-[11px] text-red-500 mt-1 block">{guestErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#132328] block mb-1">
                      City / Country
                    </label>
                    <input
                      type="text"
                      value={guestDetails.cityCountry || ''}
                      onChange={(e) => setGuestDetails({ ...guestDetails, cityCountry: e.target.value })}
                      placeholder="e.g. Bengaluru, India"
                      className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#132328] block mb-1">
                      Estimated Check-in Time
                    </label>
                    <select
                      value={guestDetails.estimatedArrivalTime || '14:00'}
                      onChange={(e) => setGuestDetails({ ...guestDetails, estimatedArrivalTime: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 text-xs text-[#132328]"
                    >
                      <option value="12:00">12:00 PM (Standard Check-in)</option>
                      <option value="14:00">2:00 PM - 4:00 PM</option>
                      <option value="18:00">6:00 PM - 8:00 PM (Evening)</option>
                      <option value="21:00">After 9:00 PM (Late Arrival)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#132328] block mb-1">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={guestDetails.specialRequests || ''}
                    onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                    placeholder="e.g. Need airport taxi pickup, quiet upper floor, extra pillows..."
                    className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2 text-xs text-[#132328] focus:outline-none focus:border-[#224840]"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-secondary px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Rooms</span>
                  </button>

                  <button
                    type="submit"
                    className="btn-primary px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <span>Proceed to Review & Pay</span>
                    <ArrowRight className="w-4 h-4 text-[#CBA135]" />
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5 bg-white border border-[#E8E2D5] rounded-3xl p-6 shadow-sm sticky top-28">
              <h3 className="font-condensed font-bold uppercase tracking-wide text-xl text-[#0D2229] mb-4">
                Booking Summary
              </h3>

              {selectedRoom && (
                <div className="mb-4 pb-4 border-b border-[#E8E2D5]">
                  <div className="font-bold text-sm text-[#0D2229]">{selectedRoom.name}</div>
                  <div className="text-xs text-[#566B70] mt-0.5">{selectedRoom.view}</div>
                  <div className="text-xs text-[#224840] font-semibold mt-1">
                    ₹{selectedRoom.directRate}/night × {financials.nights} nights
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs text-[#132328] mb-4">
                <div className="flex justify-between">
                  <span>Stay Dates</span>
                  <span className="font-semibold">{search.checkIn} to {search.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests</span>
                  <span className="font-semibold">{search.adults} Adults, {search.children} Children</span>
                </div>
                <div className="flex justify-between text-[#C86D51] font-semibold">
                  <span>Direct Savings</span>
                  <span>-₹{financials.directSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#566B70]">
                  <span>Hospitality GST</span>
                  <span>+₹{financials.taxAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E2D5] flex justify-between font-bold text-base text-[#0D2229]">
                <span>Total Amount</span>
                <span className="text-[#224840]">₹{financials.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & PAYMENT DEMONSTRATION */}
        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Payment Options */}
            <div className="lg:col-span-7 bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#224840]">
                  Step 4 of 4
                </span>
                <h2 className="font-condensed font-bold uppercase tracking-tight text-2xl sm:text-3xl text-[#0D2229] mt-1">
                  Payment Method & Final Review
                </h2>
                <p className="text-xs sm:text-sm text-[#566B70] mt-1">
                  Select your preferred demo payment route. All transactions in this demo are safely simulated.
                </p>
              </div>

              {/* Status Alert if previous attempt failed or cancelled */}
              {paymentState === 'failed' && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs flex items-start gap-3">
                  <XCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-bold">Payment Simulation Unsuccessful</div>
                    <div>{paymentErrorMsg || 'The simulated payment was declined.'}</div>
                  </div>
                </div>
              )}

              {paymentState === 'cancelled' && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Transaction Cancelled</div>
                    <div>{paymentErrorMsg || 'Payment session closed. You can retry below.'}</div>
                  </div>
                </div>
              )}

              {/* Payment Methods Selection */}
              <div className="space-y-3">
                <label
                  className={`flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-[#224840] bg-[#224840]/5'
                      : 'border-[#E8E2D5] hover:border-[#224840]/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="mt-1 text-[#224840] focus:ring-[#224840]"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#0D2229] flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#224840]" />
                        Razorpay Test Mode (Simulated Sandbox)
                      </div>
                      <div className="text-[11px] text-[#566B70] mt-0.5">
                        Interactive test modal simulating UPI, credit card, or netbanking checkout.
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#224840] bg-white border border-[#224840]/20 px-2 py-0.5 rounded">
                    Recommended
                  </span>
                </label>

                <label
                  className={`flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'pay_at_property'
                      ? 'border-[#224840] bg-[#224840]/5'
                      : 'border-[#E8E2D5] hover:border-[#224840]/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'pay_at_property'}
                      onChange={() => setPaymentMethod('pay_at_property')}
                      className="mt-1 text-[#224840] focus:ring-[#224840]"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#0D2229] flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#224840]" />
                        Pay at Property Upon Arrival
                      </div>
                      <div className="text-[11px] text-[#566B70] mt-0.5">
                        Guarantee your reservation direct; pay at the front desk upon check-in.
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Guest Reassurance Box */}
              <div className="bg-[#FBF9F5] border border-[#E8E2D5] rounded-2xl p-4 text-xs text-[#566B70] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#0D2229]">
                  <Lock className="w-3.5 h-3.5 text-[#224840]" />
                  <span>Demo Security Reassurance</span>
                </div>
                <p>
                  No real bank account or credit card will be charged. This is an end-to-end interactive simulation of the complete direct guest reservation pipeline.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn-secondary px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Guest Details</span>
                </button>

                <button
                  onClick={handleProceedToPayment}
                  className="btn-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>
                    {paymentMethod === 'pay_at_property'
                      ? 'Confirm Reservation Direct'
                      : 'Launch Razorpay Demo Modal'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#CBA135]" />
                </button>
              </div>
            </div>

            {/* Right Detailed Summary Voucher Preview */}
            <div className="lg:col-span-5 bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-condensed font-bold uppercase tracking-wide text-xl text-[#0D2229]">
                Reservation Overview
              </h3>

              {selectedRoom && (
                <div className="p-4 bg-[#FBF9F5] rounded-2xl border border-[#E8E2D5]">
                  <div className="font-bold text-sm text-[#0D2229]">{selectedRoom.name}</div>
                  <div className="text-xs text-[#566B70]">{selectedRoom.view}</div>
                  <div className="text-[11px] text-[#224840] font-semibold mt-1">
                    Meal Plan: {selectedMealPlan?.name || 'Room Only'}
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs text-[#132328]">
                <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60">
                  <span className="text-[#566B70]">Guest Name</span>
                  <span className="font-bold">{guestDetails.fullName || 'Guest'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60">
                  <span className="text-[#566B70]">Phone</span>
                  <span>{guestDetails.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60">
                  <span className="text-[#566B70]">Check-in</span>
                  <span>{search.checkIn} (12:00 PM)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60">
                  <span className="text-[#566B70]">Check-out</span>
                  <span>{search.checkOut} (10:00 AM)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60">
                  <span className="text-[#566B70]">Total Duration</span>
                  <span className="font-bold">{financials.nights} Nights</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60">
                  <span className="text-[#566B70]">Room Subtotal</span>
                  <span>₹{financials.roomSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {financials.mealPlanCharges > 0 && (
                  <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60">
                    <span className="text-[#566B70]">Meal Add-ons</span>
                    <span>+₹{financials.mealPlanCharges.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60 text-[#C86D51] font-semibold">
                  <span>Direct Savings</span>
                  <span>-₹{financials.directSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D5]/60 text-[#566B70]">
                  <span>Hospitality GST ({Math.round(financials.taxRate * 100)}%)</span>
                  <span>+₹{financials.taxAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between font-bold text-lg text-[#0D2229]">
                <span>Grand Total</span>
                <span className="text-[#224840]">₹{financials.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* RAZORPAY TEST SIMULATOR MODAL */}
        {showRazorpayModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E8E2D5] animate-scaleUp">
              {/* Modal Header mimicking Razorpay styling */}
              <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] tracking-widest uppercase font-bold text-[#5293E3]">
                    TEST PAYMENT SANDBOX
                  </div>
                  <div className="font-bold text-base mt-0.5">Serene Beach Agonda</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#A8B5B2]">Payable</div>
                  <div className="font-bold text-lg text-emerald-400">
                    ₹{financials.grandTotal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                <div className="bg-[#F8F9FA] border border-[#E8E2D5] rounded-2xl p-4 text-xs text-[#566B70]">
                  <div className="font-bold text-[#0D2229] mb-1">
                    Simulated Sandbox Mode
                  </div>
                  <p>
                    This modal demonstrates the payment gateway flow. Click below to test various transaction outcomes:
                  </p>
                </div>

                {isSimulatingProcessing ? (
                  <div className="py-8 text-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-[#224840] animate-spin mx-auto" />
                    <div className="text-xs font-bold text-[#0D2229]">Processing Demo Transaction...</div>
                    <div className="text-[11px] text-[#566B70]">Verifying simulated payment signature</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleSimulateSuccess}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simulate Payment Success (200 OK)</span>
                    </button>

                    <button
                      onClick={handleSimulateFailure}
                      className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Simulate Payment Failure / Decline</span>
                    </button>

                    <button
                      onClick={handleSimulateCancel}
                      className="w-full py-2 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-medium"
                    >
                      Cancel Transaction / Return to Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
