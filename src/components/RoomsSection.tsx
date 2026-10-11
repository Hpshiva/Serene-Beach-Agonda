import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ROOMS_DATA } from '../data/rooms';
import { RoomCard } from './RoomCard';

export const RoomsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'sea_view' | 'balcony' | 'family'>('all');

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filter === 'all') return true;
    return room.category === filter;
  });

  return (
    <section id="rooms" className="py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-script text-3xl sm:text-4xl text-[#C86D51] mb-0.5">
              Authentic Goan Cottages & Suites
            </div>
            <h2 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0D2229]">
              Rooms & Beachfront Sanctuaries
            </h2>
            <p className="text-sm sm:text-base text-[#566B70] max-w-xl mt-2 font-medium">
              Four distinct air-conditioned room categories crafted for tranquility, sea breezes, and direct sand access. Genuine property photography and live verified rates.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Rooms", value: "all" },
              { label: "Sea View", value: "sea_view" },
              { label: "With Balcony", value: "balcony" },
              { label: "Family Suites", value: "family" },
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
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Bottom Room Reassurance Banner */}
        <div className="bg-[#0D2229] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-condensed font-bold uppercase tracking-tight text-2xl mb-1.5">
              Looking for a custom group booking or extended stay?
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B5B2] max-w-lg">
              We offer personalized rates for multi-room family stays, yoga retreats, and remote work sabbaticals in Agonda.
            </p>
          </div>

          <Link
            to="/rooms"
            className="btn-coral px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>Compare All 4 Rooms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
