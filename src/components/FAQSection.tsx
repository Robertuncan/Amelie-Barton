import React, { useState } from 'react';
import { SiteData } from '../types';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  siteData: SiteData;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ siteData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[var(--color-bg-alt)] border-t border-[var(--color-border-subtle)] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-light)] mb-3">
            {siteData.faq.eyebrow}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-ink)] mb-4">
            {siteData.faq.title}
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-ink-muted)]">
            {siteData.faq.description}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {siteData.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 sm:px-8 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--color-bg-alt)]/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-lg sm:text-xl font-medium text-[var(--color-ink)]">
                    {item.question}
                  </span>
                  <div className={`p-1 rounded-full text-[var(--color-ink-muted)] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[var(--color-ink-muted)] leading-relaxed border-t border-[var(--color-border-subtle)]/50 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
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
