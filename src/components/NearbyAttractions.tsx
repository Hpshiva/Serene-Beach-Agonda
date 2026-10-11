import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { ATTRACTIONS_DATA } from '../data/attractions';
import { Attraction } from '../types';
import { ExperienceCard } from './ExperienceCard';

export const NearbyAttractions: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Nature & Beaches', 'Sunset & Views', 'Heritage & Culture', 'Dining & Shacks'];

  const filteredAttractions = ATTRACTIONS_DATA.filter((attraction) => {
    if (activeCategory === 'All') return true;
    return attraction.category === activeCategory;
  });

  return (
    <section id="experiences" className="py-24 bg-[#0D2229] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#224840]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#CBA135]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-8 border-b border-white/10">
          <div>
            <span className="font-script text-[#CBA135] text-4xl sm:text-5xl md:text-6xl block mb-2">
              The Treasures of Canacona
            </span>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E8E2D5] mb-2">
              <Compass className="w-4 h-4 text-[#CBA135]" />
              Curated Destination Guide
            </div>
            <h2 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-white">
              Explore Around Agonda Beach
            </h2>
            <p className="text-sm sm:text-base text-[#A8B5B2] max-w-xl mt-3 leading-relaxed">
              From our doorstep onto protected turtle sands to hidden emerald lagoons and clifftop fortresses. Experience the untouched soul of South Goa.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#CBA135] text-[#0D2229] shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Premium Cinematic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredAttractions.map((place: Attraction) => (
            <ExperienceCard key={place.id} attraction={place} />
          ))}
        </div>

        {/* View All Experiences Banner */}
        <div className="text-center pt-4">
          <Link
            to="/experiences"
            className="btn-primary py-4 px-9 rounded-full text-xs uppercase tracking-widest font-black inline-flex items-center gap-2.5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>View Complete South Goa Itinerary & Insider Tips</span>
            <Compass className="w-4 h-4 text-[#CBA135]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
