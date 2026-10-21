import React, { useState } from 'react';
import { SiteData, ThemeSettings } from '../types';
import { MessageCircle, ArrowRight, BookOpen, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  siteData: SiteData;
  theme: ThemeSettings;
  onOpenJournal: () => void;
  onOpenEditor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ siteData, theme, onOpenJournal, onOpenEditor }) => {
  const [imageError, setImageError] = useState(false);

  const displayImage = imageError
    ? siteData.hero.fallbackImage
    : theme.heroBgType === 'custom' && theme.heroCustomImage
    ? theme.heroCustomImage
    : siteData.hero.image;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Ambient background glow orbs */}
      {theme.showAmbientOrbs && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25"
            style={{ backgroundColor: 'var(--color-primary-light)' }}
          ></div>
          <div
            className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
            style={{ backgroundColor: 'var(--color-primary)' }}
          ></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--color-primary-subtle)] text-[var(--color-primary-light)] border border-[var(--color-border)] mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
              <span>{siteData.hero.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-ink)] leading-[1.12] mb-6">
              {siteData.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[var(--color-ink-muted)] leading-relaxed max-w-2xl mb-8 font-light">
              {siteData.hero.subheadline}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href={siteData.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-md hover:shadow-lg transition-all duration-200 active:scale-98"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>Message on WhatsApp</span>
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium rounded-full bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] hover:border-[var(--color-primary-light)] transition-all duration-200"
              >
                <span>View Services</span>
                <ArrowRight className="w-4 h-4 text-[var(--color-ink-muted)]" />
              </a>

              <button
                onClick={onOpenJournal}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-primary-subtle)] transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-[var(--color-primary-light)]" />
                <span>Read Journal</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-[var(--color-ink-muted)]">
              <span className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Direct consultation
              </span>
              <span className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-[var(--color-primary-light)]" />
                Sutton studio on Throwley Way
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Fast turnarounds
              </span>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div className="aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden bg-stone-200 relative group">
                  <img
                    src={displayImage}
                    alt="Amelie Barton Studio"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                    onError={() => setImageError(true)}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Floating studio badge on photo */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/40 shadow-lg flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-neutral-900">Bespoke Web Studio</p>
                      <p className="text-neutral-500 text-[11px]">1 Gemini Court, Throwley Way, Sutton</p>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-900 rounded font-semibold text-[10px] uppercase tracking-wider">
                      Open for Commissions
                    </span>
                  </div>
                </div>

                {/* Handover & customization subcard */}
                <div className="p-4 bg-[var(--color-bg-alt)] border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Active Theme: <strong className="text-[var(--color-ink)]">{theme.presetName}</strong></span>
                  </div>
                  <button
                    onClick={onOpenEditor}
                    className="text-xs font-semibold text-[var(--color-primary-light)] hover:text-[var(--color-primary)] underline underline-offset-4"
                  >
                    Edit & Handover
                  </button>
                </div>
              </div>

              {/* Decorative shadow accent */}
              <div
                className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-2xl border -rotate-1 hidden sm:block opacity-40 pointer-events-none"
                style={{
                  backgroundColor: 'var(--color-primary-subtle)',
                  borderColor: 'var(--color-border)'
                }}
              ></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
