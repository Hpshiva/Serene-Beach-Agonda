import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { PROPERTY_DATA } from '../data/property';
import { ROOMS_DATA } from '../data/rooms';

const LOWEST_DIRECT_RATE = Math.min(...ROOMS_DATA.map(r => r.directRate));

// Pages that already have their own booking actions on screen
export function hidesMobileBookingBar(pathname: string): boolean {
  return pathname.startsWith('/booking') || pathname.startsWith('/owner');
}

export const MobileBookingBar: React.FC = () => {
  const { pathname } = useLocation();
  if (hidesMobileBookingBar(pathname)) return null;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D5] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(13,34,41,0.25)] print:hidden">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#566B70]">Direct rate from</div>
          <div className="font-condensed font-black text-xl text-[#0D2229] leading-none">
            ₹{LOWEST_DIRECT_RATE.toLocaleString('en-IN')}
            <span className="text-xs font-semibold text-[#566B70] normal-case"> / night</span>
          </div>
        </div>
        <a
          href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
        </a>
        <Link
          to="/booking"
          className="btn-primary h-11 px-5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shrink-0"
        >
          Book Now <ArrowRight className="w-3.5 h-3.5 text-[#CBA135]" />
        </Link>
      </div>
    </div>
  );
};
