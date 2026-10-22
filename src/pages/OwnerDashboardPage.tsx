import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, IndianRupee, CalendarCheck, PiggyBank, TrendingUp, MapPin, Globe,
  CalendarSearch, CreditCard, BellRing, CheckCircle2, Circle, ArrowRight, Info,
} from 'lucide-react';
import { BookingConfirmationData } from '../types';
import { ROOMS_DATA } from '../data/rooms';

const formatINR = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

const TOTAL_ROOMS = ROOMS_DATA.reduce((sum, r) => sum + r.availabilityCount, 0);

interface DashboardRow {
  ref: string;
  guest: string;
  room: string;
  checkIn: string;
  nights: number;
  amount: number;
  payment: string;
  isSample: boolean;
}

// Illustrative rows so the dashboard never looks empty during the demo
const SAMPLE_ROWS: DashboardRow[] = [
  { ref: 'SBA-2026-418203', guest: 'Ananya R. (Bengaluru)', room: 'Double Room With Sea View', checkIn: '2026-11-07', nights: 3, amount: 16800, payment: 'Razorpay • UPI', isSample: true },
  { ref: 'SBA-2026-552917', guest: 'Daniel & Mia K. (Berlin)', room: 'Family Room With Sea View', checkIn: '2026-11-14', nights: 5, amount: 39200, payment: 'Razorpay • Card', isSample: true },
  { ref: 'SBA-2026-307644', guest: 'Rohit S. (Pune)', room: 'Double Room With Balcony', checkIn: '2026-11-21', nights: 2, amount: 9408, payment: 'Pay at property', isSample: true },
  { ref: 'SBA-2026-691085', guest: 'Priya & family (Mumbai)', room: 'Family Room with Side Sea View', checkIn: '2026-12-02', nights: 4, amount: 22400, payment: 'Razorpay • UPI', isSample: true },
];

function readHistory(): DashboardRow[] {
  try {
    const history: BookingConfirmationData[] = JSON.parse(localStorage.getItem('sba_booking_history') || '[]');
    return history.map(b => ({
      ref: b.bookingReference,
      guest: b.guest.fullName || 'Website guest',
      room: b.selectedRoom.name,
      checkIn: b.search.checkIn,
      nights: b.financials.nights,
      amount: b.financials.grandTotal,
      payment: b.paymentMethod === 'pay_at_property' ? 'Pay at property' : 'Razorpay (test)',
      isSample: false,
    }));
  } catch (e) {
    return [];
  }
}

const Slider: React.FC<{
  label: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void;
}> = ({ label, value, min, max, step, display, onChange }) => (
  <label className="block">
    <div className="flex items-center justify-between text-xs mb-1.5">
      <span className="font-bold text-[#0D2229]">{label}</span>
      <span className="font-condensed font-black text-base text-[#224840]">{display}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full accent-[#224840]"
    />
  </label>
);

export const OwnerDashboardPage: React.FC = () => {
  const rows = useMemo(() => [...readHistory(), ...SAMPLE_ROWS], []);
  const liveCount = rows.filter(r => !r.isSample).length;

  const totalRevenue = rows.reduce((s, r) => s + r.amount, 0);
  const totalNights = rows.reduce((s, r) => s + r.nights, 0);

  // Commission calculator inputs
  const [rooms, setRooms] = useState(TOTAL_ROOMS);
  const [rate, setRate] = useState(5000);
  const [occupancy, setOccupancy] = useState(60);
  const [commission, setCommission] = useState(18);
  const [directShare, setDirectShare] = useState(30);
  const GATEWAY_FEE = 2; // approx. Razorpay standard fee, %

  const annualRoomRevenue = rooms * rate * 365 * (occupancy / 100);
  const shiftedRevenue = annualRoomRevenue * (directShare / 100);
  const commissionAvoided = shiftedRevenue * (commission / 100);
  const gatewayCost = shiftedRevenue * (GATEWAY_FEE / 100);
  const netSaving = commissionAvoided - gatewayCost;

  const stats = [
    { icon: CalendarCheck, label: 'Direct bookings', value: String(rows.length), sub: `${totalNights} room nights` },
    { icon: IndianRupee, label: 'Direct revenue', value: formatINR(totalRevenue), sub: 'Paid to your own account' },
    { icon: PiggyBank, label: 'OTA commission avoided', value: formatINR(totalRevenue * 0.18), sub: 'vs. ~18% OTA commission' },
    { icon: TrendingUp, label: 'Avg. booking value', value: formatINR(totalRevenue / rows.length), sub: 'Per reservation' },
  ];

  const journey = [
    { icon: MapPin, title: 'Found on Google', desc: 'Guest sees Serene Beach Agonda on Google Maps / Search with a “Website” and “Book” link.' },
    { icon: Globe, title: 'Visits your website', desc: 'Your photos, rooms, reviews and offers — under your own brand, no competitor listings.' },
    { icon: CalendarSearch, title: 'Checks live availability', desc: 'Real-time rooms and rates, synced with your channel manager so nothing is double-booked.' },
    { icon: CreditCard, title: 'Pays you directly', desc: 'Razorpay checkout (UPI, cards, net banking) into your own merchant account.' },
    { icon: BellRing, title: 'You get notified', desc: 'Booking lands here with a WhatsApp / email alert, and the guest becomes yours for repeat stays.' },
  ];

  const checklist = [
    { done: true, label: 'Branded website with all 4 room categories' },
    { done: true, label: 'Booking flow with GST-inclusive pricing' },
    { done: true, label: 'Razorpay checkout (test mode demo)' },
    { done: true, label: 'Guest reviews, gallery, location & FAQs' },
    { done: false, label: 'Your actual room photos, rates & policies' },
    { done: false, label: 'Live availability sync with your channel manager' },
    { done: false, label: 'Razorpay live merchant account (payouts to your bank)' },
    { done: false, label: 'Google Business Profile website + booking link' },
    { done: false, label: 'Your own domain, WhatsApp number & email alerts' },
  ];

  return (
    <main className="w-full bg-[#FBF9F5] pb-20">
      {/* Header */}
      <section className="bg-[#0D2229] text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#CBA135]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#DFB953] text-[10px] font-bold uppercase tracking-widest mb-4">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Owner Preview • Demo data • Private login when live
          </div>
          <span className="font-script text-[#DFB953] text-4xl sm:text-5xl block mb-1">Your property, your bookings</span>
          <h1 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-4xl">
            The Serene Beach Agonda Direct-Booking Dashboard
          </h1>
          <p className="text-sm sm:text-base text-[#A8B5B2] mt-4 max-w-2xl leading-relaxed">
            Every booking made on your website shows up here: guest, room, dates and payment, with no commission taken.
            Make a test booking on the site and it appears in the table below.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10 space-y-10">
        {/* KPI tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white border border-[#E8E2D5] rounded-2xl p-5 shadow-sm">
              <s.icon className="w-5 h-5 text-[#CBA135] mb-3" />
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#566B70]">{s.label}</div>
              <div className="font-condensed font-black text-2xl sm:text-3xl text-[#0D2229] mt-0.5">{s.value}</div>
              <div className="text-[11px] text-[#A8B5B2] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Bookings table */}
        <div className="bg-white border border-[#E8E2D5] rounded-3xl shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-[#E8E2D5]">
            <div>
              <h2 className="font-condensed font-black uppercase text-xl text-[#0D2229]">Recent website bookings</h2>
              <p className="text-xs text-[#566B70]">
                {liveCount > 0
                  ? `${liveCount} booking${liveCount > 1 ? 's' : ''} made in this browser, plus sample entries`
                  : 'Sample entries shown. Make a test booking to see it appear here.'}
              </p>
            </div>
            <Link to="/booking" className="btn-primary px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-2">
              Make a test booking <ArrowRight className="w-3.5 h-3.5 text-[#CBA135]" />
            </Link>
          </div>
          {/* Phone layout: one card per booking */}
          <div className="sm:hidden divide-y divide-[#E8E2D5]">
            {rows.map(r => (
              <div key={r.ref} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-[#0D2229] truncate">{r.guest}</div>
                    <div className="text-xs text-[#566B70] truncate">{r.room}</div>
                  </div>
                  <div className="font-condensed font-black text-lg text-[#224840] shrink-0">{formatINR(r.amount)}</div>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-[#566B70]">
                  <span>{new Date(r.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {r.nights} night{r.nights > 1 ? 's' : ''}</span>
                  <span>{r.payment}</span>
                  {r.isSample
                    ? <span className="text-[9px] font-bold uppercase tracking-wider text-[#A8B5B2] bg-[#F3EFE6] px-1.5 py-0.5 rounded">Sample</span>
                    : <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#224840] px-1.5 py-0.5 rounded">New</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-[#A8B5B2] bg-[#FBF9F5]">
                  <th className="px-6 py-3 font-bold">Reference</th>
                  <th className="px-4 py-3 font-bold">Guest</th>
                  <th className="px-4 py-3 font-bold">Room</th>
                  <th className="px-4 py-3 font-bold">Check-in</th>
                  <th className="px-4 py-3 font-bold">Nights</th>
                  <th className="px-4 py-3 font-bold">Payment</th>
                  <th className="px-6 py-3 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.ref} className="border-t border-[#E8E2D5]/70">
                    <td className="px-6 py-3.5 font-mono text-xs text-[#0D2229] whitespace-nowrap">
                      {r.ref}
                      {r.isSample
                        ? <span className="ml-2 text-[9px] font-sans font-bold uppercase tracking-wider text-[#A8B5B2] bg-[#F3EFE6] px-1.5 py-0.5 rounded">Sample</span>
                        : <span className="ml-2 text-[9px] font-sans font-bold uppercase tracking-wider text-white bg-[#224840] px-1.5 py-0.5 rounded">New</span>}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-[#0D2229]">{r.guest}</td>
                    <td className="px-4 py-3.5 text-[#566B70]">{r.room}</td>
                    <td className="px-4 py-3.5 text-[#566B70] whitespace-nowrap">
                      {new Date(r.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3.5 text-[#566B70]">{r.nights}</td>
                    <td className="px-4 py-3.5 text-[#566B70]">{r.payment}</td>
                    <td className="px-6 py-3.5 text-right font-condensed font-black text-base text-[#224840]">{formatINR(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission savings calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-condensed font-black uppercase text-2xl text-[#0D2229]">How much could you keep?</h2>
            <p className="text-xs text-[#566B70] mt-1 mb-6">
              Move the sliders to match your property. Shows what you'd save each year if part of your OTA bookings came in directly.
            </p>
            <div className="space-y-5">
              <Slider label="Rooms" value={rooms} min={1} max={40} step={1} display={String(rooms)} onChange={setRooms} />
              <Slider label="Average nightly rate" value={rate} min={1500} max={15000} step={250} display={formatINR(rate)} onChange={setRate} />
              <Slider label="Average occupancy" value={occupancy} min={10} max={100} step={5} display={`${occupancy}%`} onChange={setOccupancy} />
              <Slider label="OTA commission" value={commission} min={10} max={25} step={1} display={`${commission}%`} onChange={setCommission} />
              <Slider label="Share of bookings moved to direct" value={directShare} min={5} max={80} step={5} display={`${directShare}%`} onChange={setDirectShare} />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#224840] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#DFB953]">Estimated extra profit per year</div>
            <div className="font-condensed font-black text-5xl sm:text-6xl mt-1">{formatINR(netSaving)}</div>
            <div className="text-sm text-[#E8E2D5] mt-1">≈ {formatINR(netSaving / 12)} every month</div>

            <div className="mt-6 space-y-3 text-sm border-t border-white/15 pt-5">
              <div className="flex justify-between gap-4">
                <span className="text-[#E8E2D5]">Room revenue booked direct</span>
                <span className="font-bold">{formatINR(shiftedRevenue)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#E8E2D5]">OTA commission avoided</span>
                <span className="font-bold text-[#DFB953]">+ {formatINR(commissionAvoided)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#E8E2D5]">Payment gateway fees (~{GATEWAY_FEE}%)</span>
                <span className="font-bold">− {formatINR(gatewayCost)}</span>
              </div>
            </div>

            <p className="mt-auto pt-6 text-[11px] text-[#A8B5B2] flex gap-2">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              Estimate only. Actual figures depend on your OTA contracts, seasonality and Razorpay plan.
            </p>
          </div>
        </div>

        {/* Guest journey */}
        <div>
          <h2 className="font-condensed font-black uppercase text-2xl sm:text-3xl text-[#0D2229] mb-5">From Google search to money in your account</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {journey.map((step, i) => (
              <div key={step.title} className="bg-white border border-[#E8E2D5] rounded-2xl p-5 relative">
                <span className="absolute top-4 right-4 font-condensed font-light text-3xl text-[#CBA135]/60">0{i + 1}</span>
                <div className="w-10 h-10 rounded-xl bg-[#224840]/10 flex items-center justify-center mb-3">
                  <step.icon className="w-5 h-5 text-[#224840]" />
                </div>
                <div className="font-condensed font-black uppercase text-base text-[#0D2229]">{step.title}</div>
                <p className="text-xs text-[#566B70] mt-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Go-live checklist */}
        <div className="bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-condensed font-black uppercase text-2xl text-[#0D2229]">What's ready & what's next</h2>
              <p className="text-xs text-[#566B70] mt-1">The demo is built. These are the steps to take it live for Serene Beach Agonda.</p>
            </div>
            <div className="text-xs font-bold text-[#224840] bg-[#224840]/10 px-3 py-1.5 rounded-full">
              {checklist.filter(c => c.done).length} of {checklist.length} done
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checklist.map(item => (
              <div
                key={item.label}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border ${item.done ? 'bg-[#224840]/5 border-[#224840]/20' : 'bg-[#FBF9F5] border-[#E8E2D5]'}`}
              >
                {item.done
                  ? <CheckCircle2 className="w-5 h-5 text-[#224840] shrink-0" />
                  : <Circle className="w-5 h-5 text-[#CBA135] shrink-0" />}
                <span className={`text-sm ${item.done ? 'text-[#0D2229] font-semibold' : 'text-[#566B70]'}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <Link to="/" className="text-xs font-bold uppercase tracking-wider text-[#566B70] hover:text-[#0D2229] transition-colors">
            ← Back to the guest website
          </Link>
        </div>
      </div>
    </main>
  );
};
