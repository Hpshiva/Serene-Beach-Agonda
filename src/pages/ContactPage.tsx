import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Navigation, CheckCircle2, Send, Clock, Plane, Train } from 'lucide-react';
import { PROPERTY_DATA } from '../data/property';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDates: '',
    roomInterest: 'Double Room With Sea View',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FBF9F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-script text-[#C86D51] text-3xl sm:text-5xl block mb-1">
            Always Here For You
          </span>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-[#CBA135]" />
            Location & Direct Communication
          </div>
          <h1 className="font-condensed font-black uppercase tracking-tight text-4xl sm:text-6xl text-[#0D2229] mb-4">
            Connect With Our Agonda Team
          </h1>
          <p className="text-base text-[#566B70] leading-relaxed">
            Have questions about room availability, airport taxi coordination, or special requests? Reach out directly to our team via WhatsApp, phone, or our enquiry form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Contact & Location Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-condensed font-bold uppercase tracking-wide text-2xl text-[#0D2229]">
                Property Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#132328]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#224840]/10 text-[#224840] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0D2229]">Address</div>
                    <div className="text-[#566B70] mt-0.5">{PROPERTY_DATA.address.full}</div>
                    <div className="text-[11px] text-[#A8B5B2] mt-0.5">
                      Coordinates: {PROPERTY_DATA.address.coordinates.lat}, {PROPERTY_DATA.address.coordinates.lng}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#224840]/10 text-[#224840] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0D2229]">Phone & Reservations</div>
                    <div className="text-[#566B70] mt-0.5">{PROPERTY_DATA.contacts.phoneDisplay}</div>
                    <div className="text-[10px] text-[#C86D51]">Owner confirmation pending • demo contact</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#224840]/10 text-[#224840] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0D2229]">Email</div>
                    <div className="text-[#566B70] mt-0.5">{PROPERTY_DATA.contacts.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#224840]/10 text-[#224840] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0D2229]">Standard Timings</div>
                    <div className="text-[#566B70] mt-0.5">
                      Check-in: {PROPERTY_DATA.checkInTime} • Check-out: {PROPERTY_DATA.checkOutTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-[#E8E2D5]">
                <a
                  href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20I%20have%20an%20enquiry%20regarding%20room%20booking.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Travel Hub Distances */}
            <div className="bg-white border border-[#E8E2D5] rounded-3xl p-6 shadow-sm space-y-3">
              <h3 className="font-condensed font-bold uppercase tracking-wide text-lg text-[#0D2229]">
                Nearby Transit Hubs
              </h3>
              <div className="space-y-2 text-xs text-[#566B70]">
                <div className="flex items-center justify-between py-1.5 border-b border-[#E8E2D5]/60">
                  <span className="flex items-center gap-1.5 font-medium text-[#132328]">
                    <Plane className="w-3.5 h-3.5 text-[#224840]" /> Dabolim Airport (GOI)
                  </span>
                  <span>60 km (~90 mins)</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#E8E2D5]/60">
                  <span className="flex items-center gap-1.5 font-medium text-[#132328]">
                    <Plane className="w-3.5 h-3.5 text-[#224840]" /> MOPA Airport (GOX)
                  </span>
                  <span>105 km (~135 mins)</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="flex items-center gap-1.5 font-medium text-[#132328]">
                    <Train className="w-3.5 h-3.5 text-[#224840]" /> Madgaon Junction
                  </span>
                  <span>36 km (~50 mins)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Direct Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-10 shadow-sm">
              <h2 className="font-condensed font-bold uppercase tracking-tight text-2xl sm:text-3xl text-[#0D2229] mb-2">
                Send a Direct Reservation Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#566B70] mb-8">
                Planning a family gathering, workcation, or romantic getaway? Fill out the form below and our host will respond with availability.
              </p>

              {submitted ? (
                <div className="bg-[#224840]/10 border border-[#224840]/30 rounded-2xl p-8 text-center animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-[#224840] text-white flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#CBA135]" />
                  </div>
                  <h3 className="font-condensed font-bold uppercase tracking-tight text-2xl text-[#0D2229] mb-2">
                    Enquiry Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#566B70] max-w-md mx-auto mb-6">
                    Thank you, {formData.fullName}. In this demo prototype, your simulated message has been validated and recorded. For instant real-time response, please reach out via WhatsApp.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary px-6 py-2 rounded-full text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#132328] block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Maya Sharma"
                        className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#132328] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. maya@example.com"
                        className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#132328] block mb-1">
                        Phone Number (with country code) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#132328] block mb-1">
                        Room Type of Interest
                      </label>
                      <select
                        value={formData.roomInterest}
                        onChange={(e) => setFormData({ ...formData, roomInterest: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840]"
                      >
                        <option value="Double Room With Sea View">Double Room With Sea View</option>
                        <option value="Double Room With Balcony">Double Room With Balcony</option>
                        <option value="Family Room with Side Sea View">Family Room with Side Sea View</option>
                        <option value="Family Room With Sea View">Family Room With Sea View</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#132328] block mb-1">
                      Intended Stay Dates
                    </label>
                    <input
                      type="text"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      placeholder="e.g. 15 Nov to 20 Nov (5 nights)"
                      className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#132328] block mb-1">
                      Your Message or Special Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements, airport taxi needs, or questions..."
                      className="w-full bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 text-xs text-[#132328] focus:outline-none focus:border-[#224840]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4 text-[#CBA135]" />
                    <span>Submit Direct Stay Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section Embed */}
        <div className="rounded-3xl overflow-hidden border border-[#E8E2D5] shadow-xl relative aspect-[21/9] bg-[#F3EFE6] mb-12">
          <iframe
            title="Serene Beach Agonda Map Location"
            src={PROPERTY_DATA.directionsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
