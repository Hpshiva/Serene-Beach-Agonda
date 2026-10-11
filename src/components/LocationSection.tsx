import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Car, Plane, Train } from 'lucide-react';
import { PROPERTY_DATA } from '../data/property';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-white border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5">
            <div className="font-script text-3xl sm:text-4xl text-[#C86D51] mb-0.5">
              Beachside Directions & Arrival
            </div>
            <h2 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0D2229] mb-4">
              Finding Your Coastal Hideaway
            </h2>
            <p className="text-sm sm:text-base text-[#566B70] leading-relaxed mb-6">
              Serene Beach Agonda is tucked along the tranquil central beachfront of Agonda in Canacona, South Goa. Walk straight out onto the sands, or hop on a scooter to explore secluded coves and clifftop fortresses.
            </p>

            {/* Address Box */}
            <div className="bg-[#FBF9F5] border border-[#E8E2D5] rounded-2xl p-5 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#224840] mb-1">
                Exact Address
              </div>
              <div className="text-sm font-semibold text-[#0D2229] leading-snug">
                {PROPERTY_DATA.address.full}
              </div>
              <div className="text-xs text-[#566B70] mt-1">
                GPS Coordinates: {PROPERTY_DATA.address.coordinates.lat}, {PROPERTY_DATA.address.coordinates.lng}
              </div>
            </div>

            {/* Transit Times Grid */}
            <div className="space-y-2.5 mb-8">
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#F3EFE6]/60 border border-[#E8E2D5]/70">
                <span className="flex items-center gap-2 font-medium text-[#132328]">
                  <Plane className="w-4 h-4 text-[#224840]" />
                  Goa Dabolim Airport (GOI)
                </span>
                <span className="font-bold text-[#0D2229]">60 km (~90 mins)</span>
              </div>
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#F3EFE6]/60 border border-[#E8E2D5]/70">
                <span className="flex items-center gap-2 font-medium text-[#132328]">
                  <Train className="w-4 h-4 text-[#224840]" />
                  Madgaon Junction (Margao)
                </span>
                <span className="font-bold text-[#0D2229]">36 km (~50 mins)</span>
              </div>
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#F3EFE6]/60 border border-[#E8E2D5]/70">
                <span className="flex items-center gap-2 font-medium text-[#132328]">
                  <Car className="w-4 h-4 text-[#224840]" />
                  Canacona Railway Station
                </span>
                <span className="font-bold text-[#0D2229]">9 km (~15 mins)</span>
              </div>
            </div>

            {/* Open Google Maps CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PROPERTY_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 text-[#CBA135]" />
                <span>Open in Google Maps</span>
              </a>
              <a
                href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20could%20you%20help%20me%20arrange%20an%20airport%20taxi%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-5 py-3 rounded-full text-xs font-semibold inline-flex items-center gap-2"
              >
                <span>Inquire for Airport Taxi</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed / Visual */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-[#E8E2D5] shadow-xl relative aspect-[4/3] bg-[#F3EFE6]">
              <iframe
                title="Serene Beach Agonda Location Map"
                src={PROPERTY_DATA.directionsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8E2D5] shadow-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#224840]" />
                  <span className="font-bold text-[#0D2229]">Serene Beach Agonda</span>
                </div>
                <a
                  href={PROPERTY_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#224840] hover:underline flex items-center gap-1"
                >
                  Get Driving Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
