import { SiteData, BlogPost, ThemeSettings } from '../types';

export const initialSiteData: SiteData = {
  name: "Amelie Barton",
  role: "Website Designer",
  type: "Website designer",
  tagline: "Modern Websites, Better Results.",
  style: "Luxury",
  location: {
    area: "Sutton, United Kingdom",
    streetAddress: "1 Gemini Court, 42a Throwley Way",
    locality: "Sutton",
    country: "United Kingdom",
    postcode: "SM1 4AF",
    fullAddress: "1 Gemini Court, 42a Throwley Way, Sutton, United Kingdom, SM1 4AF",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=1+Gemini+Court+42a+Throwley+Way+Sutton+SM1+4AF+United+Kingdom"
  },
  contact: {
    phone: "447915929263",
    phoneDisplay: "+44 (0)7915 929263",
    phoneHref: "tel:447915929263",
    whatsapp: "447915929263",
    whatsappHref: "https://wa.me/447915929263?text=Hi%20Amelie%2C%20I%27d%20like%20to%20discuss%20a%20website%20project.",
    email: "amelie@ameliebarton.co.uk",
    emailHref: "mailto:amelie@ameliebarton.co.uk"
  },
  colors: {
    primary: "#4C1D95",
    primaryHover: "#3B0764",
    primaryLight: "#6D28D9",
    secondary: "#FFFFFF",
    ink: "#140E21",
    inkMuted: "#534D66",
    bg: "#FCFBF9",
    bgAlt: "#F6F4EE"
  },
  hero: {
    eyebrow: "Sutton · Bespoke Web Studio",
    headline: "Modern Websites, Better Results.",
    subheadline: "Thoughtfully crafted digital experiences for ambitious businesses in Sutton and Greater London. Designed with precision, built for performance.",
    trustText: "Direct consultation · Sutton studio on Throwley Way · Fast turnarounds",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
  },
  services: {
    eyebrow: "Bespoke Capabilities",
    title: "Tailored Website Design & Digital Growth",
    description: "Every service is delivered with obsessive attention to typographic balance, mobile responsiveness, and high conversion.",
    items: [
      {
        id: "website-design",
        number: "01",
        title: "Website Design",
        category: "Creative Direction",
        description: "Bespoke visual layouts designed around your brand's unique identity, built to engage visitors and project authority.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
        featured: true,
        timeline: "2-3 Weeks",
        deliverables: ["Custom Figma prototypes", "Responsive design systems", "Brand typography selection", "Interactive design tokens"]
      },
      {
        id: "website-development",
        number: "02",
        title: "Website Development",
        category: "Engineering",
        description: "Modern, clean frontend engineering that guarantees lightning-fast loading speeds, smooth interactions, and rock-solid code.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
        featured: true,
        timeline: "3-4 Weeks",
        deliverables: ["Zero-dependency clean HTML/React", "Sub-second PageSpeed score", "Cross-browser validation", "Automated deployment setup"]
      },
      {
        id: "ecommerce-website",
        number: "03",
        title: "E-Commerce Website",
        category: "Commerce",
        description: "Seamless online stores designed for frictionless checkout, clear product merchandising, and sustained sales volume.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
        featured: true,
        timeline: "4-5 Weeks",
        deliverables: ["High-ticket merchandising UX", "Stripe & Apple Pay integration", "Inventory sync", "Mobile checkout flow optimization"]
      },
      {
        id: "wordpress-design",
        number: "04",
        title: "WordPress Design",
        category: "Content Management",
        description: "Custom, lightweight WordPress builds that give you complete ownership and simple editing without bulky plugin bloat.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        timeline: "2-3 Weeks",
        deliverables: ["Custom block templates", "Fast database queries", "Client editing handover guide", "Security hardening"]
      },
      {
        id: "landing-page-design",
        number: "05",
        title: "Landing Page Design",
        category: "Conversion",
        description: "Focused, high-converting standalone pages engineered specifically for product launches, ad campaigns, and direct inquiries.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        timeline: "7-10 Days",
        deliverables: ["Conversion copywriting layout", "Clear psychological CTAs", "A/B test preparation", "Analytics event tracking"]
      },
      {
        id: "website-redesign",
        number: "06",
        title: "Website Redesign",
        category: "Transformation",
        description: "Transforming dated, slow websites into sharp, contemporary assets that reflect how your business operates today.",
        image: "https://images.unsplash.com/photo-1581291518655-952384377313?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        timeline: "3 Weeks",
        deliverables: ["Brand elevation roadmap", "SEO equity & 301 preservation", "Modern layout restructuring", "Mobile-first experience"]
      },
      {
        id: "responsive-web-design",
        number: "07",
        title: "Responsive Web Design",
        category: "Mobile Optimization",
        description: "Meticulously tested across smartphones, tablets, and 4K displays to deliver a flawless browsing experience anywhere.",
        image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        timeline: "1-2 Weeks",
        deliverables: ["Touch-first navigation", "Adaptive typography scales", "Image srcset compression", "Viewport fluidity"]
      },
      {
        id: "seo-services",
        number: "08",
        title: "SEO Services",
        category: "Search Strategy",
        description: "Foundational technical architecture, structured schema markup, and speed audits that help search engines understand your site.",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        timeline: "Ongoing / Sprint",
        deliverables: ["JSON-LD LocalBusiness schema", "Core Web Vitals green audit", "Crawl budget optimization", "Semantic hierarchy audit"]
      },
      {
        id: "local-seo",
        number: "09",
        title: "Local SEO",
        category: "Local Visibility",
        description: "Targeted geographic visibility strategies designed to connect your services directly with prospective clients in Sutton and Surrey.",
        image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        timeline: "2 Weeks",
        deliverables: ["Surrey & London geo-targeting", "Local citation distribution", "Google Maps rank blueprint", "Localized review strategy"]
      },
      {
        id: "digital-marketing",
        number: "10",
        title: "Digital Marketing",
        category: "Growth",
        description: "Holistic digital positioning that bridges design, content, and conversion funnels into steady client inquiries.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        timeline: "Monthly",
        deliverables: ["Full funnel architecture", "Paid media creative design", "Landing page optimization", "Monthly KPI synthesis"]
      },
      {
        id: "social-media-marketing",
        number: "11",
        title: "Social Media Marketing",
        category: "Engagement",
        description: "Refined digital assets and coherent aesthetic guidelines that maintain your brand's luxury voice across social channels.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1600&q=80",
        featured: false,
        timeline: "Bi-weekly",
        deliverables: ["High-resolution social kits", "Typography guidelines for IG/LinkedIn", "Brand narrative templates", "Consistent aesthetic moodboards"]
      },
      {
        id: "google-business-profile-optimization",
        number: "12",
        title: "Google Business Profile Optimization",
        category: "Local Presence",
        description: "Complete setup, optimization, and local citation refinement to ensure your business stands out prominently in Google Maps.",
        image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1600&q=80",
        featured: true,
        timeline: "5-7 Days",
        deliverables: ["Verification & category audit", "Geotagged studio imagery", "Services & products cataloging", "Review funnel link setup", "Google Maps 3-Pack rank blueprint"]
      }
    ]
  },
  about: {
    eyebrow: "About Amelie Barton",
    title: "Dedicated Website Craft in Sutton",
    lead: "I work with independent businesses, professional practices, and ambitious brands to build websites that command attention and drive real commercial results.",
    paragraphs: [
      "Operating from Throwley Way in Sutton, I provide an intentional alternative to impersonal marketing agencies. When you commission a project with me, you work directly with one dedicated designer from initial wireframe to final launch.",
      "Every project balances aesthetic restraint with technical rigour: custom typography, rapid loading speeds, responsive layouts, and local search architecture designed to help your business flourish."
    ],
    highlights: [
      { label: "Studio Location", value: "Sutton, United Kingdom" },
      { label: "Specialism", value: "Bespoke Web Design & Local SEO" },
      { label: "Collaboration", value: "Direct One-on-One Partner" }
    ],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80"
  },
  whyChooseUs: {
    eyebrow: "Why Work Together",
    title: "Clarity, Craftsmanship & Local Accountability",
    description: "Built strictly on the values that define our studio practice in Sutton.",
    items: [
      {
        number: "01",
        title: "Sutton Studio Presence",
        description: "Based at Gemini Court on Throwley Way, providing direct communication, local accountability, and transparent collaboration."
      },
      {
        number: "02",
        title: "Direct One-on-One Partnership",
        description: "Work directly with Amelie Barton from concept to completion. No account handlers, no diluted feedback, no hidden tiers."
      },
      {
        number: "03",
        title: "Full-Spectrum Delivery",
        description: "From bespoke visual design and responsive code to local SEO and Google Business Profile optimization, everything works in harmony."
      },
      {
        number: "04",
        title: "Engineered for Performance",
        description: "Lightweight, accessible code structured to load instantly on any mobile device and deliver high conversion rates."
      }
    ]
  },
  faq: {
    eyebrow: "Questions & Answers",
    title: "Common Questions About Working Together",
    description: "Clear answers to help you plan your next website project.",
    items: [
      {
        question: "How does the design and build process work?",
        answer: "We begin with a discovery conversation to define your goals, target audience, and required functionality. I then design custom wireframes and prototypes for your approval before coding the website with clean, modern standards. You review the build at every stage."
      },
      {
        question: "What is typically included in a website project?",
        answer: "Every project includes bespoke responsive design, clean code architecture, mobile optimization, on-page SEO foundation, domain and hosting setup guidance, and a straightforward handover session."
      },
      {
        question: "How do you handle local SEO and Google Business Profile optimization?",
        answer: "Alongside designing the website, I ensure your technical metadata, local schema markup, and Google Business Profile in Sutton are fully aligned so nearby customers can locate your services easily."
      },
      {
        question: "How do we get started?",
        answer: "Reach out via WhatsApp or submit a message through the contact form with details on what you need. We will arrange a consultation to discuss your vision, timeline, and exact scope."
      }
    ]
  },
  contactSection: {
    eyebrow: "Initiate Your Project",
    title: "Let's Build Something Exceptional",
    description: "Reach out on WhatsApp for a quick response, or leave a message below with your project details."
  },
  footer: {
    copyright: "All rights reserved.",
    backToTop: "Back to top"
  }
};

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post-gmb-1",
    slug: "google-business-profile-gmb-playbook-sutton",
    title: "Google Business Profile (GMB) Playbook: Dominating the Map Pack in Sutton & Surrey",
    subtitle: "How independent businesses capture 70% of high-intent local phone calls and footfall through targeted GMB architecture.",
    excerpt: "Having a gorgeous website without an optimized Google Business Profile leaves local revenue on the table. Here is how we link bespoke web design directly to the Google Maps 3-Pack.",
    category: "Google My Business (GMB)",
    relatedServiceId: "google-business-profile-optimization",
    relatedServiceTitle: "Google Business Profile Optimization",
    isGmbPost: true,
    gmbTargetLocation: "Sutton, SM1 & Greater London",
    gmbCtaType: "Google Maps Directions",
    coverImage: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1600&q=80",
    date: "October 20, 2026",
    readTime: "6 min read",
    author: {
      name: "Amelie Barton",
      role: "Lead Designer & Local SEO Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    tags: ["GMB Optimization", "Google Maps", "Local 3-Pack", "Sutton SM1", "Local SEO"],
    keyTakeaways: [
      "Select the single most precise primary GMB category matching your highest-margin service.",
      "Add geotagged studio photos taken on location in Sutton to establish photographic entity trust.",
      "Link your GMB website button directly to your dedicated local service landing page, not a generic splash screen.",
      "Embed a review generation funnel directly into client handover workflows."
    ],
    content: `When prospective clients in Sutton, Cheam, Epsom, or Croydon search for professional services, they rarely scroll past the top three map listings. Google's Local 3-Pack commands up to 70% of high-intent search clicks.

### The Problem With Disconnected Websites and GMB Listings

Most marketing agencies treat website design and Google My Business (GMB) as completely separate silos. A designer builds a website, while an SEO agency tinkers with a map listing.

When these two assets do not communicate, Google's ranking algorithms detect inconsistencies:
1. The business address on the website footer differs by even a suite number from the Google Map pin.
2. The primary service name on your website does not mirror the primary category designated in your GMB dashboard.
3. Your GMB listing has zero direct deep-links to structured service pages.

### The Amelie Barton GMB Integration Strategy

In our Sutton studio on Throwley Way, we integrate Google Business Profile directly into the frontend architecture:

- **Exact Geo Coordinates & NAP Schema:** We inject JSON-LD structured data with exact coordinates for Gemini Court (SM1 4AF), ensuring algorithmic parity.
- **Weekly Google Updates:** Publishing short, editorial updates about completed projects, linking directly back to relevant portfolio case studies.
- **Service Catalog Synchronization:** We configure each of your 12 core services inside GMB with custom price ranges, detailed deliverables, and direct inquiry URLs.
- **Mobile Tap-to-Call Prioritization:** Mobile visitors from GMB land directly on streamlined, sub-second pages with direct WhatsApp and telephone anchors.

If you are a Sutton business seeking to dominate Google Maps search results, your website and your GMB profile must operate as a unified commercial engine.`
  },
  {
    id: "post-gmb-2",
    slug: "local-seo-and-gmb-nap-consistency-guide",
    title: "Linking Website Service Pages to Google Maps: Architectural Guide for Surrey",
    subtitle: "Why clean semantic HTML and local schema markup beat generic keyword stuffing for local geographic prominence.",
    excerpt: "Most local business websites fail in Google because their code obscures their location. Here is how we embed geographic clarity and GMB authority directly into the code.",
    category: "Local SEO & GMB",
    relatedServiceId: "local-seo",
    relatedServiceTitle: "Local SEO",
    isGmbPost: true,
    gmbTargetLocation: "Surrey & South London",
    gmbCtaType: "Book Consultation",
    coverImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80",
    date: "October 16, 2026",
    readTime: "5 min read",
    author: {
      name: "Amelie Barton",
      role: "Lead Designer & Strategist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    tags: ["Local SEO", "GMB Schema", "Surrey Businesses", "Citation Consistency"],
    keyTakeaways: [
      "Embedded LocalBusiness JSON-LD schema binds your street address with search crawlers.",
      "Matching footer NAP (Name, Address, Phone) with Google Business Profile eliminates map drift.",
      "Dedicated geo-contextual subpages anchor your authority across Sutton and Surrey."
    ],
    content: `Local search is no longer about repeating "web designer in Sutton" seven times in an introductory paragraph. Modern search engines evaluate entity relationships, structured data integrity, and authentic geographical footprint.

### The Foundation: Structural Schema Markup

Before a search engine parses a single paragraph of your creative copy, it inspects your page's semantic HTML and JSON-LD schema. If your website lacks an explicit \`@type: "LocalBusiness"\` schema containing your exact latitude, longitude, and postal code, you are giving away top placement to competitors.

In every build at our Throwley Way studio, we handcraft structured data linking:
1. Physical address: \`1 Gemini Court, 42a Throwley Way, Sutton SM1 4AF\`
2. Direct telephone links with international dialect support
3. Opening hours and real-time consultation booking endpoints

### The Fast Mobile Advantage in Greater London

Over 70% of local searches in London and the commuter belt happen while clients are on the go. If your website takes 4 seconds to parse heavyweight JavaScript before displaying your phone number or WhatsApp button, the user has already tapped back to Google Maps. Fast, lightweight code is not just a technical metric; it is direct customer acquisition.`
  },
  {
    id: "post-gmb-3",
    slug: "gmb-review-acceleration-5-star-formula",
    title: "GMB Review Acceleration: The 5-Star Architecture for Independent Businesses",
    subtitle: "How to systematically build an insurmountable moat of verified Google reviews that convert high-ticket clients.",
    excerpt: "Reviews are the #1 conversion factor on Google Maps. Discover how to create an unforced, automated review collection workflow during client handovers.",
    category: "Google My Business (GMB)",
    relatedServiceId: "google-business-profile-optimization",
    relatedServiceTitle: "Google Business Profile Optimization",
    isGmbPost: true,
    gmbTargetLocation: "Sutton & Greater London",
    gmbCtaType: "Call Studio",
    coverImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
    date: "October 10, 2026",
    readTime: "4 min read",
    author: {
      name: "Amelie Barton",
      role: "Lead Designer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    tags: ["Google Reviews", "Social Proof", "Local Trust", "GMB"],
    keyTakeaways: [
      "Send a single-click Google Review shortlink at the exact moment of project celebration.",
      "Respond to every review with natural keywords referencing your specific service and location.",
      "Display verified Google review badges directly in your website hero and contact sections."
    ],
    content: `Prospective customers who discover your business on Google Maps make up their mind in under three seconds. They look at your star rating, your total count of reviews, and how recently the last review was posted.

By embedding an automated WhatsApp and email handover trigger, our clients collect 3x to 5x more verified 5-star Google reviews without awkward badgering.`
  },
  {
    id: "post-design-1",
    slug: "typographic-restraint-luxury-web-design",
    title: "Why Typographic Restraint Drives Higher Conversions in Luxury Web Design",
    subtitle: "How disciplined serif pairings and generous whitespace create unforced commercial authority.",
    excerpt: "In an internet saturated with frantic animations and visual noise, intentional restraint is the highest form of luxury. Learn how typographic hierarchy converts discerning clients.",
    category: "Website Design",
    relatedServiceId: "website-design",
    relatedServiceTitle: "Website Design",
    isGmbPost: false,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    date: "October 05, 2026",
    readTime: "5 min read",
    author: {
      name: "Amelie Barton",
      role: "Founder & Lead Designer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    tags: ["Typography", "Luxury UX", "Conversion", "Minimalism"],
    keyTakeaways: [
      "Limit font families to two complementary weights with strict optical contrast.",
      "Whitespace gives premium offerings room to breathe and command perceived value.",
      "Readability on mobile determines 65% of executive consultation inquiries."
    ],
    content: `When high-net-worth clients or discerning consumers land on your website, they do not assess it by the number of moving elements. They assess clarity, weight, and confidence.

In our Sutton studio, we balance classic character with contemporary precision. We pair a warm, sculpted editorial serif (such as Fraunces) for commanding headlines with an ultra-legible geometric grotesque (like Plus Jakarta Sans) for body copy.`
  },
  {
    id: "post-dev-1",
    slug: "speed-as-luxury-sub-second-performance",
    title: "Speed As Luxury: Why 0.8s Page Loads Beat Heavy Animations",
    subtitle: "A digital experience that feels instant is the highest courtesy you can pay your clientele.",
    excerpt: "Instant responsiveness respects your visitor’s time. Discover how modern frontend architecture delivers silky aesthetics without the digital lag.",
    category: "Website Development",
    relatedServiceId: "website-development",
    relatedServiceTitle: "Website Development",
    isGmbPost: false,
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    date: "September 28, 2026",
    readTime: "4 min read",
    author: {
      name: "Amelie Barton",
      role: "Lead Designer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    tags: ["Performance", "Web Vitals", "UX Engineering", "Frontend"],
    keyTakeaways: [
      "Sub-second First Contentful Paint prevents visitor bounce rates above 50%.",
      "CSS hardware acceleration delivers fluid motion without stuttering frames.",
      "Modern WebP/AVIF imagery saves up to 80% bandwidth with zero fidelity loss."
    ],
    content: `There is a common misconception that bespoke luxury websites must be accompanied by a 3-second loader with spinning rings. 

Walking into an Hermès or Patek Philippe boutique does not involve waiting in a vestibule while staff arrange props. The door opens effortlessly; the environment is calm, silent, and immediately accessible.`
  },
  {
    id: "post-ecom-1",
    slug: "ecommerce-merchandising-and-local-gmb-pickup",
    title: "Designing for E-Commerce: High-Ticket Merchandising & Local GMB Pickup",
    subtitle: "How to showcase £500+ items online and connect online catalogs to Google Business Profile product tabs.",
    excerpt: "Selling high-value products or bespoke commissions requires more than an 'Add to Cart' button. Learn how to bridge e-commerce with local Google Maps footfall.",
    category: "E-Commerce Website",
    relatedServiceId: "ecommerce-website",
    relatedServiceTitle: "E-Commerce Website",
    isGmbPost: true,
    gmbTargetLocation: "London & Surrey Commuter Belt",
    gmbCtaType: "View Catalog",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    date: "September 18, 2026",
    readTime: "5 min read",
    author: {
      name: "Amelie Barton",
      role: "Lead Designer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    tags: ["E-Commerce", "High Ticket", "Google Shopping", "Local Inventory", "GMB"],
    keyTakeaways: [
      "Sync e-commerce product feeds directly into Google Business Profile's 'Products' carousel.",
      "Offer click-and-collect or studio consultations for high-ticket purchases in Sutton.",
      "Frictionless express mobile checkout via Apple Pay dramatically lifts conversion."
    ],
    content: `When a customer buys fine jewellery, bespoke furniture, or tailored services, they look for provenance, craftsmanship, and local reassurance.

By syncing your e-commerce catalog with your Google Business Profile product tabs, local customers browsing Google Maps can discover in-stock bespoke items directly.`
  },
  {
    id: "post-landing-1",
    slug: "landing-page-design-for-google-ads-and-gmb",
    title: "Landing Page Architecture That Converts GMB Traffic into High-Value Inquiries",
    subtitle: "How standalone service pages convert Google Maps traffic at 3x higher rates than generic homepages.",
    excerpt: "Directing GMB visitors to a generic homepage is an expensive mistake. Discover the dedicated single-purpose service page blueprint.",
    category: "Landing Page Design",
    relatedServiceId: "landing-page-design",
    relatedServiceTitle: "Landing Page Design",
    isGmbPost: true,
    gmbTargetLocation: "Sutton SM1",
    gmbCtaType: "Book Consultation",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    date: "September 08, 2026",
    readTime: "4 min read",
    author: {
      name: "Amelie Barton",
      role: "Lead Designer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    tags: ["Landing Pages", "GMB Funnels", "High Conversion", "PPC"],
    keyTakeaways: [
      "Create a dedicated 1-to-1 landing page matching each service listed in your GMB profile.",
      "Remove extraneous header navigation links to keep visitors focused on WhatsApp or form inquiry.",
      "Display your Throwley Way studio address prominently above the fold."
    ],
    content: `When a user clicks 'Website' on a Google Business Profile listing for 'Emergency Dental' or 'Bespoke Architectural Joinery', landing on a generic homepage forces them to dig through menus.

Focused landing pages tailored to specific services ensure immediate message match and eliminate drop-offs.`
  },
  {
    id: "post-wp-1",
    slug: "wordpress-design-local-seo-foundations",
    title: "WordPress Design: Fast, Lightweight Builds with Native GMB Schema",
    subtitle: "Custom, lightweight WordPress builds that give you complete ownership without bulky plugin bloat.",
    excerpt: "How to build a WordPress site that maintains clean code, loads in 600ms, and ranks effortlessly on Google Maps in Sutton.",
    category: "WordPress Design",
    relatedServiceId: "wordpress-design",
    relatedServiceTitle: "WordPress Design",
    isGmbPost: false,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    date: "August 24, 2026",
    readTime: "5 min read",
    author: {
      name: "Amelie Barton",
      role: "Lead Designer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    tags: ["WordPress", "Lightweight CMS", "PageSpeed", "SEO"],
    keyTakeaways: [
      "Avoid 40+ plugin stacks; use lightweight custom Gutenberg block architectures.",
      "Store schemas natively in theme header templates rather than slow external scripts.",
      "Client editing handover sessions ensure long-term site stability."
    ],
    content: `WordPress powers 40% of the web, but 90% of WordPress sites suffer from bloat and slow server response times that depress Google Map rankings.

We develop clean, bespoke WordPress themes with zero unnecessary dependencies, giving clients full control while preserving elite performance.`
  }
];

export const themePresets: Array<{ id: string; name: string; description: string; settings: ThemeSettings }> = [
  {
    id: "atelier-warm-ivory",
    name: "Atelier Warm Ivory (Default)",
    description: "The signature Amelie Barton aesthetic: warm limestone ivory, deep plum accent, rich typographic ink.",
    settings: {
      presetName: "Atelier Warm Ivory",
      bg: "#FCFBF9",
      bgAlt: "#F6F4EE",
      ink: "#140E21",
      inkMuted: "#534D66",
      primary: "#4C1D95",
      primaryLight: "#6D28D9",
      pattern: "grain",
      heroBgType: "studio-photo",
      showAmbientOrbs: true,
      blogBgMode: "match-site"
    }
  },
  {
    id: "nocturne-dark-luxury",
    name: "Nocturne Dark Luxury",
    description: "Deep obsidian velvet canvas with glowing lilac highlights and luminous typography.",
    settings: {
      presetName: "Nocturne Dark Luxury",
      bg: "#0E0A17",
      bgAlt: "#161124",
      ink: "#F9F8FD",
      inkMuted: "#A7A2BA",
      primary: "#8B5CF6",
      primaryLight: "#A78BFA",
      pattern: "grain",
      heroBgType: "studio-photo",
      showAmbientOrbs: true,
      blogBgMode: "dark-luxury"
    }
  },
  {
    id: "editorial-linen-terracotta",
    name: "Editorial Linen & Terracotta",
    description: "Warm tactile parchment paper, earthy terracotta highlights, and antique espresso ink.",
    settings: {
      presetName: "Editorial Linen & Terracotta",
      bg: "#FAF7F2",
      bgAlt: "#F2EDE4",
      ink: "#231B15",
      inkMuted: "#665C54",
      primary: "#9A4D2E",
      primaryLight: "#C2623B",
      pattern: "linen",
      heroBgType: "studio-photo",
      showAmbientOrbs: false,
      blogBgMode: "warm-paper"
    }
  },
  {
    id: "surrey-botanical-sage",
    name: "Surrey Botanical Sage",
    description: "Organic Surrey country house palette with soothing eucalyptus sage, forest green, and crisp bone whites.",
    settings: {
      presetName: "Surrey Botanical Sage",
      bg: "#F7F9F6",
      bgAlt: "#EDF2EC",
      ink: "#13231B",
      inkMuted: "#4B6155",
      primary: "#26533F",
      primaryLight: "#3C7D60",
      pattern: "grain",
      heroBgType: "studio-photo",
      showAmbientOrbs: true,
      blogBgMode: "match-site"
    }
  },
  {
    id: "minimalist-studio-pearl",
    name: "Minimalist Studio Pearl",
    description: "Architectural stark white with subtle cool grays, deep onyx ink, and royal blue accents.",
    settings: {
      presetName: "Minimalist Studio Pearl",
      bg: "#FFFFFF",
      bgAlt: "#F3F4F6",
      ink: "#111827",
      inkMuted: "#4B5563",
      primary: "#1D4ED8",
      primaryLight: "#2563EB",
      pattern: "grid",
      heroBgType: "minimal-ivory",
      showAmbientOrbs: false,
      blogBgMode: "match-site"
    }
  }
];

export const STORAGE_KEYS = {
  SITE_DATA: "amelie_barton_site_data_v2",
  BLOG_POSTS: "amelie_barton_blog_posts_v2",
  THEME_SETTINGS: "amelie_barton_theme_settings_v2"
};

export function getStoredSiteData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_DATA);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse site data from storage", e);
  }
  return initialSiteData;
}

export function getStoredBlogPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse blog posts from storage", e);
  }
  return initialBlogPosts;
}

export function getStoredThemeSettings(): ThemeSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.THEME_SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse theme settings from storage", e);
  }
  return themePresets[0].settings;
}
