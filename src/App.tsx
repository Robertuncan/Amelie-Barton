import React, { useState, useEffect } from 'react';
import { SiteData, BlogPost, ThemeSettings } from './types';
import { 
  getStoredSiteData, 
  getStoredBlogPosts, 
  getStoredThemeSettings, 
  STORAGE_KEYS,
  initialSiteData,
  initialBlogPosts,
  themePresets
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { BlogSection } from './components/BlogSection';
import { BlogReaderModal } from './components/BlogReaderModal';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ThemeAndContentEditorModal } from './components/ThemeAndContentEditorModal';
import { Sliders, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(getStoredSiteData);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(getStoredBlogPosts);
  const [theme, setTheme] = useState<ThemeSettings>(getStoredThemeSettings);

  const [activeReaderPost, setActiveReaderPost] = useState<BlogPost | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<'theme' | 'blog' | 'site'>('theme');
  const [editingPostForModal, setEditingPostForModal] = useState<BlogPost | null>(null);

  // Synchronize CSS custom properties whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-light', theme.primaryLight);
    root.style.setProperty('--color-bg', theme.bg);
    root.style.setProperty('--color-bg-alt', theme.bgAlt);
    root.style.setProperty('--color-ink', theme.ink);
    root.style.setProperty('--color-ink-muted', theme.inkMuted);
    
    // Save to local storage
    try {
      localStorage.setItem(STORAGE_KEYS.THEME_SETTINGS, JSON.stringify(theme));
    } catch (e) {
      console.error('Error saving theme to storage', e);
    }
  }, [theme]);

  // Sync blog posts to local storage
  const handleUpdatePosts = (newPosts: BlogPost[]) => {
    setBlogPosts(newPosts);
    try {
      localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(newPosts));
    } catch (e) {
      console.error('Error saving blog posts to storage', e);
    }
  };

  // Sync site data to local storage
  const handleUpdateSiteData = (newData: SiteData) => {
    setSiteData(newData);
    try {
      localStorage.setItem(STORAGE_KEYS.SITE_DATA, JSON.stringify(newData));
    } catch (e) {
      console.error('Error saving site data to storage', e);
    }
  };

  // Reset all to default factory state
  const handleResetAll = () => {
    if (confirm('Reset everything to the original Amelie Barton configuration? This will restore original theme and articles.')) {
      setSiteData(initialSiteData);
      setBlogPosts(initialBlogPosts);
      setTheme(themePresets[0].settings);
      localStorage.removeItem(STORAGE_KEYS.SITE_DATA);
      localStorage.removeItem(STORAGE_KEYS.BLOG_POSTS);
      localStorage.removeItem(STORAGE_KEYS.THEME_SETTINGS);
    }
  };

  const handleFilterBlogFromService = (serviceId: string) => {
    const journalEl = document.getElementById('journal');
    if (journalEl) {
      journalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pattern class selection
  const patternClass = 
    theme.pattern === 'grain' ? 'bg-grain-pattern' :
    theme.pattern === 'grid' ? 'bg-grid-minimal' :
    theme.pattern === 'linen' ? 'bg-linen-pattern' : '';

  return (
    <div
      className={`min-h-screen relative font-body selection:bg-purple-100 selection:text-purple-950 transition-colors duration-300 ${patternClass}`}
      style={{
        backgroundColor: theme.bg,
        color: theme.ink
      }}
    >
      {/* Optional custom background image texture */}
      {theme.pattern === 'custom' && theme.customBgImage && (
        <div
          className="fixed inset-0 pointer-events-none -z-20 bg-cover bg-center transition-opacity"
          style={{
            backgroundImage: `url(${theme.customBgImage})`,
            opacity: theme.customBgOpacity || 0.08
          }}
        />
      )}

      {/* Primary Navigation */}
      <Navbar
        siteData={siteData}
        theme={theme}
        onOpenEditor={() => {
          setEditingPostForModal(null);
          setEditorTab('theme');
          setEditorOpen(true);
        }}
        blogCount={blogPosts.length}
      />

      <main>
        {/* Hero Section */}
        <Hero
          siteData={siteData}
          theme={theme}
          onOpenJournal={() => {
            const journalEl = document.getElementById('journal');
            journalEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenEditor={() => {
            setEditingPostForModal(null);
            setEditorTab('theme');
            setEditorOpen(true);
          }}
        />

        {/* Services Section */}
        <ServicesSection 
          siteData={siteData} 
          onFilterBlogByService={handleFilterBlogFromService}
        />

        {/* About Amelie Barton */}
        <AboutSection siteData={siteData} />

        {/* Why Choose Us */}
        <WhyChooseUsSection siteData={siteData} />

        {/* CORE FEATURE: GMB & Services Blog Section with In-Place Background Handover */}
        <BlogSection
          posts={blogPosts}
          services={siteData.services.items}
          theme={theme}
          onUpdateTheme={setTheme}
          onSelectPost={(post) => setActiveReaderPost(post)}
          onOpenEditorToBlog={(initialPost) => {
            setEditingPostForModal(initialPost || null);
            setEditorTab('blog');
            setEditorOpen(true);
          }}
          onDeletePost={(id) => {
            handleUpdatePosts(blogPosts.filter(p => p.id !== id));
          }}
          onOpenHandoverModal={() => {
            setEditingPostForModal(null);
            setEditorTab('theme');
            setEditorOpen(true);
          }}
        />

        {/* FAQs */}
        <FAQSection siteData={siteData} />

        {/* Contact Section */}
        <ContactSection siteData={siteData} />
      </main>

      {/* Footer */}
      <Footer
        siteData={siteData}
        theme={theme}
        onOpenEditor={() => {
          setEditingPostForModal(null);
          setEditorTab('theme');
          setEditorOpen(true);
        }}
      />

      {/* Reader Modal for Articles */}
      <BlogReaderModal
        post={activeReaderPost}
        onClose={() => setActiveReaderPost(null)}
        onSelectOtherPost={(other) => setActiveReaderPost(other)}
        allPosts={blogPosts}
      />

      {/* Customizer & Handover Modal (Background & Blog Editor) */}
      <ThemeAndContentEditorModal
        isOpen={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingPostForModal(null);
        }}
        theme={theme}
        onUpdateTheme={setTheme}
        posts={blogPosts}
        onUpdatePosts={handleUpdatePosts}
        siteData={siteData}
        onUpdateSiteData={handleUpdateSiteData}
        onResetAll={handleResetAll}
        initialTab={editorTab}
        initialEditingPost={editingPostForModal}
      />

      {/* Floating Quick Action Button on Bottom Right */}
      <aside aria-label="Editor controls" className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => {
            setEditingPostForModal(null);
            setEditorTab('blog');
            setEditorOpen(true);
          }}
          className="p-3 rounded-full bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-border)] shadow-lg hover:shadow-xl hover:bg-[var(--color-bg-alt)] transition-all flex items-center justify-center group cursor-pointer"
          title="Write or Edit GMB & Service Articles"
          aria-label="Write or Edit GMB & Service Articles"
        >
          <BookOpen className="w-5 h-5 text-[var(--color-primary-light)] group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => {
            setEditingPostForModal(null);
            setEditorTab('theme');
            setEditorOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--color-ink)] text-[var(--color-surface)] shadow-xl hover:shadow-2xl hover:scale-102 transition-all cursor-pointer font-medium text-xs border border-white/10"
          title="Customize Background & Export Handover"
        >
          <Sliders className="w-4 h-4 text-purple-300" />
          <span className="hidden sm:inline">Customize & Handover</span>
          <span className="sm:hidden">Theme</span>
        </button>
      </aside>
    </div>
  );
}
