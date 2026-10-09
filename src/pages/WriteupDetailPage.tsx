/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Writeup Detail Page
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React, { useState } from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { CodeBlock } from '../components/CodeBlock.tsx';
import { EthicalBanner } from '../components/EthicalBanner.tsx';
import { WriteupCard } from '../components/WriteupCard.tsx';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Check,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Monitor,
  ChevronRight,
  ChevronLeft,
  Layers,
  Clock,
  User,
  Calendar,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface WriteupDetailPageProps {
  slug: string;
}

export const WriteupDetailPage: React.FC<WriteupDetailPageProps> = ({ slug }) => {
  const { writeups, navigate, isBookmarked, toggleBookmark } = useLabs();
  const [copiedLink, setCopiedLink] = useState(false);

  // Find writeup by slug
  const currentIndex = writeups.findIndex((w) => w.slug === slug);
  const writeup = writeups[currentIndex];

  if (!writeup) {
    return (
      <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800 space-y-4 max-w-lg mx-auto my-12">
        <ShieldAlert className="w-10 h-10 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Lab Write-up Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested machine analysis does not exist or may have been updated.
        </p>
        <button
          onClick={() => navigate('/writeups')}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
        >
          Return to Write-ups
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(writeup.id);
  const prevWriteup = currentIndex > 0 ? writeups[currentIndex - 1] : null;
  const nextWriteup = currentIndex < writeups.length - 1 ? writeups[currentIndex + 1] : null;

  // Related writeups (same category or platform, excluding this one)
  const related = writeups
    .filter((w) => w.id !== writeup.id && (w.category === writeup.category || w.platform === writeup.platform))
    .slice(0, 2);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // fallback
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400';
      case 'Medium':
        return 'text-amber-400';
      case 'Hard':
        return 'text-rose-400';
      case 'Insane':
        return 'text-purple-400';
      default:
        return 'text-slate-400';
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      
      {/* Back button & Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate('/writeups')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(writeup.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              bookmarked
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Copy URL to clipboard"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Header / Title Lockup */}
      <div className="space-y-4">
        {/* Unboxed Metadata (Zero-Pill discipline) */}
        <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <span className="font-semibold text-slate-200">{writeup.platform}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Target: <strong className="text-slate-200">{writeup.machineName}</strong></span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className={`font-semibold ${getDifficultyColor(writeup.difficulty)}`}>
            {writeup.difficulty} Difficulty
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{writeup.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {writeup.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 border-b border-slate-850 pb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span>Written by <strong className="text-slate-200">{writeup.author}</strong></span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{writeup.date}</span>
          </div>
        </div>
      </div>

      {/* Ethical Practice Notice */}
      <EthicalBanner compact />

      {/* Main Content Layout with Sticky Table of Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left 3 Columns: Walkthrough Body */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Machine Profile / Telemetry Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Lab Target Profile
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-850">
                <span className="text-slate-500 block text-[11px]">Lab IP / Host</span>
                <span className="font-mono text-emerald-400 font-medium">
                  {writeup.targetIp || 'Dynamic Lab IP'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-850">
                <span className="text-slate-500 block text-[11px]">Operating System</span>
                <span className="text-slate-200 font-medium">{writeup.os || 'Linux'}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-850">
                <span className="text-slate-500 block text-[11px]">CVE References</span>
                <span className="font-mono text-amber-400 font-medium">
                  {writeup.cveReferences && writeup.cveReferences.length > 0
                    ? writeup.cveReferences.join(', ')
                    : 'Architectural / Misconfig'}
                </span>
              </div>
            </div>

            {/* MITRE ATT&CK Matrix Mapping */}
            {writeup.mitreAttack && writeup.mitreAttack.length > 0 && (
              <div className="pt-2 border-t border-slate-850">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  MITRE ATT&CK Matrix Mapping:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {writeup.mitreAttack.map((item) => (
                    <div
                      key={item.techniqueId}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      <span className="font-mono text-emerald-400 font-semibold mr-1.5">
                        {item.techniqueId}
                      </span>
                      <span>{item.techniqueName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary / Executive Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Overview & Scenario</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {writeup.summary}
            </p>
          </div>

          {/* Prerequisites & Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {writeup.prerequisites && writeup.prerequisites.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Prerequisites</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {writeup.prerequisites.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-600 font-mono">›</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Key Learning Takeaways</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {writeup.keyTakeaways.map((k, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500/80 font-mono">✓</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sequential Walkthrough Phases */}
          <div className="space-y-12">
            {writeup.sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="space-y-4 pt-4 scroll-mt-24 border-t border-slate-850"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Phase {idx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>

                {/* Warning note if present */}
                {section.warningNote && (
                  <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{section.warningNote}</span>
                  </div>
                )}

                {/* Tip note if present */}
                {section.tipNote && (
                  <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{section.tipNote}</span>
                  </div>
                )}

                {/* Code snippets */}
                {section.snippets && section.snippets.map((snip) => (
                  <CodeBlock
                    key={snip.id}
                    code={snip.code}
                    language={snip.language}
                    title={snip.title}
                    explanation={snip.explanation}
                  />
                ))}
              </section>
            ))}
          </div>

          {/* Remediation & Defensive Hardening Advice */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Remediation & Defense Hardening</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {writeup.remediationAdvice}
            </p>
          </div>

          {/* Previous / Next Machine Navigation */}
          <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevWriteup ? (
              <button
                onClick={() => navigate(`/writeup/${prevWriteup.slug}`)}
                className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-left hover:border-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-emerald-400">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Walkthrough</span>
                </div>
                <div className="text-xs font-semibold text-white mt-1 group-hover:text-emerald-400 transition-colors truncate">
                  {prevWriteup.title}
                </div>
              </button>
            ) : <div />}

            {nextWriteup ? (
              <button
                onClick={() => navigate(`/writeup/${nextWriteup.slug}`)}
                className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-right hover:border-slate-700 transition-colors group"
              >
                <div className="flex items-center justify-end gap-1 text-[11px] text-slate-500 group-hover:text-emerald-400">
                  <span>Next Walkthrough</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-semibold text-white mt-1 group-hover:text-emerald-400 transition-colors truncate">
                  {nextWriteup.title}
                </div>
              </button>
            ) : <div />}
          </div>

          {/* Related Write-ups */}
          {related.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-base font-bold text-white">Related Machine Walkthroughs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <WriteupCard key={r.id} writeup={r} />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Column: Sticky Table of Contents & Quick Navigation */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 space-y-6 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Table of Contents
            </h4>

            <nav className="space-y-2 text-xs">
              {writeup.sections.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left py-1 text-slate-400 hover:text-emerald-400 transition-colors block truncate"
                >
                  <span className="font-mono text-slate-500 mr-1.5">{idx + 1}.</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
              <div>
                <span className="text-slate-500 block">Category:</span>
                <span className="text-slate-300 font-medium">{writeup.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Copyright:</span>
                <span className="text-slate-300">© 2026 8WHIE</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
};
