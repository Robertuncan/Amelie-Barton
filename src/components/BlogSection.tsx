import React, { useState, useMemo } from 'react';
import { BlogPost, ThemeSettings, ServiceItem } from '../types';
import { 
  Search, BookOpen, Clock, Tag, ArrowRight, PlusCircle, Sparkles, 
  MapPin, CheckCircle, Sliders, Palette, Download, Copy, Edit3, Trash2,
  ExternalLink, Layers
} from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  services: ServiceItem[];
  theme: ThemeSettings;
  onUpdateTheme: (theme: ThemeSettings) => void;
  onSelectPost: (post: BlogPost) => void;
  onOpenEditorToBlog: (initialPost?: BlogPost) => void;
  onDeletePost: (id: string) => void;
  onOpenHandoverModal: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  services,
  theme,
  onUpdateTheme,
  onSelectPost,
  onOpenEditorToBlog,
  onDeletePost,
  onOpenHandoverModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'gmb-only'>('all');
  const [inlineEditMode, setInlineEditMode] = useState(false);
  const [copiedBgToast, setCopiedBgToast] = useState(false);

  // Background presets specifically for the blog section
  const blogBgPresets = [
    { label: 'Signature Ivory', color: '#FCFBF9', text: '#140E21', mode: 'match-site' as const },
    { label: 'Soft Warm Linen', color: '#FAF7F2', text: '#231B15', mode: 'warm-paper' as const },
    { label: 'Lavender Mist', color: '#F5F3FF', text: '#140E21', mode: 'custom-color' as const },
    { label: 'Midnight Velvet Dark', color: '#0E0A17', text: '#F9F8FD', mode: 'dark-luxury' as const },
    { label: 'Studio Bone White', color: '#FFFFFF', text: '#111827', mode: 'custom-color' as const },
  ];

  // Current blog section background styling
  const currentBlogBg = 
    theme.blogBgMode === 'dark-luxury' ? '#0E0A17' :
    theme.blogBgMode === 'warm-paper' ? '#FAF7F2' :
    theme.blogBgMode === 'custom-color' && theme.blogCustomBgColor ? theme.blogCustomBgColor :
    'var(--color-bg)';

  const currentBlogText = 
    theme.blogBgMode === 'dark-luxury' ? '#F9F8FD' : 'inherit';

  // Quick handover copy for blog background
  const handleCopyBlogBgHandover = () => {
    const handoverText = `/* Amelie Barton - Blog Section Background Handover */
--blog-section-bg: ${currentBlogBg};
--blog-section-mode: ${theme.blogBgMode};
--blog-active-theme: ${theme.presetName};
--gmb-posts-count: ${posts.filter(p => p.isGmbPost).length};
--services-linked-count: ${services.length};`;
    navigator.clipboard.writeText(handoverText);
    setCopiedBgToast(true);
    setTimeout(() => setCopiedBgToast(false), 2500);
  };

  // Filter posts based on GMB tab, service dropdown, and search query
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // GMB tab check
      if (activeTab === 'gmb-only' && !post.isGmbPost) {
        return false;
      }

      // Service filter check
      if (selectedServiceFilter !== 'all' && post.relatedServiceId !== selectedServiceFilter) {
        return false;
      }

      // Search query check
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesService = post.relatedServiceTitle.toLowerCase().includes(query);
        const matchesTags = post.tags.some(t => t.toLowerCase().includes(query));
        const matchesLocation = post.gmbTargetLocation?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesExcerpt && !matchesService && !matchesTags && !matchesLocation) {
          return false;
        }
      }

      return true;
    });
  }, [posts, activeTab, selectedServiceFilter, searchQuery]);

  const gmbPostsCount = posts.filter(p => p.isGmbPost).length;

  return (
    <section 
      id="journal" 
      className="py-20 lg:py-28 relative border-t border-[var(--color-border-subtle)] transition-colors duration-300"
      style={{
        backgroundColor: currentBlogBg,
        color: currentBlogText
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DIRECT ON-SECTION BACKGROUND HANDOVER & EDIT BAR */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md flex flex-wrap items-center justify-between gap-4">
          
          {/* Background Handover & Color Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[var(--color-primary-light)]" />
              <span>Blog Background Handover:</span>
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {blogBgPresets.map((preset, idx) => {
                const isActive = 
                  (preset.mode === theme.blogBgMode && preset.mode !== 'custom-color') ||
                  (preset.mode === 'custom-color' && theme.blogCustomBgColor === preset.color);
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onUpdateTheme({
                        ...theme,
                        blogBgMode: preset.mode,
                        blogCustomBgColor: preset.color
                      });
                    }}
                    className={`px-2.5 py-1 text-xs rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] font-semibold shadow-xs'
                        : 'bg-[var(--color-bg-alt)] text-[var(--color-ink)] border-[var(--color-border-subtle)] hover:border-[var(--color-border)]'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/20" 
                      style={{ backgroundColor: preset.color }}
                    ></span>
                    <span>{preset.label}</span>
                  </button>
                );
              })}

              {/* Custom Color Input */}
              <label className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] cursor-pointer">
                <span className="text-[10px] text-[var(--color-ink-muted)]">Custom:</span>
                <input
                  type="color"
                  value={theme.blogCustomBgColor || '#FAF7F2'}
                  onChange={(e) => {
                    onUpdateTheme({
                      ...theme,
                      blogBgMode: 'custom-color',
                      blogCustomBgColor: e.target.value
                    });
                  }}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                  title="Pick bespoke background color"
                />
              </label>
            </div>
          </div>

          {/* Quick Actions: Copy Handover & In-Place Edit Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBlogBgHandover}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-primary-subtle)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer border border-[var(--color-border)]"
              title="Copy background CSS token and handover data"
            >
              {copiedBgToast ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBgToast ? 'Handover Copied!' : 'Handover Background'}</span>
            </button>

            <button
              onClick={() => setInlineEditMode(!inlineEditMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                inlineEditMode
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-[var(--color-surface)] text-[var(--color-ink)] border-[var(--color-border)] hover:bg-[var(--color-bg-alt)]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{inlineEditMode ? 'Exit Quick Edit' : 'Quick Edit Posts'}</span>
            </button>

            <button
              onClick={() => onOpenEditorToBlog()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Service / GMB Post</span>
            </button>
          </div>

        </div>

        {/* SECTION HEADER & GMB FOCUS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary-light)] mb-3 bg-[var(--color-primary-subtle)] px-3 py-1 rounded-full border border-[var(--color-border)]">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Service Guides & Google My Business (GMB) Architecture</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3">
              The Web Design & GMB Journal
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-ink-muted)]">
              Articles and strategic blueprints organized by each of our 12 services, specifically engineered for <strong>Google Business Profile (GMB)</strong> domination and high local rankings in Sutton & Surrey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={onOpenHandoverModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-semibold hover:border-[var(--color-primary-light)] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[var(--color-primary-light)]" />
              <span>Complete Handover Pack (.json)</span>
            </button>
          </div>
        </div>

        {/* SERVICE & GMB FILTER TABS */}
        <div className="space-y-4 pb-6 mb-10 border-b border-[var(--color-border-subtle)]">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Primary Toggle: All vs GMB Focused */}
            <div className="inline-flex p-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[var(--color-primary)] text-white shadow-xs'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                All Services Articles ({posts.length})
              </button>

              <button
                onClick={() => setActiveTab('gmb-only')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'gmb-only'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 hover:text-emerald-800'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Google My Business (GMB) Only ({gmbPostsCount})</span>
              </button>
            </div>

            {/* Service Dropdown Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[var(--color-ink-muted)]">
                Filter by Service:
              </span>
              <select
                value={selectedServiceFilter}
                onChange={(e) => setSelectedServiceFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink)] font-medium focus:outline-none focus:border-[var(--color-primary-light)]"
              >
                <option value="all">All 12 Services</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.number}. {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)]" />
              <input
                type="text"
                placeholder="Search GMB, service, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-1.5 text-xs rounded-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] focus:outline-none text-[var(--color-ink)] placeholder-[var(--color-ink-faint)]"
              />
            </div>

          </div>

          {/* Quick Service Pills for Fast Access */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedServiceFilter('all')}
              className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                selectedServiceFilter === 'all'
                  ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-bold border border-[var(--color-border)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-ink-muted)] border border-[var(--color-border-subtle)]'
              }`}
            >
              All Services
            </button>
            {services.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedServiceFilter(s.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                  selectedServiceFilter === s.id
                    ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-bold border border-[var(--color-border)]'
                    : 'bg-[var(--color-surface)] text-[var(--color-ink-muted)] border border-[var(--color-border-subtle)]'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

        </div>

        {/* EMPTY STATE */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border-subtle)]">
            <BookOpen className="w-10 h-10 mx-auto text-[var(--color-ink-faint)] mb-3" />
            <p className="font-heading text-xl mb-2">No articles match your filter</p>
            <p className="text-xs text-[var(--color-ink-muted)] mb-6">
              There are no articles currently listed under this specific service filter or query.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedServiceFilter('all');
                  setActiveTab('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)]"
              >
                Reset Filters
              </button>
              <button
                onClick={() => onOpenEditorToBlog()}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-[var(--color-primary)] text-white"
              >
                Write an Article for This Service
              </button>
            </div>
          </div>
        )}

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary-light)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Quick Inline Edit Controls if mode active */}
              {inlineEditMode && (
                <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEditorToBlog(post);
                    }}
                    className="p-1.5 rounded text-white hover:text-amber-300"
                    title="Edit article"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete '${post.title}'?`)) {
                        onDeletePost(post.id);
                      }
                    }}
                    className="p-1.5 rounded text-white hover:text-red-400"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div 
                onClick={() => onSelectPost(post)}
                className="cursor-pointer"
              >
                {/* Cover Image Frame */}
                <div className="aspect-[16/10] overflow-hidden bg-stone-200 relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {post.isGmbPost && (
                      <span className="inline-flex items-center gap-1 bg-emerald-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                        <MapPin className="w-3 h-3" />
                        <span>GMB Strategy</span>
                      </span>
                    )}
                    {post.featured && (
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-medium flex items-center justify-between">
                    <span className="truncate">Service: {post.relatedServiceTitle}</span>
                    <span className="text-[10px] text-stone-300 shrink-0">{post.readTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  
                  {/* Metadata Row */}
                  <div className="flex items-center justify-between text-[11px] text-[var(--color-ink-muted)] mb-2.5">
                    <span className="font-semibold text-[var(--color-primary-light)] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors mb-2.5 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Target Location / GMB Tag */}
                  {post.gmbTargetLocation && (
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-3 border border-emerald-100 font-medium">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>Target: {post.gmbTargetLocation}</span>
                    </div>
                  )}

                  {/* Key Takeaway preview */}
                  {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-[var(--color-bg-alt)] text-[11px] text-[var(--color-ink)] mb-3 italic border border-[var(--color-border-subtle)]">
                      "{post.keyTakeaways[0]}"
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-bg-alt)] text-[var(--color-ink-muted)]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Card Bottom Bar */}
              <div 
                onClick={() => onSelectPost(post)}
                className="px-6 py-3.5 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-alt)]/40 flex items-center justify-between text-xs cursor-pointer group-hover:bg-[var(--color-primary-subtle)] transition-colors"
              >
                <span className="font-medium text-[var(--color-ink-muted)]">
                  By {post.author.name}
                </span>

                <span className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">
                  <span>Read Strategy Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
