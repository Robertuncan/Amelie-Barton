import React, { useState } from 'react';
import { ThemeSettings, BlogPost, SiteData } from '../types';
import { themePresets } from '../data/initialData';
import { 
  X, Download, Copy, Check, RefreshCw, Palette, FileText, 
  Settings, Plus, Trash2, Edit3, Image, Sparkles, Layers,
  ExternalLink, Upload, MapPin
} from 'lucide-react';

interface ThemeAndContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeSettings;
  onUpdateTheme: (theme: ThemeSettings) => void;
  posts: BlogPost[];
  onUpdatePosts: (posts: BlogPost[]) => void;
  siteData: SiteData;
  onUpdateSiteData: (data: SiteData) => void;
  onResetAll: () => void;
  initialTab?: 'theme' | 'blog' | 'site';
  initialEditingPost?: BlogPost | null;
}

export const ThemeAndContentEditorModal: React.FC<ThemeAndContentEditorModalProps> = ({
  isOpen,
  onClose,
  theme,
  onUpdateTheme,
  posts,
  onUpdatePosts,
  siteData,
  onUpdateSiteData,
  onResetAll,
  initialTab = 'theme',
  initialEditingPost = null,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'blog' | 'site'>(initialTab);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Blog post editing state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(initialEditingPost);
  const [isCreatingNewPost, setIsCreatingNewPost] = useState(false);

  // Form states for post editor
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: '',
    subtitle: '',
    excerpt: '',
    content: '',
    category: 'Google My Business (GMB)',
    relatedServiceId: 'google-business-profile-optimization',
    relatedServiceTitle: 'Google Business Profile Optimization',
    isGmbPost: true,
    gmbTargetLocation: 'Sutton, SM1 & Surrey',
    gmbCtaType: 'Google Maps Directions',
    coverImage: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1600&q=80',
    date: 'October 21, 2026',
    readTime: '5 min read',
    tags: ['GMB', 'Google Maps', 'Local SEO', 'Sutton'],
    keyTakeaways: ['Syncing GMB categories with website service pages doubles local inquiries.'],
    featured: false,
    author: {
      name: siteData.name,
      role: 'Lead Designer & Local SEO Specialist',
      avatar: siteData.about.image
    }
  });

  if (!isOpen) return null;

  const showCopyToast = (msg: string) => {
    setCopiedNotice(msg);
    setTimeout(() => setCopiedNotice(null), 2500);
  };

  // Preset quick curated covers for blog posts
  const presetCoverImages = [
    { label: 'Google Maps / Local', url: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Studio Desk', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Clean Code', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Surrey Architecture', url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80' },
    { label: 'E-Commerce Silk', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Creative Direction', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80' }
  ];

  // Export Theme & Blog Handover JSON
  const handleExportHandover = () => {
    const handoverPackage = {
      client: "Amelie Barton Studio",
      generatedAt: new Date().toISOString(),
      handoverSpecification: {
        typography: {
          headingFont: "Fraunces (Google Fonts)",
          bodyFont: "Plus Jakarta Sans (Google Fonts)"
        },
        activeTheme: theme,
        colorTokens: {
          backgroundPrimary: theme.bg,
          backgroundAlternate: theme.bgAlt,
          typographyInk: theme.ink,
          typographyInkMuted: theme.inkMuted,
          brandPrimary: theme.primary,
          brandPrimaryLight: theme.primaryLight,
          blogSectionBackground: theme.blogCustomBgColor || theme.bg,
        },
        backgroundPattern: theme.pattern,
        ambientGlow: theme.showAmbientOrbs,
        blogBackgroundMode: theme.blogBgMode,
      },
      gmbSummary: {
        totalGmbPosts: posts.filter(p => p.isGmbPost).length,
        targetLocations: Array.from(new Set(posts.map(p => p.gmbTargetLocation).filter(Boolean))),
        servicesLinked: siteData.services.items.length
      },
      blogPosts: posts,
      siteMetadata: {
        name: siteData.name,
        role: siteData.role,
        location: siteData.location,
        contact: siteData.contact
      }
    };

    const blob = new Blob([JSON.stringify(handoverPackage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amelie-barton-handover-pack-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showCopyToast('Complete Handover Package downloaded!');
  };

  // Copy CSS Theme Variables
  const handleCopyCSS = () => {
    const cssContent = `/* Amelie Barton Studio - Theme Handover Specification */
:root {
  --color-primary: ${theme.primary};
  --color-primary-light: ${theme.primaryLight};
  --color-bg: ${theme.bg};
  --color-bg-alt: ${theme.bgAlt};
  --color-ink: ${theme.ink};
  --color-ink-muted: ${theme.inkMuted};
  --color-blog-bg: ${theme.blogCustomBgColor || theme.bg};
  --font-heading: "Fraunces", Georgia, serif;
  --font-body: "Plus Jakarta Sans", sans-serif;
}`;
    navigator.clipboard.writeText(cssContent);
    showCopyToast('CSS Variables copied to clipboard!');
  };

  // Import JSON configuration
  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.activeTheme || parsed.handoverSpecification?.activeTheme) {
          const importedTheme = parsed.activeTheme || parsed.handoverSpecification?.activeTheme;
          onUpdateTheme(importedTheme);
        }
        if (parsed.blogPosts && Array.isArray(parsed.blogPosts)) {
          onUpdatePosts(parsed.blogPosts);
        }
        showCopyToast('Handover configuration imported successfully!');
      } catch (err) {
        alert('Invalid JSON file format. Please upload a valid handover configuration.');
      }
    };
    reader.readAsText(file);
  };

  // Blog CRUD actions
  const handleStartCreatePost = () => {
    setIsCreatingNewPost(true);
    setEditingPost(null);
    setPostForm({
      title: '',
      subtitle: '',
      excerpt: '',
      content: 'Write your bespoke service or GMB strategy guide here...\n\n### Core Google Maps & Service Impact\nExplain how this drives customer inquiries in Sutton and Surrey.',
      category: 'Google My Business (GMB)',
      relatedServiceId: 'google-business-profile-optimization',
      relatedServiceTitle: 'Google Business Profile Optimization',
      isGmbPost: true,
      gmbTargetLocation: 'Sutton, SM1 & Surrey',
      gmbCtaType: 'Google Maps Directions',
      coverImage: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1600&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '4 min read',
      tags: ['GMB', 'Local SEO', 'Sutton'],
      keyTakeaways: ['Direct alignment between GMB and web service pages drives 3x local conversion.'],
      featured: false,
      author: {
        name: siteData.name,
        role: 'Lead Designer & Local SEO Specialist',
        avatar: siteData.about.image
      }
    });
  };

  const handleStartEditPost = (p: BlogPost) => {
    setEditingPost(p);
    setIsCreatingNewPost(false);
    setPostForm({ ...p });
  };

  const handleSavePost = () => {
    if (!postForm.title?.trim() || !postForm.content?.trim()) {
      alert('Please provide at least an article headline and content.');
      return;
    }

    // Resolve service title from selected service ID
    const selectedService = siteData.services.items.find(s => s.id === postForm.relatedServiceId);
    const resolvedServiceTitle = selectedService ? selectedService.title : (postForm.relatedServiceTitle || 'Bespoke Services');

    if (isCreatingNewPost) {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        slug: postForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: postForm.title,
        subtitle: postForm.subtitle || '',
        excerpt: postForm.excerpt || postForm.content.slice(0, 160) + '...',
        content: postForm.content,
        category: postForm.category || 'Google My Business (GMB)',
        relatedServiceId: postForm.relatedServiceId || 'google-business-profile-optimization',
        relatedServiceTitle: resolvedServiceTitle,
        isGmbPost: !!postForm.isGmbPost,
        gmbTargetLocation: postForm.gmbTargetLocation || 'Sutton, SM1',
        gmbCtaType: postForm.gmbCtaType || 'Google Maps Directions',
        coverImage: postForm.coverImage || presetCoverImages[0].url,
        date: postForm.date || 'October 21, 2026',
        readTime: postForm.readTime || '4 min read',
        author: postForm.author || {
          name: siteData.name,
          role: 'Lead Designer',
          avatar: siteData.about.image
        },
        featured: !!postForm.featured,
        tags: Array.isArray(postForm.tags) ? postForm.tags : ['GMB', 'Local SEO'],
        keyTakeaways: postForm.keyTakeaways || []
      };

      onUpdatePosts([newPost, ...posts]);
      showCopyToast('New service & GMB article published!');
    } else if (editingPost) {
      const updated = posts.map(p => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            ...postForm,
            relatedServiceTitle: resolvedServiceTitle,
            tags: Array.isArray(postForm.tags) ? postForm.tags : p.tags,
            keyTakeaways: Array.isArray(postForm.keyTakeaways) ? postForm.keyTakeaways : p.keyTakeaways,
          } as BlogPost;
        }
        return p;
      });
      onUpdatePosts(updated);
      showCopyToast('Article updated successfully!');
    }

    setIsCreatingNewPost(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      onUpdatePosts(posts.filter(p => p.id !== id));
      showCopyToast('Article deleted.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-[var(--color-surface)] w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border border-[var(--color-border)] flex flex-col overflow-hidden text-[var(--color-ink)]">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border-subtle)] flex items-center justify-between bg-[var(--color-bg-alt)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-medium leading-tight">
                Studio Customizer & Handover
              </h2>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Handover backgrounds, manage GMB service blogs, and edit content
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--color-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[var(--color-border-subtle)] px-6 bg-[var(--color-surface)] gap-2">
          <button
            onClick={() => setActiveTab('theme')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
              activeTab === 'theme'
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Background & Handover</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('blog');
              setIsCreatingNewPost(false);
              setEditingPost(null);
            }}
            className={`py-3.5 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
              activeTab === 'blog'
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>GMB & Service Blog Editor ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('site')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
              activeTab === 'site'
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Studio Copy & Contact</span>
          </button>
        </div>

        {/* Toast alert */}
        {copiedNotice && (
          <div className="mx-6 mt-4 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-between border border-emerald-200 animate-in fade-in">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              {copiedNotice}
            </span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* TAB 1: BACKGROUND & HANDOVER */}
          {activeTab === 'theme' && (
            <div className="space-y-8">
              
              {/* Presets Grid */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-3">
                  Curated Background & Palette Presets
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {themePresets.map(preset => {
                    const isSelected = theme.presetName === preset.name;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => onUpdateTheme(preset.settings)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary-light)]/20 shadow-md bg-[var(--color-bg-alt)]'
                            : 'border-[var(--color-border-subtle)] hover:border-[var(--color-border)] bg-[var(--color-surface)]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-[var(--color-ink)]">
                              {preset.name}
                            </span>
                            {isSelected && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--color-ink-muted)] leading-tight mb-3">
                            {preset.description}
                          </p>
                        </div>

                        {/* Color swatches preview */}
                        <div className="flex items-center gap-1.5 pt-2 border-t border-[var(--color-border-subtle)]">
                          <span className="w-4 h-4 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: preset.settings.bg }} title="Canvas BG"></span>
                          <span className="w-4 h-4 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: preset.settings.bgAlt }} title="Alt Section BG"></span>
                          <span className="w-4 h-4 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: preset.settings.ink }} title="Ink"></span>
                          <span className="w-4 h-4 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: preset.settings.primary }} title="Primary"></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dedicated Blog Section Background Selector */}
              <div className="p-6 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)]">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-3">
                  Blog Section Background Handover Setting
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => onUpdateTheme({ ...theme, blogBgMode: 'match-site' })}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      theme.blogBgMode === 'match-site'
                        ? 'border-[var(--color-primary)] bg-[var(--color-surface)] font-bold shadow-xs'
                        : 'border-[var(--color-border-subtle)] hover:bg-[var(--color-surface)]'
                    }`}
                  >
                    <span className="block font-semibold mb-1">Match Main Site</span>
                    <span className="text-[11px] text-[var(--color-ink-muted)]">Inherits {theme.bg} seamlessly</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateTheme({ ...theme, blogBgMode: 'warm-paper' })}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      theme.blogBgMode === 'warm-paper'
                        ? 'border-[var(--color-primary)] bg-[var(--color-surface)] font-bold shadow-xs'
                        : 'border-[var(--color-border-subtle)] hover:bg-[var(--color-surface)]'
                    }`}
                  >
                    <span className="block font-semibold mb-1">Soft Warm Linen (#FAF7F2)</span>
                    <span className="text-[11px] text-[var(--color-ink-muted)]">Magazine editorial tactile feel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateTheme({ ...theme, blogBgMode: 'dark-luxury' })}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      theme.blogBgMode === 'dark-luxury'
                        ? 'border-[var(--color-primary)] bg-[var(--color-surface)] font-bold shadow-xs'
                        : 'border-[var(--color-border-subtle)] hover:bg-[var(--color-surface)]'
                    }`}
                  >
                    <span className="block font-semibold mb-1">Midnight Dark (#0E0A17)</span>
                    <span className="text-[11px] text-[var(--color-ink-muted)]">High contrast luxury dark mode</span>
                  </button>
                </div>

                {/* Custom Color for Blog Background */}
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
                  <span className="text-xs font-semibold text-[var(--color-ink)]">
                    Or Pick Custom Blog Background:
                  </span>
                  <input
                    type="color"
                    value={theme.blogCustomBgColor || '#FAF7F2'}
                    onChange={(e) => onUpdateTheme({
                      ...theme,
                      blogBgMode: 'custom-color',
                      blogCustomBgColor: e.target.value
                    })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-stone-300"
                  />
                  <input
                    type="text"
                    value={theme.blogCustomBgColor || '#FAF7F2'}
                    onChange={(e) => onUpdateTheme({
                      ...theme,
                      blogBgMode: 'custom-color',
                      blogCustomBgColor: e.target.value
                    })}
                    className="w-24 px-2 py-1 text-xs rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
                  />
                </div>
              </div>

              {/* Handover Toolkit Box */}
              <div className="p-6 rounded-2xl bg-[var(--color-primary-subtle)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
                  <Download className="w-4 h-4" />
                  <span>Handover & Deployment Toolkit</span>
                </div>
                <p className="text-xs text-[var(--color-ink-muted)] mb-5">
                  Hand over your tailored background tokens, GMB articles, and typography specs to clients or developers with 1-click.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportHandover}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Handover Pack (.json)</span>
                  </button>

                  <button
                    onClick={handleCopyCSS}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-bg-alt)] transition-all cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy CSS Variables</span>
                  </button>

                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-bg-alt)] transition-all cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Import Config JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportConfig}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={onResetAll}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors cursor-pointer ml-auto"
                    title="Reset all settings and posts back to initial state"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BLOG & GMB ARTICLE EDITOR */}
          {activeTab === 'blog' && (
            <div>
              {/* Form to create/edit or List */}
              {isCreatingNewPost || editingPost ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
                    <h3 className="font-heading text-xl font-medium text-[var(--color-ink)]">
                      {isCreatingNewPost ? 'Compose New Service & GMB Article' : `Editing: ${editingPost?.title}`}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreatingNewPost(false);
                        setEditingPost(null);
                      }}
                      className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] font-semibold"
                    >
                      ← Back to Article List
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* GMB Flag Checkbox */}
                    <div className="sm:col-span-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!postForm.isGmbPost}
                          onChange={(e) => setPostForm({ ...postForm, isGmbPost: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600"
                        />
                        <div>
                          <span className="text-xs font-bold text-emerald-900 block">
                            📍 Mark as Google My Business (GMB) & Local Strategy Article
                          </span>
                          <span className="text-[11px] text-emerald-700">
                            Highlights this article under the GMB filter and enables local map pack tags
                          </span>
                        </div>
                      </label>
                    </div>

                    {/* Associated Service Dropdown */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Associated Service
                      </label>
                      <select
                        value={postForm.relatedServiceId || 'google-business-profile-optimization'}
                        onChange={(e) => {
                          const s = siteData.services.items.find(item => item.id === e.target.value);
                          setPostForm({ 
                            ...postForm, 
                            relatedServiceId: e.target.value,
                            relatedServiceTitle: s ? s.title : ''
                          });
                        }}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:outline-none"
                      >
                        {siteData.services.items.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.number}. {s.title} ({s.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Target Location */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Target Location (For GMB & Local SEO)
                      </label>
                      <input
                        type="text"
                        value={postForm.gmbTargetLocation || ''}
                        onChange={(e) => setPostForm({ ...postForm, gmbTargetLocation: e.target.value })}
                        placeholder="e.g. Sutton, SM1 & Greater London"
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:outline-none"
                      />
                    </div>

                    {/* Article Headline */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Article Headline / Title
                      </label>
                      <input
                        type="text"
                        value={postForm.title || ''}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        placeholder="e.g. Google Business Profile Playbook: Dominating the 3-Pack..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={postForm.category || 'Google My Business (GMB)'}
                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={postForm.readTime || '5 min read'}
                        onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Short Excerpt / Summary
                      </label>
                      <input
                        type="text"
                        value={postForm.excerpt || ''}
                        onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                        placeholder="A concise overview of this GMB & service strategy..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:outline-none"
                      />
                    </div>

                    {/* Cover Image Selector */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        value={postForm.coverImage || ''}
                        onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })}
                        className="w-full px-4 py-2 text-xs rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] mb-2"
                      />
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-[var(--color-ink-muted)]">Quick Presets:</span>
                        {presetCoverImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setPostForm({ ...postForm, coverImage: img.url })}
                            className="px-2.5 py-1 text-[11px] rounded-md bg-[var(--color-bg-alt)] hover:bg-[var(--color-primary-subtle)] border border-[var(--color-border-subtle)] cursor-pointer"
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Core Takeaways */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Core Takeaway
                      </label>
                      <input
                        type="text"
                        value={postForm.keyTakeaways?.[0] || ''}
                        onChange={(e) => setPostForm({ ...postForm, keyTakeaways: [e.target.value] })}
                        placeholder="e.g. Geotagged studio photos and NAP consistency secure Google Maps 3-Pack ranking."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:outline-none"
                      />
                    </div>

                    {/* Full Content */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                        Complete Article Content (Markdown format)
                      </label>
                      <textarea
                        rows={10}
                        value={postForm.content || ''}
                        onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                        placeholder="Use '### Heading' for subheadings, '- item' for bullet points, and blank lines between paragraphs."
                        className="w-full px-4 py-3 text-sm font-mono rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] focus:outline-none leading-relaxed"
                      />
                    </div>

                    {/* Featured toggle */}
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!postForm.featured}
                          onChange={(e) => setPostForm({ ...postForm, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-[var(--color-primary)]"
                        />
                        <span className="text-xs font-semibold text-[var(--color-ink)]">
                          Feature this article as the lead essay
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
                    <button
                      onClick={() => {
                        setIsCreatingNewPost(false);
                        setEditingPost(null);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePost}
                      className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] shadow-xs"
                    >
                      Save Article
                    </button>
                  </div>
                </div>
              ) : (
                /* Post List View */
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-medium">All Service & GMB Articles</h3>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        Articles mapped to Amelie Barton's 12 services and Google My Business
                      </p>
                    </div>

                    <button
                      onClick={handleStartCreatePost}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Write New GMB / Service Post</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {posts.map(p => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] flex items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={p.coverImage}
                            alt=""
                            className="w-16 h-12 rounded-lg object-cover bg-stone-300 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-[10px] text-[var(--color-ink-muted)] mb-1">
                              {p.isGmbPost && (
                                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                                  <MapPin className="w-2.5 h-2.5" />
                                  <span>GMB</span>
                                </span>
                              )}
                              <span className="font-semibold text-[var(--color-primary-light)]">
                                Service: {p.relatedServiceTitle}
                              </span>
                              <span>·</span>
                              <span>{p.date}</span>
                            </div>
                            <h4 className="font-heading text-sm font-medium text-[var(--color-ink)] truncate max-w-md">
                              {p.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEditPost(p)}
                            className="p-2 rounded-lg text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] border border-[var(--color-border-subtle)] cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(p.id)}
                            className="p-2 rounded-lg text-xs font-medium text-[var(--color-ink-muted)] hover:text-red-600 hover:bg-red-50 border border-[var(--color-border-subtle)] cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STUDIO COPY & CONTACT */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={siteData.hero.headline}
                  onChange={(e) => onUpdateSiteData({
                    ...siteData,
                    hero: { ...siteData.hero, headline: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                  Hero Subheadline
                </label>
                <textarea
                  rows={3}
                  value={siteData.hero.subheadline}
                  onChange={(e) => onUpdateSiteData({
                    ...siteData,
                    hero: { ...siteData.hero, subheadline: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                    Studio Full Address
                  </label>
                  <input
                    type="text"
                    value={siteData.location.fullAddress}
                    onChange={(e) => onUpdateSiteData({
                      ...siteData,
                      location: { ...siteData.location, fullAddress: e.target.value }
                    })}
                    className="w-full px-4 py-2 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                    Studio WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={siteData.contact.whatsapp}
                    onChange={(e) => onUpdateSiteData({
                      ...siteData,
                      contact: {
                        ...siteData.contact,
                        whatsapp: e.target.value,
                        whatsappHref: `https://wa.me/${e.target.value.replace(/\D/g, '')}`
                      }
                    })}
                    className="w-full px-4 py-2 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    value={siteData.contact.email}
                    onChange={(e) => onUpdateSiteData({
                      ...siteData,
                      contact: {
                        ...siteData.contact,
                        email: e.target.value,
                        emailHref: `mailto:${e.target.value}`
                      }
                    })}
                    className="w-full px-4 py-2 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] block mb-1">
                    Studio Display Phone
                  </label>
                  <input
                    type="text"
                    value={siteData.contact.phoneDisplay}
                    onChange={(e) => onUpdateSiteData({
                      ...siteData,
                      contact: { ...siteData.contact, phoneDisplay: e.target.value }
                    })}
                    className="w-full px-4 py-2 text-sm rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)]"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[var(--color-bg-alt)] border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
          <span>All customizations persist automatically in local storage</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[var(--color-ink)] text-[var(--color-surface)] font-semibold cursor-pointer"
          >
            Done & Apply
          </button>
        </div>

      </div>
    </div>
  );
};
