import React from 'react';
import { Hero } from '../components/Hero';
import { DirectBookingPerks } from '../components/DirectBookingPerks';
import { RoomsSection } from '../components/RoomsSection';
import { StorySection } from '../components/StorySection';
import { AmenitiesGrid } from '../components/AmenitiesGrid';
import { NearbyAttractions } from '../components/NearbyAttractions';
import { GalleryPreview } from '../components/GalleryPreview';
import { ReviewsSection } from '../components/ReviewsSection';
import { LocationSection } from '../components/LocationSection';
import { FAQSection } from '../components/FAQSection';
import { CallToActionBanner } from '../components/CallToActionBanner';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      {/* 1. Immersive Hero */}
      <Hero />

      {/* 2. Direct Booking Perks (CRO Focus) */}
      <DirectBookingPerks />

      {/* 3. Rooms & Accommodations */}
      <RoomsSection />

      {/* 4. The Agonda Story & Sustainable Hospitality */}
      <StorySection />

      {/* 5. Signature Amenities */}
      <AmenitiesGrid />

      {/* 6. Curated South Goa Experiences */}
      <NearbyAttractions />

      {/* 7. Visual Photo & Cottage Gallery */}
      <GalleryPreview />

      {/* 8. Verified Guest Reviews & Social Proof */}
      <ReviewsSection />

      {/* 9. Location & Transit Distances */}
      <LocationSection />

      {/* 10. FAQ Section */}
      <FAQSection />

      {/* 11. Final Call to Action Strip */}
      <CallToActionBanner />
    </main>
  );
};
