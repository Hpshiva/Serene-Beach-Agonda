import React from 'react';
import {
  Waves,
  Wind,
  Wifi,
  Coffee,
  Sparkles,
  Car,
  ShieldCheck,
  Compass,
  Check
} from 'lucide-react';

export const AmenitiesGrid: React.FC = () => {
  const categories = [
    {
      category: "Beachfront & Coastal Living",
      items: [
        { title: "Direct Beach Access", desc: "Step off your porch directly onto the golden sands of central Agonda Beach." },
        { title: "Private Verandas & Sit-outs", desc: "Furnished outdoor wooden balconies overlooking coconut palms or the ocean." },
        { title: "Spectacular Arabian Sea Sunsets", desc: "Unobstructed westward views for golden hour and tranquil evening skies." }
      ]
    },
    {
      category: "Room Climate & Living Comfort",
      items: [
        { title: "Whisper-Quiet Split AC", desc: "Independent temperature control for deep, restful sleep in any season." },
        { title: "Modern Ensuite Bathrooms", desc: "Clean tiled private bathrooms with reliable 24-hour hot water showers." },
        { title: "Premium Cotton Linens", desc: "Plush coastal mattresses, freshly laundered linens, and soft bath towels." }
      ]
    },
    {
      category: "Everyday Guest Essentials",
      items: [
        { title: "High-Speed Fiber Wi-Fi", desc: "Reliable internet coverage across cottages and verandas for workcations." },
        { title: "Daily Housekeeping", desc: "Attentive daily room cleaning and fresh linen changes by our local team." },
        { title: "Tea & Coffee Provisions", desc: "In-room electric kettle with complimentary coastal tea and coffee selections." }
      ]
    },
    {
      category: "Host Services & Mobility",
      items: [
        { title: "Airport & Station Transfers", desc: "Pre-arranged private taxi pickups from Dabolim (GOI), MOPA (GOX), or Madgaon." },
        { title: "Scooter & Vehicle Rentals", desc: "Scooters delivered directly to the property for easy South Goa exploration." },
        { title: "Local Excursion Assistance", desc: "Dolphin boat tour bookings, Cola Beach trips, and local dining advice." }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#E8E2D5]">
          <div>
            <span className="font-script text-[#C86D51] text-4xl sm:text-5xl block mb-2">
              Thoughtful Living
            </span>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#CBA135]" />
              Resort Amenities & Guest Conveniences
            </div>
            <h2 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl text-[#0D2229]">
              Everything for an Effortless Stay
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#566B70] max-w-md leading-relaxed">
            We balance barefoot simplicity with the modern comforts you rely on: quiet cooling, hot showers, crisp linens, and fast connectivity.
          </p>
        </div>

        {/* 4 Architectural Category Pillars (No generic squircle cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              
              {/* Category Header */}
              <div className="pb-3 border-b-2 border-[#224840]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C86D51]">
                  Pillar 0{idx + 1}
                </span>
                <h3 className="font-condensed font-bold uppercase tracking-tight text-lg sm:text-xl text-[#0D2229] mt-0.5">
                  {cat.category}
                </h3>
              </div>

              {/* Items List */}
              <div className="space-y-5">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="group">
                    <div className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CBA135] mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
                      <div>
                        <div className="font-condensed font-bold uppercase text-sm text-[#0D2229] group-hover:text-[#224840] transition-colors">
                          {item.title}
                        </div>
                        <p className="text-xs text-[#566B70] mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Ambient Real Photo Banner Strip */}
        <div className="mt-16 rounded-3xl overflow-hidden bg-[#0D2229] text-white p-8 sm:p-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-2">
              <span className="font-script text-[#CBA135] text-3xl sm:text-4xl block">
                Pure South Goan Serenity
              </span>
              <h3 className="font-condensed font-black uppercase tracking-tight text-2xl sm:text-4xl">
                Eco-Conscious & Peaceful Coastal Regulations
              </h3>
              <p className="text-xs sm:text-sm text-[#E8E2D5] max-w-2xl leading-relaxed">
                Agonda is a protected Olive Ridley sea turtle nesting beach. In harmony with nature, our shores are protected from commercial motor sports and late-night loud sound systems, guaranteeing pure ocean tranquility.
              </p>
            </div>
            <div className="lg:col-span-4 text-left lg:text-right">
              <span className="inline-block px-5 py-2.5 rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm">
                Protected Turtle Sanctuary
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
