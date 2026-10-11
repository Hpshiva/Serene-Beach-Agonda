import React, { useState } from 'react';
import { Compass, Clock, Navigation, ExternalLink, Sparkles, ArrowUpRight, MapPin, X, MessageSquare, ShieldCheck, Calendar } from 'lucide-react';
import { Attraction } from '../types';
import { Link } from 'react-router-dom';
import { PROPERTY_DATA } from '../data/property';

interface ExperienceCardProps {
  attraction: Attraction;
  onSelect?: (attraction: Attraction) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ attraction, onSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
    if (onSelect) onSelect(attraction);
  };

  const whatsappConciergeUrl = `https://wa.me/${PROPERTY_DATA.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Serene Beach Agonda team! I am planning my trip and would love tips / assistance arranging transport for: ${attraction.name}.`
  )}`;

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#0A1A1F] border border-white/15 shadow-2xl transition-all duration-500 hover:border-[#CBA135] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(203,161,53,0.3)] flex flex-col justify-between p-6 sm:p-7 cursor-pointer"
      >
        {/* Full-bleed Cinematic Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={attraction.image}
            alt={attraction.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Multi-tier editorial gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091519] via-[#091519]/65 to-black/35 opacity-90 group-hover:opacity-85 transition-opacity" />
        </div>

        {/* Ambient Hover Accent Flare */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-t from-[#CBA135]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Card Top: Frosted Glass Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="bg-[#091519]/80 backdrop-blur-md text-[#E8E2D5] text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
            {attraction.category}
          </span>

          <span className="bg-gradient-to-r from-[#CBA135] to-[#DFB953] text-[#091519] text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <Navigation className="w-3 h-3 text-[#091519]" />
            {attraction.distanceKm < 1 ? 'Steps Away' : `${attraction.distanceKm} km`}
          </span>
        </div>

        {/* Card Bottom: Typographic Editorial Showcase */}
        <div className="relative z-10 space-y-3 pt-6">
          {/* WindSong Cursive Tagline */}
          {attraction.cursiveTag && (
            <span className="font-script text-[#DFB953] text-3xl sm:text-4xl block leading-none drop-shadow-md group-hover:text-[#F3D580] transition-colors">
              {attraction.cursiveTag}
            </span>
          )}

          {/* Architectural Headline */}
          <h3 className="font-condensed font-black uppercase tracking-tight text-2xl sm:text-3xl text-white group-hover:text-[#CBA135] transition-colors leading-[0.98]">
            {attraction.name}
          </h3>

          {/* Distance & Transit Meta Strip */}
          <div className="flex items-center gap-3 text-xs text-[#E8E2D5]/90 font-medium">
            <span className="flex items-center gap-1.5 text-[#CBA135]">
              <Compass className="w-3.5 h-3.5" />
              {attraction.distanceKm < 1 ? 'Directly on the beach' : `${attraction.distanceKm} km from Serene`}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#A8B5B2]" />
              {attraction.driveTimeMin} mins ({attraction.travelMode})
            </span>
          </div>

          {/* Descriptive Snippet */}
          <p className="text-xs sm:text-sm text-[#E8E2D5]/80 leading-relaxed line-clamp-2">
            {attraction.shortDesc}
          </p>

          {/* Timing Box & Interactive Action Buttons */}
          <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
            <div className="text-[11px] text-[#DFB953] flex items-center gap-1.5 truncate max-w-[170px] sm:max-w-[200px]">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#CBA135]" />
              <span className="truncate">{attraction.bestTimeToVisit.split(';')[0]}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleOpenModal}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#CBA135] text-white hover:text-[#091519] text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                Insider Guide
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#CBA135] text-white hover:text-[#091519] flex items-center justify-center transition-all duration-300 border border-white/20 shrink-0"
                title="View on Google Maps"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Destination Insider Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#0D2229] border border-[#CBA135]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl bg-[#091519]">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2229] via-transparent to-black/40" />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-[#CBA135] text-white hover:text-[#0D2229] flex items-center justify-center transition-all border border-white/20"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="font-script text-[#DFB953] text-3xl sm:text-4xl block leading-none mb-1">
                  {attraction.cursiveTag}
                </span>
                <h3 className="font-condensed font-black uppercase text-2xl sm:text-4xl text-white">
                  {attraction.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Quick Distance & Transit Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <div className="text-[10px] text-[#A8B5B2] uppercase font-bold tracking-wider mb-1">Distance</div>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#CBA135]" />
                    {attraction.distanceKm < 1 ? 'Doorstep / 0.1 km' : `${attraction.distanceKm} km`}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <div className="text-[10px] text-[#A8B5B2] uppercase font-bold tracking-wider mb-1">Travel Time</div>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#CBA135]" />
                    {attraction.driveTimeMin} mins ({attraction.travelMode})
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-[#A8B5B2] uppercase font-bold tracking-wider mb-1">Experience Type</div>
                  <div className="text-sm font-black text-[#CBA135] truncate">
                    {attraction.category}
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#A8B5B2] mb-2">About This Destination</h4>
                <p className="text-sm sm:text-base text-[#E8E2D5] leading-relaxed">
                  {attraction.fullDesc}
                </p>
              </div>

              {/* Host Timing Secret */}
              <div className="border border-[#CBA135]/40 bg-[#CBA135]/10 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-[#CBA135] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-[#DFB953] mb-1">
                    Host Insider Tip & Best Hours
                  </div>
                  <div className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                    {attraction.bestTimeToVisit}
                  </div>
                </div>
              </div>

              {/* Direct Booking & Concierge Actions */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 border border-white/20 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#CBA135]" />
                  <span>Open Navigation GPS</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={whatsappConciergeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Arrange via WhatsApp</span>
                  </a>

                  <Link
                    to="/booking"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 sm:flex-initial btn-coral px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Stay Here</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
