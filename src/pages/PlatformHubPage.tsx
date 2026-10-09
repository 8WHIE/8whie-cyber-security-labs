/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Platform Hub Page
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { WriteupCard } from '../components/WriteupCard.tsx';
import { PlatformType } from '../types.ts';
import { ArrowLeft, ExternalLink, Shield, Server, Terminal, Lock } from 'lucide-react';

interface PlatformHubPageProps {
  platformName: string;
}

export const PlatformHubPage: React.FC<PlatformHubPageProps> = ({ platformName }) => {
  const { writeups, navigate } = useLabs();

  // Decode URL name if needed
  const decoded = decodeURIComponent(platformName);
  const platformWriteups = writeups.filter((w) => w.platform.toLowerCase() === decoded.toLowerCase());

  const platformDescriptions: Record<string, { desc: string; focus: string }> = {
    tryhackme: {
      desc: 'TryHackMe offers gamified hands-on cybersecurity training through guided rooms and realistic CTF challenges, covering foundational security through advanced enterprise exploitation.',
      focus: 'Guided Rooms, Linux PrivEsc, Web Fundamentals & Active Directory',
    },
    'hack the box': {
      desc: 'Hack The Box is a premier continuous cybersecurity training platform with standalone vulnerable machines and enterprise Pro Labs designed to push technical problem-solving to the limits.',
      focus: 'Realistic Penetration Testing, Binary Exploitation & Hardened Active Directory',
    },
    'portswigger academy': {
      desc: 'PortSwigger Web Security Academy provides authoritative vulnerability research and interactive web security labs developed by the creators of Burp Suite.',
      focus: 'OWASP Top 10, Blind SQLi, SSRF, Deserialization & Authentication Flaws',
    },
    '8whie custom labs': {
      desc: 'Custom educational challenge machines, defensive malware triage sandboxes, and reverse engineering binaries authored directly by Aryan Thakur for 8WHIE research.',
      focus: 'Original Reverse Engineering, Yara Threat Hunting & Custom Protocols',
    },
    'blue team labs': {
      desc: 'Defensive cybersecurity and incident response challenges centered on memory dump triage, log auditing, and network packet analysis.',
      focus: 'Memory Forensics, Volatility 3, PCAP Inspection & SIEM Triage',
    },
  };

  const info =
    platformDescriptions[decoded.toLowerCase()] || {
      desc: 'Authorized cybersecurity practice labs and CTF challenges.',
      focus: 'Security Research & Hands-on Lab Practice',
    };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      
      {/* Navigation back */}
      <button
        onClick={() => navigate('/writeups')}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Write-ups</span>
      </button>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Server className="w-4 h-4" />
          <span>CTF Platform Dedicated Hub</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {decoded} Walkthroughs
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          {info.desc}
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
          <div>
            <span className="text-slate-500">Core Focus: </span>
            <span className="text-slate-200 font-medium">{info.focus}</span>
          </div>
          <span className="text-slate-700">·</span>
          <div>
            <span className="text-slate-500">Available Labs: </span>
            <span className="font-mono tabular-nums text-emerald-400 font-medium">
              {platformWriteups.length}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Write-ups */}
      {platformWriteups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {platformWriteups.map((w) => (
            <WriteupCard key={w.id} writeup={w} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
          <Terminal className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No write-ups currently published for this platform</h3>
          <p className="text-xs text-slate-400">
            Check back soon as Aryan Thakur publishes new walkthroughs, or use the Lab Studio to add custom write-ups.
          </p>
        </div>
      )}

    </div>
  );
};
