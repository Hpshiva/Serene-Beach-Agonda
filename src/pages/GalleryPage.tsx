import React, { useState } from 'react';
import { Camera, Maximize2, Sparkles } from 'lucide-react';
import { GALLERY_DATA } from '../data/gallery';
import { LightboxModal } from '../components/LightboxModal';

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rooms' | 'ocean' | 'resort' | 'dining'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = GALLERY_DATA.filter((img) => {
    if (activeFilter === 'all') return true;
    return img.category === activeFilter;
  });

  const handleOpenLightbox = (imgId: string) => {
    const idx = GALLERY_DATA.findIndex((g) => g.id === imgId);
    setCurrentIndex(idx !== -1 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full bg-[#FBF9F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-script text-[#C86D51] text-3xl sm:text-5xl block mb-1">
            Visual Story of Agonda
          </span>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-2.5">
            <Camera className="w-3.5 h-3.5 text-[#CBA135]" />
            Official Visual Archives
          </div>
          <h1 className="font-condensed font-black uppercase tracking-tight text-4xl sm:text-6xl text-[#0D2229] mb-4">
            Serene Beach Agonda Gallery
          </h1>
          <p className="text-base text-[#566B70] leading-relaxed">
            Take a visual tour through our beachfront resort, private balconies, tropical palm walkways, and the golden hour glow on Agonda Beach.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#E8E2D5] pb-6 mb-10">
          {[
            { label: "All Photos", value: "all" },
            { label: "Rooms & Suites", value: "rooms" },
            { label: "Ocean & Sunset", value: "ocean" },
            { label: "Resort Grounds", value: "resort" },
            { label: "Dining & Shacks", value: "dining" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeFilter === tab.value
                  ? 'bg-[#224840] text-white shadow-sm'
                  : 'bg-white text-[#132328] border border-[#E8E2D5] hover:border-[#224840]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => handleOpenLightbox(img.id)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#E8E2D5] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CBA135] mb-1">
                  {img.category}
                </span>
                <span className="font-condensed font-bold text-xl uppercase tracking-wide leading-tight">
                  {img.title}
                </span>
                <span className="text-xs text-[#E8E2D5] mt-1 line-clamp-2">
                  {img.caption}
                </span>
              </div>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#0D2229]">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <LightboxModal
        images={GALLERY_DATA}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length)}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length)}
      />
    </div>
  );
};
