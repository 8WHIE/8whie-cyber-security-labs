/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - About 8WHIE & Aryan Thakur
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { EthicalBanner } from '../components/EthicalBanner.tsx';
import {
  Shield,
  Award,
  Terminal,
  Lock,
  Globe,
  Compass,
  CheckCircle2,
  Mail,
  User,
  ExternalLink
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useLabs();

  return (
    <div className="space-y-12 pb-20 max-w-4xl mx-auto">
      
      {/* Hero Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Worldwide Hackers Intelligence & Ethics</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About 8WHIE Labs
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          An original cybersecurity laboratory and research platform founded in 2026 by <strong>Aryan Thakur</strong>, dedicated to rigorous technical excellence, disciplined CTF education, and uncompromising ethical conduct.
        </p>
      </div>

      {/* Founder & Mission Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono text-2xl shrink-0">
            8W
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Aryan Thakur</h2>
            <p className="text-xs text-emerald-400 font-mono">
              Founder & Lead Cybersecurity Researcher · 8WHIE Labs
            </p>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Specializing in penetration testing, Active Directory security architectures, binary reverse engineering, and threat detection research.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            The mission behind <strong>8WHIE</strong> stems from a foundational belief: to defend modern digital infrastructure, defenders must deeply comprehend how attackers reason, scan, pivot, and execute. However, capability without ethics is destruction. 8WHIE balances deep technical prowess with strict legal and ethical discipline.
          </p>
          <p>
            Every write-up, script, and roadmap presented on this platform is entirely original, created for authorized practice environments like TryHackMe, Hack The Box, and PortSwigger Web Security Academy.
          </p>
        </div>
      </div>

      {/* Ethical Code of Conduct */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>The 8WHIE Ethical Hacker Creed</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Prior Explicit Authorization</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Never launch probes, scans, or exploitation scripts against any host, IP, or network without verified, written consent from the owner.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Constructive Remediation</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Exploitation in educational labs serves one ultimate goal: understanding vulnerabilities so you can remediate root causes and harden systems.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Responsible Disclosure</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              When encountering real-world zero-day or configuration exposures, practice coordinated responsible disclosure with vendors without extortion.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Knowledge Sharing & Mentorship</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Share defensive insights, write clear educational documentation, and empower the next generation of security researchers.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Banner */}
      <EthicalBanner />

      {/* Copyright & Technical Transparency */}
      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs text-slate-400">
        <h4 className="font-semibold text-slate-200">Legal & Intellectual Property Notice</h4>
        <p className="leading-relaxed">
          © 2026 8WHIE — Aryan Thakur. All rights reserved. 8WHIE and Worldwide Hackers Intelligence & Ethics are original trademarks of Aryan Thakur. This software platform is open-sourced under the MIT License for the cybersecurity research community.
        </p>
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => navigate('/writeups')}
            className="text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Start Learning in Lab Vault →
          </button>
        </div>
      </div>

    </div>
  );
};
