import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Waves, Shield, Coffee, Bed, ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const DirectBookingPerks: React.FC = () => {
  const stayPillars = [
    {
      num: "01",
      title: "Doorstep Ocean Living",
      tag: "30 Steps to the Shore",
      desc: "Wake up just paces from the gentle morning tide. Step barefoot directly onto Agonda’s wide 3-kilometer crescent beach, celebrated as one of Asia's cleanest, quietest, and most idyllic stretches of golden coastline.",
      highlight: "Direct Sand Access • No Roads Between You & Ocean"
    },
    {
      num: "02",
      title: "Charming Coastal Cottages",
      tag: "AC & Private Verandas",
      desc: "Handcrafted wooden architecture paired with thoughtful modern comforts: whisper-quiet air conditioning, ensuite hot-water bathrooms, comfortable king bedding, and private verandas overlooking swaying coconut palms or sunset seas.",
      highlight: "Ensuite Bathrooms • High-Speed WiFi Included"
    },
    {
      num: "03",
      title: "Protected Eco-Sanctuary",
      tag: "Zero Night Noise • Pure Rest",
      desc: "Agonda is an officially designated Olive Ridley sea turtle sanctuary. Strict regulations ban commercial motorized water sports and loud late-night parties, ensuring uninterrupted deep sleep to the soothing sound of crashing waves.",
      highlight: "Official Eco-Sanctuary • Unbroken Night Silence"
    },
    {
      num: "04",
      title: "Warm Goan Family Care",
      tag: "Personalized Hospitality",
      desc: "Experience the soulful hospitality of a family-run retreat. From warm morning breakfasts with fresh Goan poi bread to on-site scooter delivery and sunrise dolphin boat excursions, our local hosts attend to every detail.",
      highlight: "Local Travel Concierge • Scooter & Boat Assistance"
    }
  ];

  return (
    <section id="about-stay" className="py-20 sm:py-28 bg-[#FBF9F5] border-y border-[#E8E2D5] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA135]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#224840]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="font-script text-[#C86D51] text-4xl sm:text-5xl md:text-6xl block mb-2">
            The Beachside Experience
          </span>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#CBA135]" />
            About Your Stay at Serene Beach Agonda
          </div>
          <h2 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-[#0D2229] leading-[0.95]">
            An Unhurried Coastal Sanctuary on Agonda Beach
          </h2>
          <p className="text-sm sm:text-base text-[#566B70] mt-4 leading-relaxed max-w-2xl font-normal">
            Nestled directly along the pristine golden sands of southern Goa, Serene Beach Agonda is a collection of charming beachfront and garden cottages designed for travellers seeking stillness, genuine hospitality, and the untamed rhythm of the Arabian Sea.
          </p>
        </div>

        {/* Master Editorial 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Stay Atmosphere Photo & Snapshot (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real Property Photo Vignette */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#E8E2D5] shadow-xl group border border-[#E8E2D5]">
              <img
                src="https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678611/1678611147/serene-beach-agonda-canacona-pic-1.JPEG"
                alt="Serene Beach Agonda Beachfront Cottages on golden sands"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2229]/90 via-[#0D2229]/30 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-[#0D2229]/80 backdrop-blur-md text-[#DFB953] border border-white/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Direct Beach Access
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-script text-[#DFB953] text-3xl sm:text-4xl block leading-none mb-1 drop-shadow">
                  Barefoot Goan Living
                </span>
                <p className="font-condensed font-bold text-lg uppercase tracking-wide">
                  Serene Beach Agonda • South Goa
                </p>
                <p className="text-xs text-[#E8E2D5] mt-1 line-clamp-2 leading-relaxed">
                  Golden sands at your cottage door, private verandas, and peaceful nights to the sound of breaking waves.
                </p>
              </div>
            </div>

            {/* Stay Highlights Snapshot Card */}
            <div className="bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] mb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#224840]">
                    Stay Snapshot
                  </span>
                  <h3 className="font-condensed font-black uppercase text-xl text-[#0D2229]">
                    The Serene Experience
                  </h3>
                </div>
                <span className="bg-[#224840]/10 text-[#224840] text-xs font-bold px-3 py-1 rounded-full">
                  South Goa
                </span>
              </div>

              {/* Specs Grid */}
              <div className="space-y-3.5 text-xs">
                <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]/70 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#0D2229]">
                    <Waves className="w-4 h-4 text-[#224840]" />
                    <span className="font-bold">Beach Proximity:</span>
                  </div>
                  <span className="font-condensed font-bold text-xs uppercase text-[#224840]">Direct Sand (0 Meters)</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]/70 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#0D2229]">
                    <Bed className="w-4 h-4 text-[#224840]" />
                    <span className="font-bold">Accommodations:</span>
                  </div>
                  <span className="font-condensed font-bold text-xs uppercase text-[#224840]">Sea View, Balcony & Family</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]/70 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#0D2229]">
                    <Shield className="w-4 h-4 text-[#224840]" />
                    <span className="font-bold">Atmosphere:</span>
                  </div>
                  <span className="font-condensed font-bold text-xs uppercase text-[#224840]">Quiet Turtle Sanctuary</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]/70 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#0D2229]">
                    <Coffee className="w-4 h-4 text-[#224840]" />
                    <span className="font-bold">Morning Dining:</span>
                  </div>
                  <span className="font-condensed font-bold text-xs uppercase text-[#224840]">Fresh Breakfast Option</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-5 mt-5 border-t border-[#E8E2D5] flex items-center justify-between">
                <Link
                  to="/rooms"
                  className="text-xs font-bold uppercase tracking-wider text-[#224840] hover:text-[#0D2229] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Cottages & Rates</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CBA135]" />
                </Link>

                <span className="text-[11px] text-[#A8B5B2] font-medium">
                  Direct host booking available
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Editorial Stay Pillars (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            {stayPillars.map((item) => (
              <div
                key={item.num}
                className="group border-b border-[#E8E2D5] pb-8 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-5 sm:gap-7">
                  {/* Big Architectural Roman/Gold Number */}
                  <span className="font-condensed font-light text-4xl sm:text-5xl text-[#CBA135] shrink-0 leading-none group-hover:text-[#224840] transition-colors">
                    {item.num}
                  </span>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-condensed font-black uppercase tracking-tight text-2xl sm:text-3xl text-[#0D2229] group-hover:text-[#224840] transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#C86D51] bg-[#C86D51]/10 px-2.5 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#566B70] leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#224840] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CBA135]" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom Explore CTA Strip */}
            <div className="pt-6 border-t border-[#E8E2D5] flex flex-wrap items-center gap-4">
              <Link
                to="/rooms"
                className="btn-primary px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md hover:scale-105 transition-all"
              >
                <span>View All Rooms & Cottages</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CBA135]" />
              </Link>

              <Link
                to="/experiences"
                className="text-xs font-bold uppercase tracking-wider text-[#566B70] hover:text-[#0D2229] transition-colors px-4 py-3"
              >
                Discover Agonda Beach & Sights →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
