import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Maximize2, ArrowRight } from 'lucide-react';
import { GALLERY_DATA } from '../data/gallery';
import { LightboxModal } from './LightboxModal';

export const GalleryPreview: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setSelectedIdx(index);
    setLightboxOpen(true);
  };

  const previewImages = GALLERY_DATA.slice(0, 6);

  return (
    <section className="py-20 bg-white border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-script text-3xl sm:text-4xl text-[#C86D51] mb-0.5">
              Real Guest Perspectives & Property Views
            </div>
            <h2 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0D2229]">
              Moments From the Agonda Shore
            </h2>
            <p className="text-sm sm:text-base text-[#566B70] max-w-xl mt-2 font-medium">
              Browse authentic photographs of our beach cottages, ensuite rooms, private verandas, and dining tables on the sand verified on Google Maps.
            </p>
          </div>

          <Link
            to="/gallery"
            className="btn-secondary px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2"
          >
            <span>View All Photos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {previewImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => handleOpenLightbox(idx)}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 bg-[#F3EFE6]"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CBA135]">
                  {img.category}
                </span>
                <span className="font-condensed font-bold uppercase tracking-wide text-sm sm:text-base leading-tight">
                  {img.title}
                </span>
                <span className="text-[11px] text-[#E8E2D5] line-clamp-1 mt-0.5">
                  {img.caption}
                </span>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#0D2229]">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <LightboxModal
        images={GALLERY_DATA}
        currentIndex={selectedIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setSelectedIdx((prev) => (prev + 1) % GALLERY_DATA.length)}
        onPrev={() => setSelectedIdx((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length)}
      />
    </section>
  );
};
