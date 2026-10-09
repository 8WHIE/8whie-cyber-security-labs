/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Category Hub Page
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { WriteupCard } from '../components/WriteupCard.tsx';
import { CategorySlug } from '../types.ts';
import { ArrowLeft, BookOpen, Layers, CheckCircle2, Shield } from 'lucide-react';

interface CategoryHubPageProps {
  categorySlug: CategorySlug | string;
}

export const CategoryHubPage: React.FC<CategoryHubPageProps> = ({ categorySlug }) => {
  const { writeups, categories, navigate } = useLabs();

  const category = categories.find((c) => c.slug === categorySlug);
  const categoryWriteups = writeups.filter((w) => w.category === categorySlug);

  if (!category) {
    return (
      <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800 space-y-3 max-w-md mx-auto my-12">
        <h2 className="text-xl font-bold text-white">Discipline Not Found</h2>
        <p className="text-xs text-slate-400">The selected security discipline could not be located.</p>
        <button
          onClick={() => navigate('/writeups')}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg"
        >
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={() => navigate('/writeups')}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Write-ups</span>
      </button>

      {/* Category Header Hero */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Layers className="w-4 h-4" />
          <span>Security Discipline Specialization</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {category.name}
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          {category.description}
        </p>

        {/* Focus areas pills/tags */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Core Topics Covered:</span>
          <div className="flex flex-wrap gap-2 text-xs">
            {category.focusAreas.map((area) => (
              <span
                key={area}
                className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-850 text-slate-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Write-ups matching this category */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <h2 className="text-base font-bold text-white">
            Published Walkthroughs in {category.name}
          </h2>
          <span className="font-mono tabular-nums">
            {categoryWriteups.length} {categoryWriteups.length === 1 ? 'lab' : 'labs'}
          </span>
        </div>

        {categoryWriteups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryWriteups.map((w) => (
              <WriteupCard key={w.id} writeup={w} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-white">No write-ups in this discipline yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our research team is currently documenting new labs for {category.name}. You can also create and add your own write-up via the Lab Studio.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors mt-2"
            >
              Add Write-up in Studio
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
