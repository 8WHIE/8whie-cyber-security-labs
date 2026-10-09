/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Navigation Bar
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React, { useState } from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { 
  Shield, 
  Search, 
  Bookmark, 
  PlusCircle, 
  Menu, 
  X,
  Compass,
  Wrench,
  BookOpen,
  Info
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, bookmarks, filters, setFilters } = useLabs();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { label: 'Write-ups', path: '/writeups', icon: BookOpen },
    { label: 'Roadmaps', path: '/roadmaps', icon: Compass },
    { label: 'Tools', path: '/tools', icon: Wrench },
    { label: 'About', path: '/about', icon: Info },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRoute !== '/writeups') {
      navigate('/writeups');
    }
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md py-1"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap block">
                  8WHIE <span className="text-emerald-400 font-semibold text-sm">Labs</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
                  Worldwide Hackers Intelligence & Ethics
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Single-line Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = currentRoute === item.path || currentRoute.startsWith(item.path + '/');
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`transition-colors whitespace-nowrap py-1 relative hover:text-white ${
                    isActive ? 'text-emerald-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Search */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Quick Search Bar / Toggle */}
            <div className="relative hidden lg:block w-48 xl:w-56">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search labs, CVEs..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  onFocus={() => {
                    if (currentRoute !== '/writeups') navigate('/writeups');
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
              </form>
            </div>

            {/* Mobile/Tablet Search Icon Toggle */}
            <button
              onClick={() => {
                if (currentRoute !== '/writeups') navigate('/writeups');
                setSearchOpen(!searchOpen);
              }}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              title="Search write-ups"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks Counter Button */}
            <button
              onClick={() => handleNavClick('/bookmarks')}
              className={`p-2 rounded-lg transition-colors relative flex items-center gap-1.5 text-xs font-medium ${
                currentRoute === '/bookmarks'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
              title="Saved write-ups"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="text-[11px] font-mono tabular-nums text-emerald-400">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Admin Studio CTA Button */}
            <button
              onClick={() => handleNavClick('/dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors whitespace-nowrap shadow-sm shadow-emerald-500/10"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Lab Studio</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input dropdown */}
        {searchOpen && (
          <div className="lg:hidden py-2 border-t border-slate-800">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search labs, machines, CVEs..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-3 pointer-events-none" />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800/80 mt-2 space-y-1">
            <button
              onClick={() => handleNavClick('/bookmarks')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4" />
                <span>Saved Bookmarks</span>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {bookmarks.length}
              </span>
            </button>

            <button
              onClick={() => handleNavClick('/dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-emerald-400 hover:bg-slate-900 font-medium"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Lab Studio (Add / Edit Write-ups)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
