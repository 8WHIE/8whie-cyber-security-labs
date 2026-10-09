/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Bookmarks Page
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { WriteupCard } from '../components/WriteupCard.tsx';
import { Bookmark, ArrowLeft, Trash2, BookOpen } from 'lucide-react';

export const BookmarksPage: React.FC = () => {
  const { writeups, bookmarks, navigate, toggleBookmark } = useLabs();

  const savedWriteups = writeups.filter((w) => bookmarks.includes(w.id));

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/writeups')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Write-ups</span>
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Bookmark className="w-6 h-6 text-emerald-400 fill-current" />
            <span>Saved Lab Bookmarks</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Your personalized study list of machines, techniques, and CVE write-ups saved for review.
          </p>
        </div>

        {savedWriteups.length > 0 && (
          <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
            <span className="text-emerald-400 font-bold tabular-nums">{savedWriteups.length}</span> saved walkthroughs
          </div>
        )}
      </div>

      {/* Grid of Saved Writeups */}
      {savedWriteups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedWriteups.map((w) => (
            <WriteupCard key={w.id} writeup={w} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4 max-w-lg mx-auto">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-semibold text-white">Your Reading List is Empty</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            While exploring machine write-ups, click the bookmark icon on any card or reader header to save walkthroughs here for quick offline reference.
          </p>
          <button
            onClick={() => navigate('/writeups')}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors mt-2"
          >
            Explore Write-ups Library
          </button>
        </div>
      )}

    </div>
  );
};
