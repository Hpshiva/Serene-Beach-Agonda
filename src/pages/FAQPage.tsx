import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, MessageSquare, ShieldCheck } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';
import { PROPERTY_DATA } from '../data/property';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ['All', 'Booking & Pricing', 'Check-in & Stay', 'Location & Travel', 'Policies'];

  const filteredFAQs = FAQS_DATA.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-[#FBF9F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-script text-[#C86D51] text-3xl sm:text-5xl block mb-1">
            Questions & Answers
          </span>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#224840] mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#CBA135]" />
            Guest Knowledge Base
          </div>
          <h1 className="font-condensed font-black uppercase tracking-tight text-4xl sm:text-6xl text-[#0D2229] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-[#566B70]">
            Transparent answers regarding direct rates, cancellation policies, check-in logistics, and travel guidance for Serene Beach Agonda.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-[#566B70] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. cancellation, check-in, breakfast, airport)..."
            className="w-full bg-white border border-[#E8E2D5] rounded-2xl pl-12 pr-4 py-3.5 text-sm text-[#132328] focus:outline-none focus:border-[#224840] shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#224840] text-white shadow-sm'
                  : 'bg-white text-[#132328] border border-[#E8E2D5] hover:border-[#224840]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5 mb-16">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const isOpen = openIdx === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E8E2D5] rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
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
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E2D5]">
              <p className="text-sm text-[#566B70]">No matching questions found.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="mt-3 text-xs font-bold text-[#224840] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="bg-[#224840] text-white rounded-3xl p-8 text-center shadow-lg">
          <h3 className="font-condensed font-bold uppercase tracking-tight text-2xl mb-2">Still Have Questions?</h3>
          <p className="text-xs sm:text-sm text-[#E8E2D5] max-w-md mx-auto mb-6">
            Our host in Agonda is just a message away. Reach out on WhatsApp for quick answers regarding your stay dates.
          </p>
          <a
            href={`https://wa.me/${PROPERTY_DATA.contacts.whatsapp}?text=Hi%20Serene%20Beach%20Agonda%2C%20I%20have%20a%20question%20about%20booking.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-[#0D2229] px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold shadow-md hover:bg-[#20bd5a] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat With Host on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
