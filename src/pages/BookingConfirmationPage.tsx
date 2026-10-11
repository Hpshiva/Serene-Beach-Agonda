import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
  Home,
  MessageSquare,
  Calendar,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { PROPERTY_DATA } from '../data/property';
import { ROOMS_DATA } from '../data/rooms';

export const BookingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { confirmationData, resetBooking } = useBooking();

  // If no confirmation data found in memory or storage, provide friendly placeholder or redirect
  const booking = confirmationData || {
    bookingReference: 'SBA-2026-849102',
    createdAt: new Date().toISOString(),
    guest: {
      fullName: 'Maya Sharma',
      email: 'maya.sharma@example.com',
      phone: '+91 98765 43210',
      estimatedArrivalTime: '14:00',
    },
    search: {
      checkIn: '2026-10-15',
      checkOut: '2026-10-18',
      adults: 2,
      children: 0,
      roomsCount: 1,
    },
    selectedRoom: ROOMS_DATA[2],
    selectedMealPlan: ROOMS_DATA[2].mealPlans[1],
    financials: {
      nights: 3,
      roomSubtotal: 15000,
      extraBedCharges: 0,
      mealPlanCharges: 2700,
      grossAmount: 17700,
      directSavings: 1500,
      taxRate: 0.12,
      taxAmount: 2124,
      grandTotal: 19824,
    },
    paymentMethod: 'razorpay' as const,
    paymentStatus: 'simulated_test' as const,
    transactionId: 'pay_demo_9a8b7c6d5e',
    isDemoBooking: true,
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewBooking = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <div className="w-full bg-[#FBF9F5] min-h-screen py-10 sm:py-16 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Printable Voucher Card */}
        <div className="bg-white border-2 border-[#E8E2D5] rounded-3xl overflow-hidden shadow-xl print:border-none print:shadow-none">
          {/* Header Strip */}
          <div className="bg-[#224840] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#CBA135] text-[#0D2229] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="font-script text-[#CBA135] text-3xl sm:text-4xl block mb-1">
                  Thank You
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#CBA135]">
                  DIRECT RESERVATION CONFIRMED
                </span>
                <h1 className="font-condensed font-black uppercase tracking-tight text-2xl sm:text-4xl">
                  We Look Forward to Welcoming You!
                </h1>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 self-start sm:self-auto">
              <div className="text-[10px] text-[#A8B5B2] uppercase">Booking Reference</div>
              <div className="font-mono text-base sm:text-lg font-bold tracking-wider text-[#CBA135]">
                {booking.bookingReference}
              </div>
            </div>
          </div>

          {/* Voucher Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Demo Notice Banner */}
            <div className="bg-[#FBF9F5] border border-[#E8E2D5] rounded-2xl p-4 text-xs text-[#566B70] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#224840] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0D2229]">Interactive Demo Voucher:</strong> This document represents a complete demonstration voucher. In production, this confirmation is automatically synced with the property's PMS channel manager and dispatched via WhatsApp and email.
              </div>
            </div>

            {/* Stay Dates & Room Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 bg-[#F3EFE6]/50 rounded-2xl border border-[#E8E2D5]">
              <div className="md:col-span-4 rounded-xl overflow-hidden aspect-[4/3] bg-white">
                <img
                  src={booking.selectedRoom.images[0]}
                  alt={booking.selectedRoom.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-8 space-y-3">
                <div className="inline-block bg-[#224840] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {booking.selectedRoom.view}
                </div>
                <h2 className="font-condensed font-bold uppercase tracking-tight text-2xl text-[#0D2229]">
                  {booking.selectedRoom.name}
                </h2>
                <div className="text-xs text-[#566B70]">
                  Meal Plan: <strong>{booking.selectedMealPlan.name}</strong>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E8E2D5] text-xs text-[#132328]">
                  <div>
                    <div className="text-[10px] uppercase text-[#566B70]">Check-in</div>
                    <div className="font-bold">{booking.search.checkIn}</div>
                    <div className="text-[10px] text-[#A8B5B2]">12:00 PM</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-[#566B70]">Check-out</div>
                    <div className="font-bold">{booking.search.checkOut}</div>
                    <div className="text-[10px] text-[#A8B5B2]">10:00 AM</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-[#566B70]">Guests</div>
                    <div className="font-bold">
                      {booking.search.adults} Adults
                      {booking.search.children > 0 ? `, ${booking.search.children} Kids` : ''}
                    </div>
                    <div className="text-[10px] text-[#A8B5B2]">({booking.financials.nights} Nights)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Details & Payment Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-white border border-[#E8E2D5] rounded-2xl p-5 space-y-2 text-xs">
                <h3 className="font-condensed font-bold uppercase tracking-wide text-sm text-[#0D2229] mb-3">
                  Guest Information
                </h3>
                <div className="flex justify-between">
                  <span className="text-[#566B70]">Guest Name:</span>
                  <span className="font-bold">{booking.guest.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#566B70]">Email:</span>
                  <span>{booking.guest.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#566B70]">Phone:</span>
                  <span>{booking.guest.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#566B70]">Arrival Time:</span>
                  <span>{booking.guest.estimatedArrivalTime || '14:00'}</span>
                </div>
              </div>

              <div className="bg-white border border-[#E8E2D5] rounded-2xl p-5 space-y-2 text-xs">
                <h3 className="font-condensed font-bold uppercase tracking-wide text-sm text-[#0D2229] mb-3">
                  Payment Status
                </h3>
                <div className="flex justify-between">
                  <span className="text-[#566B70]">Method:</span>
                  <span className="font-bold capitalize">{booking.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#566B70]">Transaction Ref:</span>
                  <span className="font-mono">{booking.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#566B70]">Status:</span>
                  <span className="inline-block bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    {booking.paymentStatus === 'pay_at_checkin' ? 'Pay at Check-in' : 'Verified (Demo Mode)'}
                  </span>
                </div>
                <div className="flex justify-between text-[#C86D51] font-semibold">
                  <span>Direct Savings:</span>
                  <span>Save ₹{booking.financials.directSavings.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="border-t border-[#E8E2D5] pt-6">
              <h3 className="font-condensed font-bold uppercase tracking-wide text-base text-[#0D2229] mb-4">
                Financial Breakdown
              </h3>
              <div className="bg-[#FBF9F5] rounded-2xl p-5 space-y-2 text-xs text-[#132328]">
                <div className="flex justify-between">
                  <span>Room Accommodation ({booking.financials.nights} nights)</span>
                  <span className="font-semibold">₹{booking.financials.roomSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {booking.financials.mealPlanCharges > 0 && (
                  <div className="flex justify-between">
                    <span>Meal Plan Add-ons</span>
                    <span className="font-semibold">+₹{booking.financials.mealPlanCharges.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#C86D51] font-semibold">
                  <span>Direct Rate Discount</span>
                  <span>-₹{booking.financials.directSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#566B70]">
                  <span>Hospitality GST ({Math.round(booking.financials.taxRate * 100)}%)</span>
                  <span>+₹{booking.financials.taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-[#E8E2D5] pt-3 flex justify-between font-bold text-base text-[#0D2229]">
                  <span>Grand Total Paid / Payable</span>
                  <span className="text-[#224840]">₹{booking.financials.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Property Contact & Directions Reminder */}
            <div className="border-t border-[#E8E2D5] pt-6 flex flex-col sm:flex-row items-start justify-between gap-4 text-xs text-[#566B70]">
              <div>
                <strong className="text-[#0D2229]">Serene Beach Agonda</strong>
                <div>{PROPERTY_DATA.address.full}</div>
                <div>Coordinates: {PROPERTY_DATA.address.coordinates.lat}, {PROPERTY_DATA.address.coordinates.lng}</div>
              </div>

              <div className="space-y-1">
                <div>WhatsApp Host: {PROPERTY_DATA.contacts.whatsappDisplay}</div>
                <div>Email: {PROPERTY_DATA.contacts.email}</div>
              </div>
            </div>
          </div>

          {/* Action Bar (Hidden when printing) */}
          <div className="bg-[#F3EFE6] px-6 py-4 border-t border-[#E8E2D5] flex flex-wrap items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="btn-secondary px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-white"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Voucher</span>
              </button>

              <a
                href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20I%20have%20completed%20booking%20reference%20${booking.bookingReference}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#25D366] text-white flex items-center gap-2 hover:bg-[#20bd5a] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Share Reference on WhatsApp</span>
              </a>
            </div>

            <button
              onClick={handleNewBooking}
              className="btn-primary px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-[#CBA135]" />
              <span>Return to Homepage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
