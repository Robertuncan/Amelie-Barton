import React, { useState } from 'react';
import { SiteData } from '../types';
import { MapPin, Award, UserCheck, MessageSquare } from 'lucide-react';

interface AboutSectionProps {
  siteData: SiteData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ siteData }) => {
  const [imageError, setImageError] = useState(false);

  const icons = [
    <MapPin key="map" className="w-5 h-5 text-[var(--color-primary-light)]" />,
    <Award key="award" className="w-5 h-5 text-[var(--color-primary-light)]" />,
    <UserCheck key="user" className="w-5 h-5 text-[var(--color-primary-light)]" />
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Studio visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] aspect-[4/5] bg-stone-200 relative group">
                <img
                  src={imageError ? siteData.about.fallbackImage : siteData.about.image}
                  alt="Amelie Barton in Sutton Studio"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700 ease-out"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Overlay Nameplate */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl text-[var(--color-ink)]">
                  <p className="font-heading text-lg font-medium">Amelie Barton</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">Independent Website Designer & Strategist</p>
                  <p className="text-[11px] text-[var(--color-primary-light)] font-semibold mt-1">
                    Based at 1 Gemini Court, Sutton SM1
                  </p>
                </div>
              </div>

              {/* Decorative outline box */}
              <div className="absolute -top-4 -left-4 -z-10 w-full h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-primary-subtle)] opacity-40 hidden sm:block"></div>
            </div>
          </div>

          {/* Right Column: Bio Copy & Highlights */}
          <div className="lg:col-span-7">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-light)] mb-3">
              {siteData.about.eyebrow}
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-ink)] mb-6">
              {siteData.about.title}
            </h2>

            <p className="text-lg sm:text-xl text-[var(--color-ink)] font-normal leading-relaxed mb-6">
              {siteData.about.lead}
            </p>

            <div className="space-y-4 text-base text-[var(--color-ink-muted)] leading-relaxed mb-10">
              {siteData.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Highlights Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {siteData.about.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-2xs flex flex-col justify-between"
                >
                  <div className="mb-2">
                    {icons[idx] || <MapPin className="w-5 h-5 text-[var(--color-primary-light)]" />}
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] block font-medium">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-ink)]">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Consultation Link */}
            <a
              href={siteData.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] underline underline-offset-4"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss a project directly with Amelie →</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};
