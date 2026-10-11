import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useBooking, formatDate, addDays, calculateNightsBetween } from '../context/BookingContext';

interface BookingWidgetProps {
  className?: string;
  compact?: boolean;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ className = "", compact = false }) => {
  const navigate = useNavigate();
  const { search, updateSearchDates, updateGuests } = useBooking();

  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [adults, setAdults] = useState(search.adults);
  const [children, setChildren] = useState(search.children);
  const [roomsCount, setRoomsCount] = useState(search.roomsCount);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);

  const nights = calculateNightsBetween(checkIn, checkOut);
  const todayStr = formatDate(new Date());

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCheckIn(val);
    setDateError(null);
    if (new Date(checkOut) <= new Date(val)) {
      const newOut = addDays(val, 2);
      setCheckOut(newOut);
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (new Date(val) <= new Date(checkIn)) {
      setDateError("Check-out date must be after check-in.");
      return;
    }
    setDateError(null);
    setCheckOut(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(checkOut) <= new Date(checkIn)) {
      setDateError("Please select a valid date range where check-out follows check-in.");
      return;
    }
    updateSearchDates(checkIn, checkOut);
    updateGuests(adults, children, roomsCount);
    navigate(`/booking?step=rooms&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}&rooms=${roomsCount}`);
  };

  return (
    <div
      className={`glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-[#E8E2D5] ${className}`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Top Direct Booking Perk Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E2D5]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#224840]/10 text-[#224840] text-xs font-semibold px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#224840]" />
              Direct Booking Engine
            </span>
            <span className="text-xs text-[#566B70]">
              {nights} {nights === 1 ? 'Night' : 'Nights'} Selected
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-[#C86D51]">
            <Tag className="w-3.5 h-3.5" />
            <span>Save up to ₹500/night directly</span>
          </div>
        </div>

        {dateError && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
            {dateError}
          </div>
        )}

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
          {/* Check-In */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#566B70] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#224840]" />
              Check-in Date
            </label>
            <div className="relative">
              <input
                type="date"
                min={todayStr}
                value={checkIn}
                onChange={handleCheckInChange}
                required
                className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#132328] focus:outline-none focus:ring-2 focus:ring-[#224840]/30 focus:border-[#224840]"
              />
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#566B70] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#224840]" />
              Check-out Date
            </label>
            <div className="relative">
              <input
                type="date"
                min={addDays(checkIn, 1)}
                value={checkOut}
                onChange={handleCheckOutChange}
                required
                className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#132328] focus:outline-none focus:ring-2 focus:ring-[#224840]/30 focus:border-[#224840]"
              />
            </div>
          </div>

          {/* Guests & Rooms Dropdown */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#566B70] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#224840]" />
              Guests & Rooms
            </label>
            <button
              type="button"
              onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
              className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#132328] text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#224840]/30 focus:border-[#224840]"
            >
              <span>
                {adults} {adults === 1 ? 'Adult' : 'Adults'}
                {children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''} • {roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}
              </span>
              <span className="text-xs text-[#566B70]">Edit</span>
            </button>

            {guestDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white border border-[#E8E2D5] rounded-2xl p-4 shadow-xl flex flex-col gap-3">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#132328]">Adults</div>
                    <div className="text-[10px] text-[#566B70]">Age 12+</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 rounded-full border border-[#E8E2D5] flex items-center justify-center text-sm font-bold text-[#132328] hover:bg-[#F3EFE6]"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-5 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.min(6, adults + 1))}
                      className="w-7 h-7 rounded-full border border-[#E8E2D5] flex items-center justify-center text-sm font-bold text-[#132328] hover:bg-[#F3EFE6]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between border-t border-[#E8E2D5] pt-2.5">
                  <div>
                    <div className="text-xs font-bold text-[#132328]">Children</div>
                    <div className="text-[10px] text-[#566B70]">Age 0 - 11</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-7 h-7 rounded-full border border-[#E8E2D5] flex items-center justify-center text-sm font-bold text-[#132328] hover:bg-[#F3EFE6]"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-5 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(Math.min(4, children + 1))}
                      className="w-7 h-7 rounded-full border border-[#E8E2D5] flex items-center justify-center text-sm font-bold text-[#132328] hover:bg-[#F3EFE6]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between border-t border-[#E8E2D5] pt-2.5">
                  <div>
                    <div className="text-xs font-bold text-[#132328]">Rooms</div>
                    <div className="text-[10px] text-[#566B70]">Accommodation count</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                      className="w-7 h-7 rounded-full border border-[#E8E2D5] flex items-center justify-center text-sm font-bold text-[#132328] hover:bg-[#F3EFE6]"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-5 text-center">{roomsCount}</span>
                    <button
                      type="button"
                      onClick={() => setRoomsCount(Math.min(4, roomsCount + 1))}
                      className="w-7 h-7 rounded-full border border-[#E8E2D5] flex items-center justify-center text-sm font-bold text-[#132328] hover:bg-[#F3EFE6]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestDropdownOpen(false)}
                  className="w-full mt-1 py-1.5 bg-[#224840] text-white rounded-lg text-xs font-semibold hover:bg-[#0D2229]"
                >
                  Apply Guests
                </button>
              </div>
            )}
          </div>

          {/* Submit Search CTA */}
          <div>
            <button
              type="submit"
              className="btn-primary w-full py-3 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Check Availability</span>
              <ArrowRight className="w-4 h-4 text-[#CBA135]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
