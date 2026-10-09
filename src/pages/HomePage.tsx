/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Homepage
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { WriteupCard } from '../components/WriteupCard.tsx';
import { CategoryCard } from '../components/CategoryCard.tsx';
import { EthicalBanner } from '../components/EthicalBanner.tsx';
import { 
  Shield, 
  Terminal, 
  ArrowRight, 
  Layers, 
  Compass, 
  Search, 
  BookOpen, 
  Award,
  CheckCircle2,
  FileCode2,
  Cpu,
  Lock
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { writeups, categories, navigate, setFilters } = useLabs();

  // Statistics
  const totalWriteups = writeups.length;
  const learningPathsCount = 4;
  const securityTopicsCount = categories.length;
  const ctfPlatformsCount = Array.from(new Set(writeups.map((w) => w.platform))).length;

  // Featured writeups
  const featuredWriteups = writeups.filter((w) => w.isFeatured);
  const displayFeatured = featuredWriteups.length > 0 ? featuredWriteups : writeups.slice(0, 3);

  // Core disciplines highlighted on homepage
  const highlightSlugs = [
    'web-security',
    'linux',
    'windows',
    'active-directory',
    'networking',
    'digital-forensics',
    'reverse-engineering',
    'malware-analysis'
  ];
  const highlightedCategories = categories.filter((c) => highlightSlugs.includes(c.slug));

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold font-mono">8WHIE</span>
            <span className="text-slate-600">·</span>
            <span>Worldwide Hackers Intelligence & Ethics</span>
            <span className="text-slate-600">·</span>
            <span>Created by Aryan Thakur</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Learn. Practice. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Secure.</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-300">
              8WHIE Cyber Security Labs
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A premier cybersecurity intelligence platform engineered for legal CTF analysis and technical lab mastery across TryHackMe, Hack The Box, and PortSwigger Web Security Academy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/writeups')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/10"
            >
              <span>Explore Write-ups</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/roadmaps')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Learning Roadmaps</span>
            </button>
          </div>
        </div>

        {/* Statistics Strip */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-900/40 border border-slate-800/80">
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
              {totalWriteups}
            </div>
            <div className="text-xs text-slate-400 mt-1">CTF Write-ups</div>
          </div>
          
          <div className="text-center p-2 border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-emerald-400">
              {learningPathsCount}
            </div>
            <div className="text-xs text-slate-400 mt-1">Learning Paths</div>
          </div>

          <div className="text-center p-2 border-l-0 sm:border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-teal-400">
              {securityTopicsCount}
            </div>
            <div className="text-xs text-slate-400 mt-1">Security Topics</div>
          </div>

          <div className="text-center p-2 border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-cyan-400">
              {ctfPlatformsCount}+
            </div>
            <div className="text-xs text-slate-400 mt-1">CTF Platforms</div>
          </div>
        </div>
      </section>

      {/* Ethical Banner */}
      <section className="max-w-5xl mx-auto">
        <EthicalBanner />
      </section>

      {/* Security Disciplines Grid */}
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Security Disciplines & Research
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a specialized domain to view dedicated walkthroughs, toolkits, and concepts.
            </p>
          </div>

          <button
            onClick={() => navigate('/writeups')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlightedCategories.map((cat) => {
            const count = writeups.filter((w) => w.category === cat.slug).length;
            return (
              <CategoryCard key={cat.slug} category={cat} count={count} />
            );
          })}
        </div>
      </section>

      {/* Featured / Recent Write-ups */}
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Featured Lab Walkthroughs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              In-depth analysis of high-yield machine exploitation, defense evasion, and root privilege escalation.
            </p>
          </div>

          <button
            onClick={() => navigate('/writeups')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Browse Full Library ({writeups.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayFeatured.map((writeup) => (
            <WriteupCard key={writeup.id} writeup={writeup} />
          ))}
        </div>
      </section>

      {/* Learning Paths Callout */}
      <section className="max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <Compass className="w-4 h-4" />
              <span>Structured Skill Development</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Start with Guided Learning Roadmaps
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Curated progression tracks designed by Aryan Thakur to take you from security foundations to professional Penetration Tester, AppSec Specialist, or DFIR Investigator.
            </p>
          </div>

          <button
            onClick={() => navigate('/roadmaps')}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
          >
            View 4 Learning Paths
          </button>
        </div>
      </section>

    </div>
  );
};
