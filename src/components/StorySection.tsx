import React from 'react';
import { Shield, Sparkles, Waves, Compass, Footprints } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5] border-t border-[#E8E2D5] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#CBA135]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#224840]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Grand Architectural Photo Composition (6 Columns) */}
          <div className="lg:col-span-6 relative">
            {/* Main Hero Showcase Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#CBA135]/30 bg-[#E8E2D5] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] min-h-[440px] sm:min-h-[500px] group">
              <img
                src="https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608784/serene-beach-agonda-canacona-pic-2.JPEG"
                alt="Serene Beach Agonda authentic wooden sea view cottages on the beach sand"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle luxury gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2229]/80 via-transparent to-black/20" />

              {/* Floating Top Glass Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-[#0D2229]/80 backdrop-blur-md text-[#DFB953] border border-white/20 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#CBA135]" />
                  Direct Beachfront Cottages
                </span>
              </div>

              {/* Bottom Caption on Main Photo */}
              <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
                <span className="font-script text-[#DFB953] text-3xl sm:text-4xl block leading-none drop-shadow">
                  Barefoot Beach Living
                </span>
                <span className="font-condensed font-bold uppercase tracking-wider text-xs sm:text-sm text-white/90">
                  Agonda Beach • South Goa Coastline
                </span>
              </div>
            </div>

            {/* Overlapping Inset Balcony Vignette (Bottom-Right) */}
            <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 w-48 sm:w-60 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(13,34,41,0.25)] border-4 border-white bg-white group transition-transform duration-500 hover:-translate-y-1 z-20">
              <div className="relative aspect-[16/11] overflow-hidden bg-[#E8E2D5]">
                <img
                  src="https://serene-beach-agonda.hotelsgoaonline.com/data/Pics/OriginalPhoto/16786/1678608/1678608822/serene-beach-agonda-canacona-pic-5.JPEG"
                  alt="Private wooden balcony with sea view at Serene Beach Agonda"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 text-white flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span>Sea View Balcony</span>
                  <Waves className="w-3 h-3 text-[#CBA135]" />
                </div>
              </div>
            </div>

            {/* Floating Top-Left Sanctuary Badge */}
            <div className="absolute -top-5 -left-3 sm:-top-6 sm:-left-5 bg-white border border-[#E8E2D5] rounded-2xl p-3 sm:p-3.5 shadow-xl flex items-center gap-3 z-20 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#224840] text-[#DFB953] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#C86D51]">
                  Official Marine Sanctuary
                </div>
                <div className="text-xs sm:text-sm font-black text-[#0D2229] font-condensed uppercase tracking-tight">
                  Quiet Sea Turtle Sands
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Story & Hospitality Ethos (6 Columns) */}
          <div className="lg:col-span-6 lg:pl-4">
            <span className="font-script text-3xl sm:text-5xl text-[#C86D51] block mb-1.5">
              Untouched Nature & Warm Hospitality
            </span>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#CBA135]" />
              The Serene Beach Agonda Philosophy
            </div>
            
            <h2 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0D2229] leading-[0.98] mb-6">
              A Slower, Soulful Goa — <br />
              <span className="font-script normal-case text-4xl sm:text-6xl text-[#224840] font-normal block mt-1">
                right where the golden shore begins.
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#566B70] leading-relaxed">
              <p>
                Unlike the neon-lit club strips and crowded shores of northern Goa, Agonda is celebrated across the globe as a tranquil haven. It is one of only four beaches in Goa officially designated as a protected nesting habitat for endangered Olive Ridley sea turtles.
              </p>
              <p>
                At <strong className="text-[#0D2229]">Serene Beach Agonda</strong>, we honor this fragile balance. Our boutique beachside retreat blends barefoot coastal charm with thoughtful modern comforts: whisper-quiet air conditioning, ensuite hot-water bathrooms, handcrafted cane furnishings, and private balconies overlooking swaying palms or the vast Arabian Sea.
              </p>
              <p>
                Here, your days begin with the whisper of the morning tide and warm filter coffee on your terrace, and end with vivid amber sunsets right outside your doorway.
              </p>
            </div>

            {/* 3 Pillars Metric Strip */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#E8E2D5]">
              <div className="bg-[#F3EFE6]/60 p-3 sm:p-4 rounded-2xl border border-[#E8E2D5]">
                <div className="font-condensed font-black text-2xl sm:text-3xl text-[#224840]">30 Sec</div>
                <div className="text-[11px] text-[#566B70] mt-0.5 leading-tight font-medium">Walk to water</div>
              </div>
              <div className="bg-[#F3EFE6]/60 p-3 sm:p-4 rounded-2xl border border-[#E8E2D5]">
                <div className="font-condensed font-black text-2xl sm:text-3xl text-[#224840]">100%</div>
                <div className="text-[11px] text-[#566B70] mt-0.5 leading-tight font-medium">AC & ensuite bath</div>
              </div>
              <div className="bg-[#F3EFE6]/60 p-3 sm:p-4 rounded-2xl border border-[#E8E2D5]">
                <div className="font-condensed font-black text-2xl sm:text-3xl text-[#224840]">3-Km</div>
                <div className="text-[11px] text-[#566B70] mt-0.5 leading-tight font-medium">Golden sands</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
