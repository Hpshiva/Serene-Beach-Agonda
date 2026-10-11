import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Award, Compass, ArrowDownRight, Sparkles } from 'lucide-react';
import { BookingWidget } from './BookingWidget';
import { PROPERTY_DATA } from '../data/property';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F3EFE6]/60 via-[#FBF9F5] to-[#FBF9F5]">
      {/* Background Subtle Coastal Shapes */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#224840]/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#C86D51]/5 rounded-full blur-3xl pointer-events-none -ml-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges & Ratings Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-[#E8E2D5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0D2229] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-[#224840]" />
            <span>Direct Beachfront • Agonda, South Goa</span>
          </div>

          {/* Social Proof / Verified Scores */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-white/90 border border-[#E8E2D5] px-3 py-1 rounded-full shadow-sm">
              <span className="font-bold text-[#224840]">8.4/10</span>
              <span className="text-[#566B70]">Excellent on Agoda</span>
              <span className="text-[10px] text-[#A8B5B2]">({PROPERTY_DATA.ratings.agoda.reviewsCount})</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 bg-white/90 border border-[#E8E2D5] px-3 py-1 rounded-full shadow-sm">
              <span className="font-bold text-[#224840]">8.3/10</span>
              <span className="text-[#566B70]">Booking.com</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 bg-white/90 border border-[#E8E2D5] px-3 py-1 rounded-full shadow-sm text-[#CBA135]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-[#0D2229]">4.6★</span>
              <span className="text-[#566B70]">Google (339+ Ref)</span>
            </div>
          </div>
        </div>

        {/* Editorial Headline & Story Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 lg:mb-14">
          <div className="lg:col-span-8">
            <div className="font-script text-3xl sm:text-4xl text-[#C86D51] mb-1 select-none">
              Pure South Goan Serenity
            </div>
            <h1 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#0D2229] leading-[1.02] mb-5">
              WHERE THE ARABIAN SEA MEETS <br />
              <span className="font-script normal-case text-4xl sm:text-6xl lg:text-7xl font-normal text-[#224840] tracking-normal block mt-1">
                barefoot luxury on the sand.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#566B70] max-w-2xl leading-relaxed">
              Step directly from your air-conditioned wooden cottage onto the warm golden sands of Agonda Beach.
              Experience genuine coastal Goan hospitality, private sea-facing verandas, and peaceful sunsets far from noisy commercial hubs.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/booking"
                className="btn-primary px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all"
              >
                <span>Check Availability & Book Direct</span>
                <ArrowDownRight className="w-4 h-4 text-[#CBA135]" />
              </Link>
              <Link
                to="/rooms"
                className="btn-secondary px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#224840] hover:text-white transition-all"
              >
                <span>Explore 4 Room Categories</span>
              </Link>
            </div>
          </div>

          {/* Right Editorial Visual Card with Real Google Maps Photo */}
          <div className="lg:col-span-4 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group bg-[#E8E2D5]">
              <img
                src="https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678611/1678611147/serene-beach-agonda-canacona-pic-1.JPEG"
                alt="Authentic beachfront cottages at Serene Beach Agonda on Google Maps"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2229]/85 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                  Google Maps Verified Photo
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-block bg-[#C86D51] text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1">
                  Beachfront Sanctuary
                </span>
                <div className="font-condensed text-2xl font-bold uppercase tracking-wide">
                  Beachside Cottages & Balconies
                </div>
                <div className="text-xs text-[#E8E2D5] flex items-center justify-between mt-1">
                  <span>Direct on Agonda Beach</span>
                  <span className="text-[#CBA135] font-bold">Save ₹500/night direct</span>
                </div>
              </div>
            </div>

            {/* Small Floating Accent Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-[#E8E2D5] rounded-2xl p-3.5 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#224840]/10 flex items-center justify-center text-[#224840]">
                <Sparkles className="w-5 h-5 text-[#CBA135]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0D2229]">Zero Booking Fees</div>
                <div className="text-[10px] text-[#566B70]">No middleman OTA commission</div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Sticky / Prominent Booking Search Widget */}
        <div className="w-full">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
};
