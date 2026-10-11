import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#FBF9F5] border-t border-[#E8E2D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-script text-[#C86D51] text-3xl sm:text-4xl block mb-1">
            Clear & Honest Answers
          </span>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#CBA135]" />
            Frequently Asked Questions
          </div>
          <h2 className="font-condensed font-black uppercase tracking-tight text-3xl sm:text-5xl text-[#0D2229]">
            Everything You Need to Know
          </h2>
          <p className="text-sm sm:text-base text-[#566B70] mt-3">
            Clear, transparent answers about our rooms, direct booking terms, check-in policies, and getting to Agonda.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#E8E2D5] rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#224840] bg-[#224840]/10 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <span className="font-condensed font-bold text-lg sm:text-xl text-[#0D2229] tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#566B70] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#224840]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#566B70] leading-relaxed border-t border-[#E8E2D5]/50 animate-fadeIn">
                    <p>{faq.answer}</p>
                    {faq.isPendingConfirmation && (
                      <div className="mt-2.5 text-xs text-[#C86D51] flex items-center gap-1.5 bg-[#C86D51]/10 px-3 py-1.5 rounded-lg">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Note: Detailed policy awaiting property owner confirmation.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
