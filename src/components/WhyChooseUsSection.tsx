import React from 'react';
import { SiteData } from '../types';

interface WhyChooseUsSectionProps {
  siteData: SiteData;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ siteData }) => {
  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-[var(--color-bg-alt)] border-t border-[var(--color-border-subtle)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-light)] mb-3">
            {siteData.whyChooseUs.eyebrow}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-ink)] mb-4">
            {siteData.whyChooseUs.title}
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-ink-muted)]">
            {siteData.whyChooseUs.description}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.whyChooseUs.items.map((item) => (
            <div
              key={item.number}
              className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary-light)] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="font-heading text-3xl font-light text-[var(--color-primary-light)] block mb-6 group-hover:scale-105 transition-transform origin-left">
                  {item.number}
                </span>
                <h3 className="font-heading text-xl font-medium text-[var(--color-ink)] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="w-8 h-0.5 bg-[var(--color-border)] mt-8 group-hover:w-16 group-hover:bg-[var(--color-primary)] transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
