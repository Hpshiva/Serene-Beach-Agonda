import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Bed, Maximize2, ShieldCheck, ArrowRight, Eye, Check } from 'lucide-react';
import { Room } from '../types';
import { useBooking } from '../context/BookingContext';

interface RoomCardProps {
  room: Room;
  compact?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, compact = false }) => {
  const navigate = useNavigate();
  const { setSelectedRoom, search } = useBooking();

  const handleBookNow = () => {
    setSelectedRoom(room);
    navigate(`/booking?step=guest&roomId=${room.id}&checkin=${search.checkIn}&checkout=${search.checkOut}&adults=${search.adults}&children=${search.children}`);
  };

  const savings = room.rackRate - room.directRate;

  return (
    <div className="bg-white border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#224840]/40 flex flex-col group">
      {/* Room Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFE6]">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85" />

        {/* View Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#0D2229]/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
            {room.view}
          </span>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs">
          <span className="font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#CBA135]" />
            Up to {room.maxOccupancy} Guests
          </span>
          <span className="font-medium flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-[#CBA135]" />
            {room.sizeSqFt} sq ft
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Cursive Room Subtitle */}
          <span className="font-script text-[#C86D51] text-2xl sm:text-3xl block leading-none mb-1">
            {room.category === 'sea_view' ? 'Direct Beachfront Haven' : room.category === 'family' ? 'Spacious Family Retreat' : 'Private Balcony Oasis'}
          </span>

          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="font-condensed font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0D2229] group-hover:text-[#224840] transition-colors">
              {room.name}
            </h3>
            {savings > 0 && (
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0D2229] bg-[#CBA135] px-2.5 py-1 rounded-full shadow-sm">
                Save ₹{savings.toLocaleString('en-IN')}/night
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#566B70] mb-4 line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#E8E2D5]/70 text-xs text-[#132328] mb-4">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#224840]" />
              <span className="truncate">{room.bedType}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#224840]" />
              <span>AC & Ensuite Bath</span>
            </div>
          </div>

          {/* Amenities Mini Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 bg-[#F3EFE6] text-[#224840] text-[11px] font-medium px-2.5 py-0.5 rounded-md"
              >
                <Check className="w-3 h-3 text-[#224840]" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-[#566B70] flex items-center gap-1.5">
              <span className="line-through">₹{room.rackRate.toLocaleString('en-IN')}</span>
              <span className="text-[#C86D51] font-semibold text-[10px]">Standard Rate</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#0D2229]">
                ₹{room.directRate.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#566B70]">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/rooms/${room.id}`}
              className="p-2.5 rounded-xl border border-[#E8E2D5] text-[#132328] hover:text-[#224840] hover:border-[#224840] transition-colors"
              title="View Room Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              onClick={handleBookNow}
              className="btn-primary py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <span>Book Direct</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CBA135]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
