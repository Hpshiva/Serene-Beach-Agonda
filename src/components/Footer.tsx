import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, MapPin, Phone, Mail, MessageSquare, ShieldCheck, ExternalLink, Sparkles, Navigation, Clock, CheckCircle2 } from 'lucide-react';
import { PROPERTY_DATA } from '../data/property';

export const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/${PROPERTY_DATA.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi Serene Beach Agonda team! I have an inquiry about rooms and direct booking.'
  )}`;

  return (
    <footer className="bg-[#071216] text-[#E8E2D5] border-t border-[#224840]/60 relative overflow-hidden pb-20 sm:pb-0">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#CBA135]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#224840]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Top Tier: Fast Concierge & Direct Assistance Banner */}
      <div className="border-b border-white/10 bg-[#0A1A20]/80 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div>
              <span className="font-script text-[#DFB953] text-3xl sm:text-4xl block leading-none mb-1">
                Personalized Coastal Hospitality
              </span>
              <h3 className="font-condensed font-black uppercase tracking-tight text-xl sm:text-2xl text-white">
                Need Help Planning Your Agonda Trip or Airport Transfer?
              </h3>
              <p className="text-xs sm:text-sm text-[#A8B5B2] mt-1 max-w-xl">
                Our on-site reception team is directly accessible via WhatsApp for immediate room availability, airport pickups, and scooter bookings.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Chat on WhatsApp Host
                </span>
              </a>

              <Link
                to="/booking"
                className="px-6 py-3.5 rounded-full bg-[#CBA135] hover:bg-[#b58e2a] text-[#071216] text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-lg transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Book Direct & Save ₹500</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 5-Column Editorial Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-[#224840] border border-[#CBA135]/40 text-[#FBF9F5] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Waves className="w-6 h-6 text-[#DFB953]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="block font-condensed font-black text-2xl tracking-wider text-white leading-none uppercase">
                    SERENE BEACH
                  </span>
                  <span className="font-script text-[#DFB953] text-2xl lowercase leading-none">
                    resort
                  </span>
                </div>
                <span className="block text-[10px] tracking-[0.25em] uppercase font-bold text-[#A8B5B2] mt-1 font-condensed">
                  AGONDA BEACH • CANACONA, SOUTH GOA
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#A8B5B2] leading-relaxed max-w-sm">
              An untouched boutique beachfront sanctuary nestled directly on the soft golden sands of Agonda Beach. Experience quiet ocean waves, sea turtle conservation sands, and genuine Goan warmth.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#E8E2D5]/90">
              <div className="flex items-center gap-2 text-[#DFB953]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#CBA135]" />
                <span className="font-bold">Guaranteed Direct Rates (Save ₹500/night vs OTAs)</span>
              </div>
              <div className="flex items-center gap-2 text-[#A8B5B2]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#CBA135]" />
                <span>Zero middleman commission • Official CRS real-time engine</span>
              </div>
            </div>
          </div>

          {/* Accommodations (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-condensed font-black text-white mb-4 uppercase tracking-wider text-sm flex items-center gap-1.5">
              <span>Rooms & Cottages</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8B5B2]">
              <li>
                <Link to="/rooms" className="hover:text-white transition-colors">
                  All Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/rooms/double-room-sea-view" className="hover:text-[#DFB953] transition-colors">
                  Sea View Double Room
                </Link>
              </li>
              <li>
                <Link to="/rooms/family-room-sea-view" className="hover:text-[#DFB953] transition-colors">
                  Family Suite with Sea View
                </Link>
              </li>
              <li>
                <Link to="/rooms/double-room-balcony" className="hover:text-[#DFB953] transition-colors">
                  Double Room with Balcony
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Photo & Cottage Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-[#CBA135] font-semibold hover:underline transition-all">
                  Check Live Rates →
                </Link>
              </li>
            </ul>
          </div>

          {/* South Goa Discovery (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-condensed font-black text-white mb-4 uppercase tracking-wider text-sm">
              Nearby Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8B5B2]">
              <li>
                <Link to="/experiences" className="hover:text-white transition-colors">
                  Agonda Turtle Sanctuary
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#DFB953] transition-colors">
                  Cola Beach Emerald Lagoon
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#DFB953] transition-colors">
                  Butterfly Beach Dolphin Coves
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#DFB953] transition-colors">
                  Cabo de Rama Historic Citadel
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#DFB953] transition-colors">
                  Palolem Beach & Kayaks
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-white transition-colors">
                  Beachfront Seafood Shacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Transit & Guest Info (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-condensed font-black text-white mb-4 uppercase tracking-wider text-sm">
              Transit & Guidelines
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8B5B2]">
              <li className="text-white font-medium">
                Check-in: <span className="text-[#DFB953]">{PROPERTY_DATA.checkInTime}</span>
              </li>
              <li className="text-white font-medium">
                Check-out: <span className="text-[#DFB953]">{PROPERTY_DATA.checkOutTime}</span>
              </li>
              <li className="pt-1 text-[11px] leading-tight">
                <span className="block text-white">Goa Dabolim Airport (GOI)</span>
                <span>60 km • 75 min drive</span>
              </li>
              <li className="text-[11px] leading-tight">
                <span className="block text-white">Goa Mopa Airport (GOX)</span>
                <span>105 km • 2 hrs drive</span>
              </li>
              <li className="text-[11px] leading-tight">
                <span className="block text-white">Canacona Rail Station</span>
                <span>9 km • 15 min drive</span>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Address & Navigation Card (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-condensed font-black text-white mb-4 uppercase tracking-wider text-sm">
              Location & Contact
            </h4>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 text-xs text-[#A8B5B2]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#CBA135] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{PROPERTY_DATA.address.full}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#CBA135] shrink-0" />
                <span className="text-white font-medium">{PROPERTY_DATA.contacts.phoneDisplay}</span>
              </div>

              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-[#CBA135] shrink-0" />
                <span className="truncate text-[11px]">{PROPERTY_DATA.contacts.email}</span>
              </div>

              <a
                href={PROPERTY_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-[#CBA135] text-white hover:text-[#071216] text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-white/10"
              >
                <span>Google Maps GPS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* 3. Security, Payment Trust & Direct Booking Protection Strip */}
        <div className="py-6 border-y border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A8B5B2]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-white">Accepted Direct Methods:</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white font-medium">UPI (GPay / PhonePe / Paytm)</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white font-medium">Credit & Debit Cards</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white font-medium">Net Banking</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white font-medium">Pay At Check-In</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#DFB953]">
            <ShieldCheck className="w-4 h-4 text-[#CBA135]" />
            <span>256-Bit SSL Encrypted • Zero Middleman Booking Guarantee</span>
          </div>
        </div>

        {/* 4. Bottom Legal & Conservation Notice */}
        <div className="pt-8 text-[11px] text-[#A8B5B2] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p>
              © {new Date().getFullYear()} Serene Beach Agonda, Canacona, South Goa. All rights reserved.
            </p>
            <p className="text-[10px] text-[#A8B5B2]/60 mt-0.5">
              Official Direct Channel Reservation Engine. Protects turtle nesting grounds & supports sustainable local Goan hospitality.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#A8B5B2]">
            <Link to="/faq" className="hover:text-white transition-colors">Booking Policy</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-white transition-colors">Cancellation Terms</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Concierge Contact</Link>
            <span>•</span>
            <Link to="/experiences" className="hover:text-white transition-colors">Turtle Sanctuary Pledge</Link>
            <span>•</span>
            <Link to="/owner" className="hover:text-white transition-colors">Owner Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
