/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Footer
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { Shield, Lock, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useLabs();

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                8WHIE <span className="text-emerald-400 text-xs font-semibold">Labs</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Worldwide Hackers Intelligence & Ethics. A premier educational cybersecurity research platform founded by Aryan Thakur, providing deep technical write-ups and structured pathways for authorized practice labs.
            </p>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>Ethical Hacking Policy</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                All write-ups, proof-of-concept scripts, and techniques published on 8WHIE are curated strictly for educational purposes in authorized sandbox environments, CTF events, and systems where explicit permission has been obtained.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Curated Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/writeups')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  All CTF Write-ups
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/platform/TryHackMe')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  TryHackMe Walkthroughs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/platform/Hack The Box')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Hack The Box Labs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/category/web-security')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Web Security & OWASP
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/category/active-directory')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Active Directory Attacks
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Disciplines & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Disciplines & Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/roadmaps')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Learning Roadmaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/tools')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tools & Techniques Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About 8WHIE & Aryan Thakur
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Author Studio & Backups
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/bookmarks')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  My Saved Bookmarks
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-medium text-slate-400">
              © 2026 8WHIE — Aryan Thakur
            </span>
            <span className="mx-2">·</span>
            <span>Worldwide Hackers Intelligence & Ethics</span>
          </div>
          
          <div className="flex items-center gap-4 text-[11px]">
            <span>MIT Open Source License</span>
            <span>·</span>
            <span>Educational Use Only</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
