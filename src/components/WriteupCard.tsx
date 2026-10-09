/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - WriteupCard Component
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { Writeup } from '../types.ts';
import { useLabs } from '../context/LabsContext.tsx';
import { Bookmark, ArrowUpRight, Terminal, Monitor } from 'lucide-react';

interface WriteupCardProps {
  writeup: Writeup;
}

export const WriteupCard: React.FC<WriteupCardProps> = ({ writeup }) => {
  const { navigate, isBookmarked, toggleBookmark } = useLabs();
  const bookmarked = isBookmarked(writeup.id);

  // Difficulty color styling as text color only, no pill box
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

  return (
    <article className="group relative rounded-xl border border-slate-800/90 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700/80 transition-all duration-200 flex flex-col justify-between p-5">
      <div>
        {/* Unboxed Metadata Kicker (Zero-Pill discipline) */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-slate-300">{writeup.platform}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className={`font-medium ${getDifficultyColor(writeup.difficulty)}`}>
              {writeup.difficulty}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-500">{writeup.readTime}</span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(writeup.id);
            }}
            className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${
              bookmarked ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark write-up'}
            aria-label="Bookmark"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors leading-snug">
          <button
            onClick={() => navigate(`/writeup/${writeup.slug}`)}
            className="text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
          >
            {writeup.title}
          </button>
        </h3>

        {/* Machine info & Summary */}
        <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
          {writeup.summary}
        </p>

        {/* Tags unboxed with slash or dot */}
        {writeup.tags.length > 0 && (
          <div className="mt-3.5 flex items-center gap-1.5 text-[11px] text-slate-500 flex-wrap">
            <span className="text-slate-600 font-mono">#</span>
            {writeup.tags.slice(0, 4).map((tag, idx) => (
              <span key={tag} className="hover:text-slate-400">
                {tag}
                {idx < Math.min(writeup.tags.length, 4) - 1 && <span className="text-slate-700 mx-1">·</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Author & Action Link */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <span>By {writeup.author}</span>
          <span aria-hidden="true">·</span>
          <span>{writeup.date}</span>
        </div>

        <button
          onClick={() => navigate(`/writeup/${writeup.slug}`)}
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          <span>Read Lab</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
