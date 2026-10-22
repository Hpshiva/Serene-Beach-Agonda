import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, BadgePercent } from 'lucide-react';
import { BookingWidget } from './BookingWidget';
import { PROPERTY_DATA } from '../data/property';
import { ROOMS_DATA } from '../data/rooms';

const HERO_IMAGE =
  "https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678611/1678611147/serene-beach-agonda-canacona-pic-1.JPEG";

const LOWEST_DIRECT_RATE = Math.min(...ROOMS_DATA.map(r => r.directRate));

export const Hero: React.FC = () => {
  const { agoda, bookingCom, googleReference } = PROPERTY_DATA.ratings;

  return (
    <section className="relative w-full bg-[#FBF9F5]">
      {/* Full-bleed property photo */}
      <div className="relative min-h-[78svh] lg:min-h-[86vh] flex items-end overflow-hidden bg-[#0D2229]">
        <img
          src={HERO_IMAGE}
          alt="Thatched entrance and palm garden at Serene Beach Agonda"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%] animate-hero-zoom"
          fetchPriority="high"
        />
        {/* Readability gradients: bottom on mobile, left on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2229] via-[#0D2229]/70 to-[#0D2229]/45 lg:via-[#0D2229]/40 lg:to-[#0D2229]/10" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#0D2229]/85 via-[#0D2229]/35 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pb-32 lg:pb-40">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5">
              <MapPin className="w-3.5 h-3.5 text-[#DFB953]" />
              <span>Agonda Beach • South Goa</span>
            </div>

            <span className="font-script text-[#DFB953] text-3xl sm:text-5xl block leading-tight mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Pure South Goan serenity
            </span>
            <h1 className="font-condensed text-[2.6rem] sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-5">
              Wake up steps from Agonda Beach
            </h1>
            <p className="text-base sm:text-lg text-[#E8E2D5] max-w-xl leading-relaxed">
              Sea-view and balcony rooms on one of Goa's quietest, cleanest beaches. Book direct for our best rate.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-7">
              <Link
                to="/booking"
                className="px-7 py-3.5 rounded-full bg-[#CBA135] hover:bg-[#DFB953] text-[#071216] text-xs font-black uppercase tracking-wider inline-flex items-center gap-2.5 shadow-lg transition-colors"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/rooms"
                className="px-6 py-3.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md hover:bg-white hover:text-[#0D2229] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                View Rooms • from ₹{LOWEST_DIRECT_RATE.toLocaleString('en-IN')}
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 text-xs text-[#E8E2D5]">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#DFB953] fill-current" />
                <strong className="text-white">{googleReference.score}</strong> Google ({googleReference.reviewsCount})
              </span>
              <span>
                <strong className="text-white">{agoda.score}/10</strong> Agoda ({agoda.reviewsCount})
              </span>
              <span>
                <strong className="text-white">{bookingCom.score}/10</strong> Booking.com ({bookingCom.reviewsCount})
              </span>
            </div>
          </div>
        </div>

        {/* Direct-rate badge (desktop) */}
        <div className="hidden lg:flex absolute right-8 bottom-44 z-10 items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">
          <div className="w-11 h-11 rounded-xl bg-[#224840] flex items-center justify-center">
            <BadgePercent className="w-5 h-5 text-[#DFB953]" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#0D2229]">Save ₹500 / night</div>
            <div className="text-[11px] text-[#566B70]">vs. booking apps, no middleman fees</div>
          </div>
        </div>
      </div>

      {/* Booking widget overlapping the photo */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 pb-14">
        <BookingWidget className="shadow-2xl" />
      </div>
    </section>
  );
};
