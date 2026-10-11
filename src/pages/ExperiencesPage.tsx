import React, { useState } from 'react';
import { Compass, Calendar, ShieldCheck, Sparkles, MessageSquare, Anchor, Bike } from 'lucide-react';
import { ATTRACTIONS_DATA } from '../data/attractions';
import { Link } from 'react-router-dom';
import { ExperienceCard } from '../components/ExperienceCard';
import { PROPERTY_DATA } from '../data/property';

export const ExperiencesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Nature & Beaches', 'Sunset & Views', 'Heritage & Culture', 'Dining & Shacks'];

  const filteredAttractions = ATTRACTIONS_DATA.filter((attraction) => {
    if (activeCategory === 'All') return true;
    return attraction.category === activeCategory;
  });

  const whatsappConciergeUrl = `https://wa.me/${PROPERTY_DATA.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi Serene Beach Agonda! I am planning my trip and would like to arrange scooter rental / local boat tours.'
  )}`;

  return (
    <div className="w-full bg-[#0D2229] min-h-screen text-white relative overflow-hidden py-12 sm:py-20">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#224840]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-[#CBA135]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-script text-[#DFB953] text-4xl sm:text-6xl block mb-2 drop-shadow">
            Coastal Wonders of South Goa
          </span>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#A8B5B2] mb-3">
            <Compass className="w-4 h-4 text-[#CBA135]" />
            Curated Destination Portfolio
          </div>
          <h1 className="font-condensed font-black uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl text-white mb-4 leading-[0.95]">
            Nearby Experiences & Excursions
          </h1>
          <p className="text-sm sm:text-base text-[#E8E2D5]/80 leading-relaxed max-w-2xl">
            Agonda is the crown jewel of South Goa’s serene coastline. Explore secret emerald lagoons, 18th-century clifftop bastions, wild dolphin coves, and quiet beachside seafood shacks — all within minutes of Serene Beach Agonda.
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-white/10">
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

          <div className="text-xs text-[#A8B5B2] font-medium hidden sm:block">
            Showing <span className="text-[#DFB953] font-bold">{filteredAttractions.length}</span> Handpicked Highlights
          </div>
        </div>

        {/* 3-Column Ultra-Premium Cinematic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredAttractions.map((item) => (
            <ExperienceCard key={item.id} attraction={item} />
          ))}
        </div>

        {/* Concierge & Local Transport Services Banner */}
        <div className="bg-[#132833] border border-white/15 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA135]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-script text-[#DFB953] text-3xl sm:text-4xl block leading-none">
                Seamless Local Travel
              </span>
              <h2 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-4xl text-white">
                Scooter Rentals & Private Boat Concierge
              </h2>
              <p className="text-sm sm:text-base text-[#E8E2D5]/80 leading-relaxed max-w-2xl">
                Don’t worry about hailing taxis or haggling rates. Serene Beach Agonda arranges reliable Honda Activa scooters delivered right to our entrance, along with licensed local boatmen for morning dolphin watching at Butterfly Beach.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-[#A8B5B2]">
                <span className="flex items-center gap-1.5 text-white">
                  <Bike className="w-4 h-4 text-[#CBA135]" />
                  Scooters: ₹400–₹500 / day
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-white">
                  <Anchor className="w-4 h-4 text-[#CBA135]" />
                  Dolphin Boats: Arranged at Beach Front
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-[#CBA135]" />
                  Zero Commission Concierge
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={whatsappConciergeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with WhatsApp Concierge</span>
              </a>

              <Link
                to="/booking"
                className="w-full btn-coral px-6 py-4 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Direct & Save ₹500/night</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Responsible Eco-Exploration Guidelines */}
        <div className="border border-white/10 bg-white/5 rounded-3xl p-6 sm:p-10 text-xs sm:text-sm text-[#A8B5B2] leading-relaxed max-w-4xl mx-auto space-y-3">
          <div className="font-condensed font-black uppercase tracking-wider text-sm sm:text-base text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#CBA135]" />
            Official Olive Ridley Sanctuary Guidelines
          </div>
          <p>
            Agonda Beach is recognized as an official nesting habitat for vulnerable Olive Ridley turtles. Motorized jet skis, loud speakers, and beach driving are strictly prohibited. We urge all our guests to keep our coastline pristine, switch off flashlights when walking past marked nesting pits after dark, and preserve the tranquil sanctuary atmosphere.
          </p>
        </div>

      </div>
    </div>
  );
};
