/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Tools & Techniques Library
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React, { useState, useMemo } from 'react';
import { TOOLS_DATA } from '../data/tools.ts';
import { ToolReference } from '../types.ts';
import { CodeBlock } from '../components/CodeBlock.tsx';
import { Wrench, Search, ShieldCheck, Terminal, Filter } from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Reconnaissance',
    'Web Exploitation',
    'Privilege Escalation',
    'Active Directory',
    'Forensics',
    'Binary & Crypto',
  ];

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      if (selectedCategory !== 'All' && tool.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesCommands = tool.commonCommands.some(
          (c) => c.command.toLowerCase().includes(q) || c.purpose.toLowerCase().includes(q)
        );
        return matchesName || matchesDesc || matchesCommands;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-2">
          <Wrench className="w-4 h-4" />
          <span>Operational Cheatsheet & Defense Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Tools & Techniques Hub
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
          Essential command references, proven operational syntax, and defensive countermeasures for industry-standard cybersecurity tools used in authorized testing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools, syntax, flags, or commands (e.g. nmap, bloodhound, DCSync)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 sm:top-3 pointer-events-none" />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools List */}
      <div className="space-y-8">
        {filteredTools.map((tool) => (
          <article
            key={tool.id}
            className="p-5 sm:p-7 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-5"
          >
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-white">
                    {tool.name}
                  </h2>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {tool.category}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400 max-w-3xl leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850 self-start sm:self-auto shrink-0">
                {tool.syntaxSummary}
              </div>
            </div>

            {/* Essential Commands Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Common Operational Syntax & Examples:
              </h3>

              <div className="space-y-3">
                {tool.commonCommands.map((cmd, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{cmd.purpose}</span>
                    </div>

                    <CodeBlock
                      code={cmd.command}
                      language="bash"
                      title={cmd.purpose}
                      explanation={cmd.explanation}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Defensive Countermeasure Callout */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block mb-0.5">
                  Defensive Countermeasure & Detection Strategy:
                </span>
                <span className="text-slate-400 leading-relaxed">
                  {tool.defensiveCountermeasure}
                </span>
              </div>
            </div>
          </article>
        ))}

        {filteredTools.length === 0 && (
          <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <h3 className="text-base font-semibold text-white">No tools found matching your query</h3>
            <p className="text-xs text-slate-400">Try searching for other security tools or clear your search term.</p>
          </div>
        )}
      </div>

    </div>
  );
};
