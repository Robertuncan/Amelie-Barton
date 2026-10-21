export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  timeline?: string;
  deliverables?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  relatedServiceId: string;       // ID of the related service (e.g. 'google-business-profile-optimization')
  relatedServiceTitle: string;    // Title of the related service
  isGmbPost: boolean;             // Explicit flag for GMB (Google My Business) posts
  gmbTargetLocation?: string;     // Target location (e.g. "Sutton, SM1 & Surrey")
  gmbCtaType?: string;            // CTA type (e.g. "Google Maps Directions", "Call Studio", "Book Consultation")
  coverImage: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured: boolean;
  tags: string[];
  keyTakeaways?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ThemeSettings {
  presetName: string;
  bg: string;
  bgAlt: string;
  ink: string;
  inkMuted: string;
  primary: string;
  primaryLight: string;
  pattern: 'grain' | 'grid' | 'linen' | 'none' | 'custom';
  customBgImage?: string;
  customBgOpacity?: number;
  heroBgType: 'studio-photo' | 'solid' | 'minimal-ivory' | 'custom';
  heroCustomImage?: string;
  showAmbientOrbs: boolean;
  // Dedicated blog section background override
  blogBgMode: 'match-site' | 'custom-color' | 'dark-luxury' | 'warm-paper' | 'custom-image';
  blogCustomBgColor?: string;
  blogCustomBgImage?: string;
}

export interface SiteData {
  name: string;
  role: string;
  type: string;
  tagline: string;
  style: string;
  location: {
    area: string;
    streetAddress: string;
    locality: string;
    country: string;
    postcode: string;
    fullAddress: string;
    googleMapsUrl: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    phoneHref: string;
    whatsapp: string;
    whatsappHref: string;
    email: string;
    emailHref: string;
  };
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    secondary: string;
    ink: string;
    inkMuted: string;
    bg: string;
    bgAlt: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    trustText: string;
    image: string;
    fallbackImage: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    highlights: Array<{ label: string; value: string }>;
    image: string;
    fallbackImage: string;
  };
  whyChooseUs: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ number: string; title: string; description: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FAQItem[];
  };
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  footer: {
    copyright: string;
    backToTop: string;
  };
}
