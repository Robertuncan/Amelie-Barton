import React, { useState } from 'react';
import { SiteData } from '../types';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  siteData: SiteData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ siteData }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Design',
    budget: '£3,000 - £5,000',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hi Amelie, my name is ${formData.name || 'there'}. I'm inquiring about ${formData.service}. Budget: ${formData.budget}. Message: ${formData.message || 'I would like to discuss a new website.'}`;
    window.open(`https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Info & Studio Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-light)] mb-3">
                {siteData.contactSection.eyebrow}
              </div>
              
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-ink)] mb-4">
                {siteData.contactSection.title}
              </h2>

              <p className="text-base sm:text-lg text-[var(--color-ink-muted)] mb-8">
                {siteData.contactSection.description}
              </p>

              {/* Direct channels */}
              <div className="space-y-4 mb-8">
                {/* WhatsApp */}
                <a
                  href={siteData.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary-light)] shadow-xs transition-all group"
                >
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--color-ink-muted)] block font-medium">WhatsApp Direct</span>
                    <span className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-primary)]">
                      {siteData.contact.phoneDisplay}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-[var(--color-ink-faint)] group-hover:text-[var(--color-primary)]" />
                </a>

                {/* Email */}
                <a
                  href={siteData.contact.emailHref}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary-light)] shadow-xs transition-all group"
                >
                  <div className="p-3 rounded-xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--color-ink-muted)] block font-medium">Email Consultation</span>
                    <span className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-primary)]">
                      {siteData.contact.email}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-[var(--color-ink-faint)] group-hover:text-[var(--color-primary)]" />
                </a>

                {/* Studio Physical Address */}
                <a
                  href={siteData.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary-light)] shadow-xs transition-all group"
                >
                  <div className="p-3 rounded-xl bg-purple-50 text-[var(--color-primary-light)] group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--color-ink-muted)] block font-medium">Sutton Studio Location</span>
                    <span className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-primary)]">
                      {siteData.location.fullAddress}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-[var(--color-ink-faint)] group-hover:text-[var(--color-primary)]" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-ink-muted)]">
              <p className="font-semibold text-[var(--color-ink)] mb-1">Local Accountability</p>
              <p>Clients are welcome to schedule in-person wireframing consultations at our Throwley Way studio by appointment.</p>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl">
              
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-medium text-[var(--color-ink)]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[var(--color-ink-muted)] max-w-md mx-auto">
                    Thank you, {formData.name || 'there'}. Amelie will review your project requirements and reply within 24 business hours.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-300" />
                      <span>Also Open in WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2 text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[var(--color-border-subtle)] pb-4 mb-2">
                    <h3 className="font-heading text-xl font-medium text-[var(--color-ink)]">
                      Tell Me About Your Project
                    </h3>
                    <p className="text-xs text-[var(--color-ink-muted)]">
                      Fill out the details below to receive a bespoke project proposal
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:border-[var(--color-primary-light)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@company.co.uk"
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:border-[var(--color-primary-light)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 7..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:border-[var(--color-primary-light)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1.5">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:border-[var(--color-primary-light)] focus:outline-none"
                      >
                        {siteData.services.items.map(s => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1.5">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['£1,500 - £3,000', '£3,000 - £6,000', '£6,000+'].map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2 px-2 text-xs rounded-lg border text-center transition-all cursor-pointer font-medium ${
                            formData.budget === b
                              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                              : 'bg-[var(--color-bg-alt)] text-[var(--color-ink-muted)] border-[var(--color-border-subtle)] hover:text-[var(--color-ink)]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1.5">
                      Project Vision & Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your business goals, target launch timeline, and any reference websites..."
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:border-[var(--color-primary-light)] focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-hover)] transition-all shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Project Brief</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>Open on WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
