/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Writeups Library
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React, { useMemo } from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { WriteupCard } from '../components/WriteupCard.tsx';
import { PlatformType, DifficultyLevel, CategorySlug } from '../types.ts';
import { Search, Filter, RotateCcw, BookOpen } from 'lucide-react';

export const WriteupsPage: React.FC = () => {
  const { writeups, categories, filters, setFilters, resetFilters } = useLabs();

  const platforms: (PlatformType | 'All')[] = [
    'All',
    'TryHackMe',
    'Hack The Box',
    'PortSwigger Academy',
    '8WHIE Custom Labs',
    'Blue Team Labs',
  ];

  const difficulties: (DifficultyLevel | 'All')[] = [
    'All',
    'Easy',
    'Medium',
    'Hard',
    'Insane',
  ];

  // Filtered and sorted writeups
  const filteredWriteups = useMemo(() => {
    return writeups.filter((item) => {
      // Platform match
      if (filters.platform !== 'All' && item.platform !== filters.platform) {
        return false;
      }

      // Difficulty match
      if (filters.difficulty !== 'All' && item.difficulty !== filters.difficulty) {
        return false;
      }

      // Category match
      if (filters.category !== 'All' && item.category !== filters.category) {
        return false;
      }

      // Search query match
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesMachine = item.machineName.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCVE = (item.cveReferences || []).some((c) => c.toLowerCase().includes(q));
        const matchesAuthor = item.author.toLowerCase().includes(q);

        if (!matchesTitle && !matchesMachine && !matchesSummary && !matchesTags && !matchesCVE && !matchesAuthor) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (filters.sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (filters.sortBy === 'difficulty-desc') {
        const weight: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3, Insane: 4 };
        return (weight[b.difficulty] || 0) - (weight[a.difficulty] || 0);
      }
      if (filters.sortBy === 'read-time') {
        const getTime = (str: string) => parseInt(str) || 0;
        return getTime(a.readTime) - getTime(b.readTime);
      }
      return 0;
    });
  }, [writeups, filters]);

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.platform !== 'All' ||
    filters.difficulty !== 'All' ||
    filters.category !== 'All';

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          CTF Write-ups & Lab Walkthroughs
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Search and filter technical walkthroughs from authorized training environments and capture-the-flag competitions.
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="space-y-4 p-4 sm:p-5 rounded-xl bg-slate-900/50 border border-slate-800/80">
        
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by title, machine name, CVE, tag, or technique..."
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 sm:top-3 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-slate-400 whitespace-nowrap">
              Sort:
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as any,
                }))
              }
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="difficulty-desc">Highest Difficulty</option>
              <option value="read-time">Shortest Read Time</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors whitespace-nowrap"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Interactive Filter Controls */}
        <div className="space-y-3 pt-3 border-t border-slate-800/60 text-xs">
          
          {/* Platform Segmented Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-slate-400 font-medium w-20 shrink-0">Platform:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {platforms.map((p) => {
                const isSelected = filters.platform === p;
                return (
                  <button
                    key={p}
                    onClick={() => setFilters((prev) => ({ ...prev, platform: p }))}
                    className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Segmented Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-slate-400 font-medium w-20 shrink-0">Difficulty:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {difficulties.map((d) => {
                const isSelected = filters.difficulty === d;
                return (
                  <button
                    key={d}
                    onClick={() => setFilters((prev) => ({ ...prev, difficulty: d }))}
                    className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-slate-400 font-medium w-20 shrink-0">Category:</span>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value as any }))}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 max-w-xs"
            >
              <option value="All">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <span className="font-mono tabular-nums font-semibold text-white">{filteredWriteups.length}</span> of{' '}
          <span className="font-mono tabular-nums">{writeups.length}</span> write-ups
        </div>
      </div>

      {/* Grid of Writeups */}
      {filteredWriteups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWriteups.map((writeup) => (
            <WriteupCard key={writeup.id} writeup={writeup} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No write-ups match your criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, or clear active filters to view all available lab walkthroughs.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors mt-2"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
