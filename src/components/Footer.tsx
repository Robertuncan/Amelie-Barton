import React from 'react';
import { SiteData, ThemeSettings } from '../types';
import { ArrowUp, Sliders, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  siteData: SiteData;
  theme: ThemeSettings;
  onOpenEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ siteData, theme, onOpenEditor }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-alt)] pt-16 pb-12 relative text-[var(--color-ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--color-border-subtle)]">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-ink)] block">
              {siteData.name}
            </span>
            <p className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
              {siteData.role} · {siteData.tagline}
            </p>
            <p className="text-sm text-[var(--color-ink-muted)] max-w-sm leading-relaxed">
              Bespoke website design, clean engineering, and targeted local search strategy for discerning businesses across Sutton, Surrey, and London.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)] pt-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-primary-light)]" />
              <span>{siteData.location.fullAddress}</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-light)] block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-[var(--color-ink-muted)]">
              <li><a href="#services" className="hover:text-[var(--color-ink)] transition-colors">Services & Deliverables</a></li>
              <li><a href="#about" className="hover:text-[var(--color-ink)] transition-colors">About Amelie Barton</a></li>
              <li><a href="#why-choose-us" className="hover:text-[var(--color-ink)] transition-colors">Studio Philosophy</a></li>
              <li><a href="#journal" className="hover:text-[var(--color-ink)] transition-colors font-medium text-[var(--color-primary)]">The Journal (Blog)</a></li>
              <li><a href="#faq" className="hover:text-[var(--color-ink)] transition-colors">Questions & Answers</a></li>
              <li><a href="#contact" className="hover:text-[var(--color-ink)] transition-colors">Initiate Project</a></li>
            </ul>
          </div>

          {/* Studio Handover & Customizer Panel */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-light)] block mb-2">
              Background & Handover
            </span>
            <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
              Active canvas styling: <strong className="text-[var(--color-ink)]">{theme.presetName}</strong>. You can customize background palettes, modify journal essays, or export a client handover pack anytime.
            </p>
            <button
              onClick={onOpenEditor}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-semibold text-[var(--color-ink)] hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)] transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[var(--color-primary-light)]" />
              <span>Open Customizer & Handover</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ink-muted)]">
          <p>
            © {new Date().getFullYear()} {siteData.name}. {siteData.footer.copyright}
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-[var(--color-ink)] transition-colors cursor-pointer"
          >
            <span>{siteData.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
