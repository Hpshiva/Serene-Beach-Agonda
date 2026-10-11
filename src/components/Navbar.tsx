import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Calendar, ShieldCheck, Waves } from 'lucide-react';
import { PROPERTY_DATA } from '../data/property';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Nearby Experiences", path: "/experiences" },
    { name: "Gallery", path: "/gallery" },
    { name: "Location & Directions", path: "/contact" },
    { name: "FAQs", path: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Banner: Direct Booking Notice & Verified Stats */}
      <div className="bg-[#0D2229] text-[#E8E2D5] px-4 py-1.5 text-xs font-medium border-b border-[#224840]/30 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#CBA135]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Booking Benefit:
            </span>
            <span>Save up to ₹500/night directly with zero OTA commission markup.</span>
          </div>
          <div className="flex items-center gap-4 text-[#A8B5B2]">
            <span>Check-in: {PROPERTY_DATA.checkInTime}</span>
            <span>•</span>
            <span>Agonda Beach, South Goa</span>
            <span>•</span>
            <a
              href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20I%20would%20like%20to%20enquire%20about%20direct%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8E2D5] hover:text-[#CBA135] transition-colors flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-[#25D366]" />
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D5] py-3'
            : 'bg-[#FBF9F5] border-b border-[#E8E2D5]/70 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#224840] text-[#FBF9F5] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <Waves className="w-5 h-5 text-[#CBA135]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-condensed text-2xl font-black uppercase tracking-wider text-[#0D2229] leading-none group-hover:text-[#224840] transition-colors">
                  SERENE BEACH
                </span>
                <span className="font-script text-xl text-[#C86D51] font-normal leading-none">
                  resort
                </span>
              </div>
              <span className="block font-condensed text-[11px] tracking-[0.25em] uppercase font-bold text-[#566B70] mt-0.5">
                AGONDA BEACH • SOUTH GOA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#224840] font-semibold'
                      : 'text-[#132328] hover:text-[#224840]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#224840] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20I%20have%20an%20enquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-[#E8E2D5] text-[#132328] hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <Link
              to="/booking"
              className="btn-primary px-5 py-2.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#CBA135]" />
              Book Direct
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#132328] hover:bg-[#F3EFE6] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FBF9F5] border-b border-[#E8E2D5] px-4 pt-3 pb-6 animate-fadeIn">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`py-2 px-3 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-[#224840] text-[#FBF9F5]'
                        : 'text-[#132328] hover:bg-[#F3EFE6]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-[#E8E2D5] flex flex-col gap-2.5">
                <Link
                  to="/booking"
                  className="btn-primary w-full py-3 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#CBA135]" />
                  Check Availability & Book Direct
                </Link>

                <a
                  href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20I%20would%20like%20to%20enquire%20about%20a%20stay.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-center text-sm font-medium border border-[#25D366]/40 text-[#132328] flex items-center justify-center gap-2 bg-[#F3EFE6]/50"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
