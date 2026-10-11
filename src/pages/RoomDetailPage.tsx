import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Bed,
  Maximize2,
  Check,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Sparkles,
  Coffee,
  Clock,
  Waves,
  Tag,
  ChevronLeft
} from 'lucide-react';
import { ROOMS_DATA } from '../data/rooms';
import { useBooking, formatDate, addDays, calculateNightsBetween } from '../context/BookingContext';
import { RoomCard } from '../components/RoomCard';
import { PROPERTY_DATA } from '../data/property';

export const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { search, updateSearchDates, setSelectedRoom } = useBooking();

  const room = ROOMS_DATA.find((r) => r.id === id) || ROOMS_DATA[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedMealPlanId, setSelectedMealPlanId] = useState(room.mealPlans[0].id);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);

  // Sync route param change
  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedMealPlanId(room.mealPlans[0].id);
  }, [id, room]);

  const nights = calculateNightsBetween(checkIn, checkOut);
  const selectedMealPlan = room.mealPlans.find((m) => m.id === selectedMealPlanId) || room.mealPlans[0];

  const roomSubtotal = room.directRate * nights;
  const rackSubtotal = room.rackRate * nights;
  const savings = rackSubtotal - roomSubtotal;
  const mealPlanCharges = selectedMealPlan.priceDeltaPerNight * nights * search.adults;
  const grossAmount = roomSubtotal + mealPlanCharges;
  const taxRate = room.directRate > 7500 ? 0.18 : 0.12;
  const taxAmount = Math.round(grossAmount * taxRate);
  const grandTotal = grossAmount + taxAmount;

  const handleBookThisRoom = () => {
    updateSearchDates(checkIn, checkOut);
    setSelectedRoom(room);
    navigate(`/booking?step=guest&roomId=${room.id}&checkin=${checkIn}&checkout=${checkOut}&mealPlan=${selectedMealPlanId}`);
  };

  const relatedRooms = ROOMS_DATA.filter((r) => r.id !== room.id).slice(0, 2);

  return (
    <div className="w-full bg-[#FBF9F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#566B70] hover:text-[#224840] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Accommodations</span>
          </Link>
        </div>

        {/* Room Header Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-script text-[#C86D51] text-3xl sm:text-4xl block mb-1">
              Agonda Coastal Haven
            </span>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              {room.view}
            </div>
            <h1 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl text-[#0D2229]">
              {room.name}
            </h1>
            <p className="text-sm sm:text-base text-[#566B70] mt-1.5 max-w-2xl">
              {room.tagline}
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-[#566B70] flex items-center justify-end gap-1.5">
              <span className="line-through">₹{room.rackRate.toLocaleString('en-IN')}</span>
              <span className="text-[#C86D51] font-bold">Save ₹500/night direct</span>
            </div>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-3xl font-bold text-[#0D2229]">
                ₹{room.directRate.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#566B70]">/ night</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12">
          {/* Main Large Photo */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden aspect-[16/10] bg-[#E8E2D5] shadow-lg relative">
            <img
              src={room.images[activeImageIdx] || room.images[0]}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#0D2229]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                Official Photo Asset • Serene Beach Agonda
              </span>
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative rounded-2xl overflow-hidden aspect-[16/10] flex-1 border-2 transition-all ${
                  activeImageIdx === idx
                    ? 'border-[#224840] shadow-md scale-[1.02]'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${room.name} preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content & Sticky Booking Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Details Column */}
          <div className="lg:col-span-7 space-y-10">
            {/* Quick Specs Strip */}
            <div className="bg-white border border-[#E8E2D5] rounded-3xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-sm">
              <div className="border-r border-[#E8E2D5]/70 pr-2">
                <div className="text-[11px] uppercase tracking-wider text-[#566B70] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#224840]" />
                  Capacity
                </div>
                <div className="text-sm font-bold text-[#0D2229] mt-1">
                  Up to {room.maxOccupancy} Guests
                </div>
              </div>

              <div className="border-r border-[#E8E2D5]/70 pr-2">
                <div className="text-[11px] uppercase tracking-wider text-[#566B70] flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#224840]" />
                  Bed Type
                </div>
                <div className="text-sm font-bold text-[#0D2229] mt-1 truncate">
                  {room.bedType}
                </div>
              </div>

              <div className="border-r border-[#E8E2D5]/70 pr-2">
                <div className="text-[11px] uppercase tracking-wider text-[#566B70] flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#224840]" />
                  Room Size
                </div>
                <div className="text-sm font-bold text-[#0D2229] mt-1">
                  {room.sizeSqFt} sq ft
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#566B70] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#224840]" />
                  Check-in
                </div>
                <div className="text-sm font-bold text-[#0D2229] mt-1">
                  12:00 PM
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-condensed font-bold uppercase tracking-wide text-2xl text-[#0D2229] mb-4">
                About This Room
              </h2>
              <div className="text-sm sm:text-base text-[#566B70] leading-relaxed space-y-3">
                <p>{room.longDescription}</p>
                <p>
                  Located just steps from the quiet central shores of Agonda, our guests enjoy clean sea breezes, fresh coastal drinking water, daily housekeeping, and attentive assistance from our local Goan team.
                </p>
              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <h2 className="font-condensed font-bold uppercase tracking-wide text-2xl text-[#0D2229] mb-4">
                Included Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white border border-[#E8E2D5] rounded-xl p-3 text-xs sm:text-sm font-medium text-[#132328]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#224840]/10 text-[#224840] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellation & Policies */}
            <div className="bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-condensed font-bold uppercase tracking-wide text-xl text-[#0D2229] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#224840]" />
                Direct Reservation & Cancellation Terms
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#566B70]">
                <li className="flex items-start gap-2">
                  <span className="text-[#224840] font-bold">•</span>
                  <span><strong>Free Cancellation:</strong> Modify or cancel your reservation up to 7 days before your arrival date at zero cost.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#224840] font-bold">•</span>
                  <span><strong>50% Refund:</strong> Cancellations made between 7 days and 48 hours receive a 50% refund.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#224840] font-bold">•</span>
                  <span><strong>Check-in & Check-out:</strong> Check-in is at 12:00 PM; check-out is at 10:00 AM. Early arrivals or late check-outs subject to availability.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Sticky Direct Booking Widget */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white border-2 border-[#224840]/20 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#224840]">
                    Direct Reservation Widget
                  </div>
                  <div className="font-condensed font-black text-3xl text-[#0D2229]">
                    ₹{room.directRate.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-[#566B70]">/ night</span>
                  </div>
                </div>

                <span className="bg-[#C86D51] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Save ₹{savings > 0 ? savings : 500}/night
                </span>
              </div>

              {/* Date Pickers */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#566B70] block mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3 py-2 text-xs font-semibold text-[#132328]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#566B70] block mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3 py-2 text-xs font-semibold text-[#132328]"
                    />
                  </div>
                </div>

                {/* Meal Plan Options */}
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#566B70] block mb-2">
                    Select Meal Plan
                  </label>
                  <div className="space-y-2">
                    {room.mealPlans.map((plan) => (
                      <label
                        key={plan.id}
                        className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedMealPlanId === plan.id
                            ? 'border-[#224840] bg-[#224840]/5'
                            : 'border-[#E8E2D5] bg-[#FBF9F5] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="radio"
                            name="mealPlan"
                            checked={selectedMealPlanId === plan.id}
                            onChange={() => setSelectedMealPlanId(plan.id)}
                            className="mt-0.5 text-[#224840] focus:ring-[#224840]"
                          />
                          <div>
                            <div className="text-xs font-bold text-[#0D2229]">{plan.name}</div>
                            <div className="text-[10px] text-[#566B70]">{plan.description}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#0D2229]">
                          {plan.priceDeltaPerNight === 0
                            ? 'Included'
                            : `+₹${plan.priceDeltaPerNight}/nt`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Breakdown Calculation */}
              <div className="bg-[#FBF9F5] rounded-2xl p-4 border border-[#E8E2D5] space-y-2.5 text-xs text-[#132328] mb-6">
                <div className="flex justify-between">
                  <span>
                    ₹{room.directRate} × {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                  <span className="font-semibold">₹{roomSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {mealPlanCharges > 0 && (
                  <div className="flex justify-between">
                    <span>Breakfast ({nights} nights × {search.adults} adults)</span>
                    <span className="font-semibold">+₹{mealPlanCharges.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#C86D51] font-semibold">
                  <span>Direct Booking Discount</span>
                  <span>-₹{savings.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#566B70]">
                  <span>Hospitality GST ({Math.round(taxRate * 100)}%)</span>
                  <span>+₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-t border-[#E8E2D5] pt-2.5 flex justify-between text-sm font-bold text-[#0D2229]">
                  <span>Total Payable</span>
                  <span className="text-base text-[#224840]">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Book Direct CTA */}
              <button
                onClick={handleBookThisRoom}
                className="btn-primary w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Reserve This Room Directly</span>
                <ArrowRight className="w-4 h-4 text-[#CBA135]" />
              </button>

              <div className="text-center text-[11px] text-[#566B70] mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#224840]" />
                <span>Simulated demo checkout • No live card charge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Rooms Recommendations */}
        <div className="pt-12 border-t border-[#E8E2D5]">
          <h2 className="font-condensed font-black uppercase tracking-tight text-2xl sm:text-4xl text-[#0D2229] mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedRooms.map((relRoom) => (
              <RoomCard key={relRoom.id} room={relRoom} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
