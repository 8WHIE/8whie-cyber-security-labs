/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Main Application
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { LabsProvider, useLabs } from './context/LabsContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { WriteupsPage } from './pages/WriteupsPage.tsx';
import { WriteupDetailPage } from './pages/WriteupDetailPage.tsx';
import { PlatformHubPage } from './pages/PlatformHubPage.tsx';
import { CategoryHubPage } from './pages/CategoryHubPage.tsx';
import { RoadmapsPage } from './pages/RoadmapsPage.tsx';
import { ToolsPage } from './pages/ToolsPage.tsx';
import { BookmarksPage } from './pages/BookmarksPage.tsx';
import { AdminDashboardPage } from './pages/AdminDashboardPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ShieldAlert } from 'lucide-react';

const AppRouter: React.FC = () => {
  const { currentRoute, navigate } = useLabs();

  // Route parser
  const renderRoute = () => {
    // Normalization
    const path = currentRoute.startsWith('/') ? currentRoute : `/${currentRoute}`;

    if (path === '/' || path === '') {
      return <HomePage />;
    }

    if (path === '/writeups') {
      return <WriteupsPage />;
    }

    if (path.startsWith('/writeup/')) {
      const slug = path.replace('/writeup/', '');
      return <WriteupDetailPage slug={slug} />;
    }

    if (path.startsWith('/platform/')) {
      const platformName = path.replace('/platform/', '');
      return <PlatformHubPage platformName={platformName} />;
    }

    if (path.startsWith('/category/')) {
      const categorySlug = path.replace('/category/', '');
      return <CategoryHubPage categorySlug={categorySlug} />;
    }

    if (path === '/roadmaps') {
      return <RoadmapsPage />;
    }

    if (path === '/tools') {
      return <ToolsPage />;
    }

    if (path === '/bookmarks') {
      return <BookmarksPage />;
    }

    if (path === '/dashboard') {
      return <AdminDashboardPage />;
    }

    if (path === '/about') {
      return <AboutPage />;
    }

    // 404 Fallback
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">404 — Endpoint Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested path does not exist in 8WHIE Cyber Security Labs.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
        >
          Return to Lab Headquarters
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-300">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderRoute()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LabsProvider>
      <AppRouter />
    </LabsProvider>
  );
}
