import React, { useState } from 'react';
import { SiteData, ServiceItem } from '../types';
import { ArrowUpRight, CheckCircle2, Clock, X, MessageCircle } from 'lucide-react';

interface ServicesSectionProps {
  siteData: SiteData;
  onFilterBlogByService?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ siteData, onFilterBlogByService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(siteData.services.items.map(s => s.category)))];

  const filteredServices = selectedCategory === 'all'
    ? siteData.services.items
    : siteData.services.items.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[var(--color-bg-alt)] relative border-t border-[var(--color-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-light)] mb-3">
            {siteData.services.eyebrow}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-ink)] mb-4">
            {siteData.services.title}
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-ink-muted)]">
            {siteData.services.description}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-[var(--color-surface)] text-[var(--color-ink-muted)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] hover:text-[var(--color-ink)]'
              }`}
            >
              {cat === 'all' ? `All Services (${siteData.services.items.length})` : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveService(service)}
              className="group cursor-pointer rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary-light)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="aspect-[16/10] overflow-hidden bg-stone-200 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-[var(--color-ink)] shadow-xs">
                    {service.number}
                  </div>
                  <div className="absolute top-3 right-3 bg-[var(--color-primary-subtle)] px-2.5 py-1 rounded-full text-[10px] font-semibold text-[var(--color-primary-light)] border border-[var(--color-border)]">
                    {service.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors mb-2.5 flex items-center justify-between">
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-ink-faint)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-sm text-[var(--color-ink-muted)] line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
                <span className="font-medium text-[var(--color-primary-light)]">View Deliverables</span>
                {service.timeline && (
                  <span className="flex items-center gap-1 text-[var(--color-ink-faint)]">
                    <Clock className="w-3.5 h-3.5" />
                    {service.timeline}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[var(--color-surface)] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden bg-stone-200">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-stone-900 transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold text-purple-200">
                  Service {activeService.number} · {activeService.category}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl text-white font-medium mt-1">
                  {activeService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs uppercase font-semibold text-[var(--color-ink-muted)] tracking-wider mb-2">
                  Scope & Architectural Purpose
                </h4>
                <p className="text-base text-[var(--color-ink)] leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {activeService.deliverables && (
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[var(--color-ink-muted)] tracking-wider mb-3">
                    Key Deliverables & Standards
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[var(--color-bg-alt)] text-sm text-[var(--color-ink)] border border-[var(--color-border-subtle)]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeService.timeline && (
                <div className="p-4 rounded-xl bg-[var(--color-primary-subtle)] border border-[var(--color-border)] flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-[var(--color-ink)] font-medium">
                    <Clock className="w-4 h-4 text-[var(--color-primary-light)]" />
                    <span>Estimated Completion Timeline</span>
                  </div>
                  <span className="font-semibold text-[var(--color-primary)]">
                    {activeService.timeline}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-6 bg-[var(--color-bg-alt)] border-t border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--color-ink-muted)]">
                  Direct partnership in Sutton SM1
                </span>
                {onFilterBlogByService && (
                  <button
                    type="button"
                    onClick={() => {
                      const serviceId = activeService.id;
                      setActiveService(null);
                      onFilterBlogByService(serviceId);
                    }}
                    className="text-xs font-semibold text-[var(--color-primary-light)] hover:underline cursor-pointer"
                  >
                    📖 Read GMB & Strategy Guide →
                  </button>
                )}
              </div>
              <a
                href={`https://wa.me/447915929263?text=Hi%20Amelie%2C%20I'm%20interested%20in%20your%20${encodeURIComponent(activeService.title)}%20service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Inquire About This Service</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
