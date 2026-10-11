import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update visible items count based on window viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, REVIEWS_DATA.length - visibleCount);

  // Safe navigation handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay cycle
  useEffect(() => {
    if (isPaused) return;

    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPaused, handleNext]);

  // Touch Swipe Handlers for mobile & trackpad
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('');
  };

  return (
    <section className="py-24 bg-[#FBF9F5] border-t border-[#E8E2D5] overflow-hidden relative">
      {/* Background ambient watermarks */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA135]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#224840]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8 pb-8 border-b border-[#E8E2D5]">
          <div>
            <span className="font-script text-[#C86D51] text-4xl sm:text-5xl block mb-1">
              Genuine Traveler Stories
            </span>
            <div className="text-xs font-bold uppercase tracking-widest text-[#224840] mb-2 flex items-center gap-1.5">
              <span>★</span>
              <span>100% Verified Guest Stays</span>
            </div>
            <h2 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl text-[#0D2229]">
              Loved by Coastal Wanderers
            </h2>
            <p className="text-sm sm:text-base text-[#566B70] max-w-xl mt-2 leading-relaxed">
              Unfiltered feedback from guests who chose Serene Beach Agonda for their peaceful South Goa escape.
            </p>
          </div>

          {/* Social Proof Aggregated Scores */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white border border-[#E8E2D5] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
              <div className="text-center px-2 border-r border-[#E8E2D5]">
                <div className="font-condensed font-black text-2xl text-[#224840]">8.4</div>
                <div className="text-[10px] text-[#566B70]">/ 10</div>
              </div>
              <div>
                <div className="text-xs font-bold text-[#0D2229]">Agoda Verified</div>
                <div className="text-[11px] text-[#566B70]">277+ Reviews</div>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D5] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
              <div className="text-center px-2 border-r border-[#E8E2D5]">
                <div className="font-condensed font-black text-2xl text-[#224840]">8.3</div>
                <div className="text-[10px] text-[#566B70]">/ 10</div>
              </div>
              <div>
                <div className="text-xs font-bold text-[#0D2229]">Booking.com</div>
                <div className="text-[11px] text-[#566B70]">203+ Reviews</div>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D5] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
              <div className="text-center px-2 border-r border-[#E8E2D5]">
                <div className="font-condensed font-black text-2xl text-[#CBA135]">4.6</div>
                <div className="text-[10px] text-[#566B70]">/ 5</div>
              </div>
              <div>
                <div className="text-xs font-bold text-[#0D2229]">Google Maps</div>
                <div className="text-[11px] text-[#566B70]">180+ Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slide Window with Overflow Hidden */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {REVIEWS_DATA.map((rev) => (
                <div
                  key={rev.id}
                  className={`shrink-0 px-3 ${visibleCount === 1 ? 'w-full' : 'w-1/2'}`}
                >
                  <div className="h-full bg-white border border-[#E8E2D5] rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-xl hover:border-[#CBA135]/50 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group">
                    {/* Watermark Quote Icon */}
                    <Quote className="w-20 h-20 text-[#CBA135]/10 absolute -top-3 -right-3 rotate-12 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />

                    <div>
                      {/* Top Row: Platform Pill & Star Rating */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#224840]/10 text-[#224840] border border-[#224840]/20">
                          <CheckCircle className="w-3.5 h-3.5 text-[#224840]" />
                          {rev.sourcePlatform}
                        </span>

                        <div className="flex items-center gap-1.5 bg-[#FBF9F5] px-3 py-1 rounded-full border border-[#E8E2D5]">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#CBA135] text-[#CBA135]" />
                            ))}
                          </div>
                          <span className="font-black text-xs text-[#0D2229] ml-1">
                            {rev.ratingScore}
                          </span>
                          <span className="text-[10px] text-[#A8B5B2]">/ 10</span>
                        </div>
                      </div>

                      {/* WindSong Cursive Sentiment */}
                      {rev.cursiveTag && (
                        <span className="font-script text-[#C86D51] text-3xl sm:text-4xl block leading-none mb-1">
                          {rev.cursiveTag}
                        </span>
                      )}

                      {/* Review Headline */}
                      <h3 className="font-condensed font-black uppercase tracking-tight text-xl sm:text-2xl text-[#0D2229] mb-3 group-hover:text-[#224840] transition-colors">
                        "{rev.headline}"
                      </h3>

                      {/* Guest Comment */}
                      <p className="text-xs sm:text-sm text-[#566B70] leading-relaxed italic mb-8">
                        "{rev.comment}"
                      </p>
                    </div>

                    {/* Author Footer Strip */}
                    <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#224840] to-[#0D2229] text-[#DFB953] font-condensed font-black text-sm flex items-center justify-center uppercase shadow-sm">
                          {getInitials(rev.author)}
                        </div>
                        <div>
                          <div className="font-condensed font-bold uppercase tracking-tight text-sm text-[#0D2229]">
                            {rev.author}
                          </div>
                          <div className="text-[11px] text-[#566B70]">
                            {rev.origin} • {rev.roomStayed}
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#A8B5B2] font-medium">
                        {rev.reviewDate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows & Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4">
            {/* Pagination Pill Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full h-2 ${
                    currentIndex === idx
                      ? 'w-8 bg-[#CBA135]'
                      : 'w-2 bg-[#E8E2D5] hover:bg-[#566B70]'
                  }`}
                  aria-label={`Go to review slide ${idx + 1}`}
                />
              ))}

              <button
                onClick={() => setIsPaused((prev) => !prev)}
                className="ml-3 p-1.5 rounded-full text-[#566B70] hover:text-[#0D2229] hover:bg-black/5 transition-colors"
                title={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Left / Right Nav Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-condensed font-bold tracking-widest text-[#566B70] uppercase mr-2">
                {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
              </span>

              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white border border-[#E8E2D5] hover:border-[#CBA135] text-[#0D2229] hover:bg-[#CBA135] hover:text-[#0D2229] shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white border border-[#E8E2D5] hover:border-[#CBA135] text-[#0D2229] hover:bg-[#CBA135] hover:text-[#0D2229] shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
