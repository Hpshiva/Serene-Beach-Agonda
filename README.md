# Serene Beach Agonda — Premium Hotel Website & Direct Booking Experience

A production-quality hotel website and direct booking engine demo designed specifically for **Serene Beach Agonda** in South Goa, India.

---

## 🌊 Overview & Business Objective
The primary commercial objective of this project is to:
1. **Maximize Direct Bookings:** Incentivize travelers to book directly on the hotel's website by highlighting transparent direct savings (saving up to ₹500/night vs OTAs), complimentary breakfast upgrades, and flexible 7-day date modification policies.
2. **Reduce OTA Commission Dependency:** Disintermediate high-commission portals like Booking.com and Agoda (which typically charge 15–20% per reservation).
3. **Establish a Distinct Coastal Brand:** Showcase the unique charm of Agonda Beach (Olive Ridley turtle nesting sanctuary, golden sand, calm sea breezes, and authentic Goan hospitality) rather than using a generic corporate hotel template.

---

## 🏛️ Technology Stack
- **Framework:** React 19 + TypeScript + Vite
- **Routing:** React Router v7 (Full client-side multi-page routing across all routes)
- **Styling:** Tailwind CSS v4 with bespoke coastal design tokens:
  - Deep Ocean (`#0D2229`)
  - Tropical Palm / Moss (`#224840` / `#2D5D52`)
  - Warm Sand & Ivory (`#FBF9F5` / `#F3EFE6`)
  - Sunset Terracotta (`#C86D51`)
  - Golden Accent (`#CBA135`)
- **Typography:** *Cormorant Garamond* (Editorial Serif) paired with *Plus Jakarta Sans* (Modern Clean UI)
- **Smooth Motion & Animation:** GSAP + Lenis Smooth Scrolling for fluid, elegant page transitions
- **Icons:** Lucide Icons
- **Celebration Effects:** Canvas-confetti for confirmed reservations
- **State Management:** React Context (`BookingContext`) with `localStorage` persistence

---

## 🔍 Verified Property Research & Reference Data
All property data, room categories, pricing, photos, and ratings were collected from official sources on October 10, 2026:
- **Official Address:** 121/8, Dhavalkhazan / Devalkajjan, Agonda Beach, Canacona, South Goa 403702, India
- **Coordinates:** `15.0474753, 73.9849014` ([Google Maps Place Link](https://maps.app.goo.gl/LKW5idp1jyKdnCJe8))
- **Live CRS / Channel Manager Reference:** AsiaTech CRS Hotel ID `9574`
- **Verified Room Catalogue (with real S3 photographic assets):**
  1. *Double Room With Balcony* (CRS ID 31320): Rack ₹4,700 | Direct ₹4,200 (5 rooms available)
  2. *Family Room with Side Sea View* (CRS ID 31319): Rack ₹5,500 | Direct ₹5,000 (2 rooms available)
  3. *Double Room With Sea View* (CRS ID 31321): Rack ₹5,500 | Direct ₹5,000 (2 rooms available)
  4. *Family Room With Sea View* (CRS ID 31333): Rack ₹7,500 | Direct ₹7,000 (2 rooms available)
- **Public Ratings:** Agoda 8.4/10 (277 reviews), Booking.com 8.3/10 (203 reviews), Google Maps 4.6★ (339+ reviews commercial reference).
- Detailed findings are recorded in [`docs/property-research.md`](./docs/property-research.md).

---

## 🧭 Site Structure & Key Features
1. **Homepage (`/`)**:
   - Immersive hero section with editorial typography and rating proof pills.
   - Prominent **Availability Search Widget** with date validation and guest counters.
   - **Direct Booking Perks** strip highlighting price match, breakfast perks, and flexibility.
   - **Room Discovery Section** with interactive category filters.
   - **Story & Turtle Sanctuary** section celebrating Agonda's peaceful protected shores.
   - **Amenities Grid** showcasing modern conveniences.
   - **Standout Nearby Experiences** inspired by the Quality Inn concept (distance, drive times, Google Maps links).
   - **Photo Gallery Preview** with full-screen lightbox modal.
   - **Verified Guest Reviews** from Agoda and Booking.com.
   - **Location & Directions** with transit times from GOI, GOX, and Madgaon.
   - **FAQ Accordion** with policy clarifications.
2. **Rooms & Suites (`/rooms`)**:
   - Complete room catalog with category filtering and specs.
3. **Room Detail Page (`/rooms/:id`)**:
   - Multi-image gallery with thumbnail switcher.
   - Detailed room specs, bed configurations, and bathroom details.
   - Sticky **Direct Booking Widget** with live nights, meals, and GST tax calculations.
   - Transparent cancellation terms.
4. **South Goa Experiences (`/experiences`)**:
   - Comprehensive destination guide for Agonda Beach, Cola Lagoon, Butterfly Beach, Cabo de Rama Fort, Palolem Bay, and local beach shacks.
5. **Photo Gallery (`/gallery`)**:
   - Categorized photo showcase with full-screen lightbox, keyboard navigation (Arrow keys / Esc), and mobile controls.
6. **Location & Contact (`/contact`)**:
   - GPS coordinates, map embed, transit times, direct WhatsApp host button, and simulated inquiry form.
7. **FAQs (`/faq`)**:
   - Searchable, categorized knowledge base.
8. **End-to-End Direct Booking Funnel (`/booking`)**:
   - **Step 1:** Dates & Occupancy (validates check-out is after check-in, calculates nights).
   - **Step 2:** Room Selection (live rates and direct savings highlights).
   - **Step 3:** Guest Information (name, email, phone, arrival time, client-side validation).
   - **Step 4:** Review & Bill Breakdown (subtotal, taxes, direct savings, cancellation terms).
   - **Step 5:** Payment Demonstration (Razorpay Test Mode simulator with success, decline, and cancel states, plus Pay at Property option).
9. **Official Booking Confirmation Voucher (`/booking/confirmation`)**:
   - Generates persistent reference code `SBA-2026-XXXX`.
   - Complete itemized bill, guest details, and check-in/out policies.
   - Print/Save Voucher functionality (`window.print()`).
   - WhatsApp host reference sharing.

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Getting Started
```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server
npm run dev

# 3. Open in your browser
http://localhost:5173
```

### Production Build
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

### Automated Verification Test
```bash
# Run automated verification suite
node scripts/verify-site.mjs
```

---

## 📋 Production Readiness Checklist (For Hotel Owner Handover)
To transition this demonstration into a live production booking platform:
1. **Confirm Business Contacts:** Replace demo WhatsApp (`+91 98765 43210`) and email with verified property owner details in `.env`.
2. **Razorpay Live Credentials:** Provide Razorpay Merchant Key ID and Secret to activate real UPI/card payments.
3. **Channel Manager (CRS) API Integration:** Connect live webhooks to the AsiaTech CRS (Hotel ID `9574`) for automated real-time inventory blocking.
4. **Domain & SSL:** Point property domain (e.g. `serenebeachagonda.com`) to the hosting server (Vercel, Netlify, or AWS Amplify).
