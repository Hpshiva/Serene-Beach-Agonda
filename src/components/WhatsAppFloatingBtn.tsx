import React from 'react';
import { MessageSquare } from 'lucide-react';
import { PROPERTY_DATA } from '../data/property';

export const WhatsAppFloatingBtn: React.FC = () => {
  return (
    <aside aria-label="Direct Support" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <span className="hidden sm:inline-block bg-[#0D2229] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
        Chat with Agonda Host
      </span>

      <a
        href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability%20and%20direct%20booking.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform hover:shadow-2xl relative"
        title="Chat with us on WhatsApp"
        aria-label="Chat with Serene Beach Agonda on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
      </a>
    </aside>
  );
};
