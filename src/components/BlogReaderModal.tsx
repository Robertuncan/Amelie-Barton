import React, { useState } from 'react';
import { BlogPost } from '../types';
import { X, Clock, Share2, Check, MessageCircle, ArrowLeft, BookmarkCheck } from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectOtherPost: (post: BlogPost) => void;
  allPosts: BlogPost[];
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  onClose,
  onSelectOtherPost,
  allPosts
}) => {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 2);

  // Format markdown-like content cleanly
  const renderFormattedContent = (rawText: string) => {
    const paragraphs = rawText.split('\n\n');
    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      
      // H3 headers
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="font-heading text-2xl font-medium text-[var(--color-ink)] mt-8 mb-3"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      
      // H2 headers
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="font-heading text-3xl font-medium text-[var(--color-ink)] mt-10 mb-4"
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ul key={idx} className="my-4 space-y-2 list-disc list-inside text-[var(--color-ink)]/90">
            {items.map((it, i) => (
              <li key={i} className="text-base leading-relaxed">
                {it.replace(/^[-*]|\d+\.\s*/, '').trim()}
              </li>
            ))}
          </ul>
        );
      }

      // Regular paragraph
      return (
        <p key={idx} className="text-base sm:text-lg text-[var(--color-ink)]/85 leading-relaxed mb-5 font-normal">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div className="bg-[var(--color-surface)] w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-border)] relative flex flex-col my-auto">
        
        {/* Sticky top action bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Header & Cover */}
        <div className="px-6 sm:px-12 pt-8 sm:pt-12 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-ink-muted)] mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary-light)] font-semibold uppercase tracking-wider text-[11px]">
              {post.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] text-[11px] font-medium text-[var(--color-ink)]">
              Service: {post.relatedServiceTitle}
            </span>
            {post.isGmbPost && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                📍 GMB Strategy
              </span>
            )}
            {post.gmbTargetLocation && (
              <span className="text-[11px] text-emerald-700 font-medium">
                Target: {post.gmbTargetLocation}
              </span>
            )}
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-ink)] leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-ink-muted)] font-light leading-relaxed mb-8">
            {post.subtitle || post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3.5 py-4 border-y border-[var(--color-border-subtle)]">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover border border-[var(--color-border)]"
            />
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">{post.author.name}</p>
              <p className="text-xs text-[var(--color-ink-muted)]">{post.author.role} · Sutton Studio</p>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="w-full aspect-[21/10] sm:aspect-[21/9] overflow-hidden bg-stone-200">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="px-6 sm:px-12 py-10 max-w-3xl mx-auto w-full">
          
          {/* Key Takeaways Callout */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-2xl bg-[var(--color-primary-subtle)] border border-[var(--color-border)] mb-10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3">
                <BookmarkCheck className="w-4 h-4" />
                <span>Executive Summary & Key Takeaways</span>
              </div>
              <ul className="space-y-2.5">
                {post.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="text-sm sm:text-base text-[var(--color-ink)] flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)] mt-2 shrink-0"></span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content Paragraphs */}
          <div className="prose prose-stone max-w-none">
            {renderFormattedContent(post.content)}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-[var(--color-border-subtle)] flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs bg-[var(--color-bg-alt)] text-[var(--color-ink-muted)] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Direct Consultation Box */}
          <div className="mt-10 p-8 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading text-xl font-medium text-[var(--color-ink)] mb-1">
                Implement this architecture for your business
              </p>
              <p className="text-xs sm:text-sm text-[var(--color-ink-muted)]">
                Discuss typography, speed optimization, and local SEO directly with Amelie Barton.
              </p>
            </div>
            <a
              href={`https://wa.me/447915929263?text=Hi%20Amelie%2C%20I%20read%20your%20journal%20essay%20'${encodeURIComponent(post.title)}'%20and%20would%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-primary)] text-white text-xs sm:text-sm font-medium hover:bg-[var(--color-primary-hover)] shrink-0 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-14 pt-8 border-t border-[var(--color-border-subtle)]">
              <h4 className="font-heading text-lg font-medium text-[var(--color-ink)] mb-4">
                More from the Journal
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectOtherPost(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-primary-light)] bg-[var(--color-surface)] cursor-pointer transition-all group"
                  >
                    <span className="text-[10px] font-semibold text-[var(--color-primary-light)] uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h5 className="font-heading text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-primary)] line-clamp-2">
                      {rel.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
