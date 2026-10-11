import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, ShieldCheck, Sparkles, Coffee, Bike, Clock, ArrowRight } from 'lucide-react';
import { PROPERTY_DATA } from '../data/property';

export const CallToActionBanner: React.FC = () => {
  const whatsappUrl = `https://wa.me/${PROPERTY_DATA.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi Serene Beach Agonda! I would like to check availability and book a room directly.'
  )}`;

  return (
    <section className="relative py-28 sm:py-36 bg-[#091519] text-white overflow-hidden">
      {/* Full-bleed authentic dusk coastal background photo */}
      <div className="absolute inset-0">
        <img
          src="https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608784/serene-beach-agonda-canacona-pic-2.JPEG"
          alt="Serene Beach Agonda Sunset Coastline"
          className="w-full h-full object-cover object-center filter brightness-[0.4] saturate-[1.2]"
          loading="lazy"
        />
        {/* Multi-layered luxury gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091519] via-[#091519]/75 to-[#091519]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#091519]/60 to-[#091519]" />
      </div>

      {/* Ambient glowing gold orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#CBA135]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#224840]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* WindSong Cursive Pre-header */}
        <span className="font-script text-[#DFB953] text-4xl sm:text-6xl md:text-7xl block mb-2 drop-shadow-lg animate-fade-in">
          Your Private Agonda Sanctuary
        </span>

        {/* Small architectural kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFB953] text-[10px] font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#CBA135]" />
          Official Direct Reservation Channel
        </div>

        {/* Big Architectural Headline */}
        <h2 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-white mb-5 leading-[0.95]">
          Ready for Your Coastal Escape in Agonda?
        </h2>

        {/* Persuasive Subtitle */}
        <p className="text-sm sm:text-base text-[#E8E2D5]/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Reserve directly with Serene Beach Agonda to lock in guaranteed direct rates, complimentary breakfast upgrades, and personalized host care without third-party OTA middleman markups.
        </p>

        {/* 4 Direct Privileges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12 text-left">
          <div className="bg-[#0D2229]/80 backdrop-blur-md border border-white/10 hover:border-[#CBA135]/40 p-4 rounded-2xl transition-all">
            <ShieldCheck className="w-5 h-5 text-[#CBA135] mb-2" />
            <div className="text-xs font-black uppercase tracking-wider text-white">Save ₹500/night</div>
            <div className="text-[11px] text-[#A8B5B2] leading-tight mt-0.5">Zero OTA commission markup</div>
          </div>

          <div className="bg-[#0D2229]/80 backdrop-blur-md border border-white/10 hover:border-[#CBA135]/40 p-4 rounded-2xl transition-all">
            <Coffee className="w-5 h-5 text-[#CBA135] mb-2" />
            <div className="text-xs font-black uppercase tracking-wider text-white">Fresh Breakfast</div>
            <div className="text-[11px] text-[#A8B5B2] leading-tight mt-0.5">Hearty morning dining options</div>
          </div>

          <div className="bg-[#0D2229]/80 backdrop-blur-md border border-white/10 hover:border-[#CBA135]/40 p-4 rounded-2xl transition-all">
            <Bike className="w-5 h-5 text-[#CBA135] mb-2" />
            <div className="text-xs font-black uppercase tracking-wider text-white">On-Site Concierge</div>
            <div className="text-[11px] text-[#A8B5B2] leading-tight mt-0.5">Scooters & dolphin boat tours</div>
          </div>

          <div className="bg-[#0D2229]/80 backdrop-blur-md border border-white/10 hover:border-[#CBA135]/40 p-4 rounded-2xl transition-all">
            <Clock className="w-5 h-5 text-[#CBA135] mb-2" />
            <div className="text-xs font-black uppercase tracking-wider text-white">Priority Check-In</div>
            <div className="text-[11px] text-[#A8B5B2] leading-tight mt-0.5">Direct host communication</div>
          </div>
        </div>

        {/* High-Conversion Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/booking"
            className="w-full sm:w-auto btn-coral px-9 py-5 rounded-full text-xs sm:text-sm uppercase tracking-widest font-black inline-flex items-center justify-center gap-2.5 shadow-[0_20px_50px_rgba(200,109,81,0.45)] hover:shadow-[0_25px_60px_rgba(200,109,81,0.6)] hover:scale-105 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Check Live Availability & Book Direct</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-5 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white border border-white/20 text-white text-xs sm:text-sm uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 backdrop-blur-md transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with WhatsApp Host</span>
          </a>
        </div>

        {/* Reassurance Footer Micro-text */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#A8B5B2] font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            Official CRS Real-Time Availability
          </span>
          <span>•</span>
          <span>Instant Automated Confirmation</span>
          <span>•</span>
          <span>Zero Hidden Booking Fees</span>
        </div>

      </div>
    </section>
  );
};
