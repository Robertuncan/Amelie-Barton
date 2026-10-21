import React, { useState } from 'react';
import { SiteData, ThemeSettings } from '../types';
import { MessageCircle, Sliders, Menu, X, BookOpen, Sparkles, MapPin } from 'lucide-react';

interface NavbarProps {
  siteData: SiteData;
  theme: ThemeSettings;
  onOpenEditor: () => void;
  blogCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ siteData, onOpenEditor, blogCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Journal', href: '#journal', badge: `${blogCount}` },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200"
      style={{
        backgroundColor: 'rgba(var(--bg-rgb, 252, 251, 249), 0.88)',
        borderColor: 'var(--color-border-subtle)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex flex-col group">
          <span className="font-heading text-2xl font-semibold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors">
            {siteData.name}
          </span>
          <span className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] flex items-center gap-1.5 font-medium -mt-0.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></span>
            {siteData.role} · {siteData.location.locality}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors rounded-md relative group"
            >
              <span className="flex items-center gap-1.5">
                {link.label}
                {link.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-[var(--color-primary-subtle)] text-[var(--color-primary-light)] rounded-full border border-[var(--color-border)]">
                    {link.badge}
                  </span>
                )}
              </span>
              <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Handover & Customizer Trigger */}
          <button
            onClick={onOpenEditor}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] hover:border-[var(--color-primary-light)] transition-all shadow-xs"
            title="Customize Background, Handover Settings & Manage Blog Posts"
          >
            <Sliders className="w-3.5 h-3.5 text-[var(--color-primary-light)]" />
            <span>Customize & Handover</span>
          </button>

          {/* WhatsApp Primary CTA */}
          <a
            href={siteData.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span className="hidden xs:inline">WhatsApp</span>
            <span className="xs:hidden">Chat</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in fade-in duration-200">
          <div className="py-2 flex items-center justify-between text-xs text-[var(--color-ink-muted)] border-b border-[var(--color-border-subtle)] mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-primary-light)]" />
              {siteData.location.fullAddress}
            </span>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium text-[var(--color-ink)] hover:bg-[var(--color-bg-alt)]"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--color-primary-subtle)] text-[var(--color-primary-light)] rounded-full">
                  {link.badge} posts
                </span>
              )}
            </a>
          ))}

          <div className="pt-3 border-t border-[var(--color-border-subtle)] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditor();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
            >
              <Sliders className="w-4 h-4 text-[var(--color-primary-light)]" />
              <span>Customize Background & Handover</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
