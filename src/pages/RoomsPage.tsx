import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Tag, Users, Bed, Eye, ArrowRight } from 'lucide-react';
import { ROOMS_DATA } from '../data/rooms';
import { RoomCard } from '../components/RoomCard';
import { BookingWidget } from '../components/BookingWidget';
import { Link } from 'react-router-dom';

export const RoomsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'sea_view' | 'balcony' | 'family'>('all');

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filter === 'all') return true;
    return room.category === filter;
  });

  return (
    <div className="w-full bg-[#FBF9F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-script text-[#C86D51] text-3xl sm:text-5xl block mb-1">
            Peaceful Beach Living
          </span>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#CBA135]" />
            Accommodations & Suites
          </div>
          <h1 className="font-condensed font-black uppercase tracking-tight text-4xl sm:text-6xl text-[#0D2229] mb-4">
            Rooms & Beachfront Sanctuaries
          </h1>
          <p className="text-base text-[#566B70] leading-relaxed">
            Every room at Serene Beach Agonda is designed for pure rest. Enjoy whisper-quiet air conditioning, ensuite modern bathrooms with 24-hr hot water, artisanal cane details, and private outdoor verandas opening toward swaying palms or the ocean.
          </p>
        </div>

        {/* Floating Quick Availability Bar */}
        <div className="mb-12">
          <BookingWidget compact />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E2D5] pb-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Accommodations (4)", value: "all" },
              { label: "Direct Sea View (2)", value: "sea_view" },
              { label: "Private Balcony (1)", value: "balcony" },
              { label: "Family Suites (2)", value: "family" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  filter === tab.value
                    ? 'bg-[#224840] text-white shadow-sm'
                    : 'bg-white text-[#132328] border border-[#E8E2D5] hover:border-[#224840]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-medium text-[#224840] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#CBA135]" />
            <span>Direct rate guarantee active on all rooms</span>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Direct Booking FAQ Strip */}
        <div className="bg-white border border-[#E8E2D5] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C86D51] bg-[#C86D51]/10 px-3 py-1 rounded-full">
              Transparent Booking Guarantee
            </span>
            <h3 className="font-condensed font-bold uppercase tracking-tight text-2xl sm:text-3xl text-[#0D2229] mt-3 mb-2">
              Why Our Direct Price is Always Best
            </h3>
            <p className="text-sm text-[#566B70] max-w-xl leading-relaxed">
              When you book through big online travel agents, hotels pay 15% to 20% in commissions. By booking directly with us on this official website, we pass those savings directly to you with ₹500 off every single night.
            </p>
          </div>

          <Link
            to="/booking"
            className="btn-primary px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>Proceed to Reservation</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#CBA135]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
