import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, BadgePercent, ShieldCheck } from 'lucide-react';
import { ROOMS_DATA } from '../data/rooms';

const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const DirectVsOtaComparison: React.FC = () => {
  const [roomId, setRoomId] = useState(ROOMS_DATA[2].id);
  const [nights, setNights] = useState(3);

  const room = ROOMS_DATA.find(r => r.id === roomId) || ROOMS_DATA[0];
  const otaTotal = room.rackRate * nights;
  const directTotal = room.directRate * nights;
  const saving = otaTotal - directTotal;

  const directOnlyPerks = [
    "Best available nightly rate",
    "Breakfast upgrade option at the table",
    "Free date changes up to 7 days before",
    "WhatsApp line straight to the host",
    "Sea-facing room placement on request",
  ];

  return (
    <section id="book-direct" className="py-20 sm:py-24 bg-[#F3EFE6]/60 border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="font-script text-[#C86D51] text-4xl sm:text-5xl block mb-2">
            Why Book Direct?
          </span>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-3">
            <BadgePercent className="w-3.5 h-3.5 text-[#CBA135]" />
            Same Room • Better Price • Real Perks
          </div>
          <h2 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl text-[#0D2229] leading-[0.95]">
            Book Here, Not Through a Middleman
          </h2>
          <p className="text-sm sm:text-base text-[#566B70] mt-4 leading-relaxed max-w-2xl">
            Booking apps charge us a commission on every stay. When you book on our own website, that money goes back to you as a lower rate and extra perks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Live price comparison */}
          <div className="lg:col-span-7 bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-6">
              <select
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                className="flex-1 min-w-[200px] bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-3 py-2.5 text-sm font-semibold text-[#0D2229] focus:outline-none focus:border-[#224840]"
                aria-label="Choose a room"
              >
                {ROOMS_DATA.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              <div className="flex items-center gap-2 bg-[#FBF9F5] border border-[#E8E2D5] rounded-xl px-2 py-1">
                <button
                  type="button"
                  onClick={() => setNights(n => Math.max(1, n - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-[#E8E2D5] font-bold text-[#224840]"
                  aria-label="Fewer nights"
                >−</button>
                <span className="text-sm font-bold text-[#0D2229] w-20 text-center">{nights} night{nights > 1 ? 's' : ''}</span>
                <button
                  type="button"
                  onClick={() => setNights(n => Math.min(14, n + 1))}
                  className="w-8 h-8 rounded-lg hover:bg-[#E8E2D5] font-bold text-[#224840]"
                  aria-label="More nights"
                >+</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#E8E2D5] bg-[#FBF9F5] p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#A8B5B2] mb-2">
                  Typical OTA price
                </div>
                <div className="font-condensed font-black text-3xl text-[#566B70] line-through decoration-[#C86D51]/60">
                  {formatINR(otaTotal)}
                </div>
                <div className="text-xs text-[#A8B5B2] mt-1">{formatINR(room.rackRate)} / night on booking apps</div>
              </div>
              <div className="rounded-2xl border-2 border-[#224840] bg-[#224840] text-white p-5 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#CBA135]/20" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#DFB953] mb-2">
                  Direct on this website
                </div>
                <div className="font-condensed font-black text-3xl">{formatINR(directTotal)}</div>
                <div className="text-xs text-[#E8E2D5] mt-1">{formatINR(room.directRate)} / night + perks below</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#CBA135]/10 border border-[#CBA135]/30 px-5 py-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#224840]">You keep</div>
                <div className="font-condensed font-black text-2xl text-[#0D2229]">
                  {formatINR(saving)} <span className="text-sm font-bold text-[#566B70] normal-case">on this stay</span>
                </div>
              </div>
              <Link
                to="/booking"
                className="btn-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
              >
                <span>Book Direct Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CBA135]" />
              </Link>
            </div>
          </div>

          {/* Perk checklist */}
          <div className="lg:col-span-5 bg-white border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-4 items-center text-sm">
              <span />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8B5B2] text-center w-14">OTA</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#224840] text-center w-14">Direct</span>
              {directOnlyPerks.map(perk => (
                <React.Fragment key={perk}>
                  <span className="text-[#0D2229] font-medium leading-snug">{perk}</span>
                  <span className="flex justify-center w-14">
                    <X className="w-4 h-4 text-[#C86D51]/70" />
                  </span>
                  <span className="flex justify-center w-14">
                    <span className="w-6 h-6 rounded-full bg-[#224840] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                  </span>
                </React.Fragment>
              ))}
            </div>
            <div className="mt-6 lg:mt-auto pt-6 flex items-start gap-2.5 text-xs text-[#566B70] border-t border-[#E8E2D5]">
              <ShieldCheck className="w-4 h-4 text-[#224840] shrink-0 mt-0.5" />
              <span>Secure online payment via Razorpay (UPI, cards, net banking), or pay at the property on arrival.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
