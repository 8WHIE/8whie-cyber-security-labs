/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Categories
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import { CategoryInfo } from '../types.ts';

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'web-security',
    name: 'Web Security',
    description: 'Vulnerability assessment of modern web applications, OWASP Top 10 vectors, SQL injection, SSRF, IDOR, and authentication flaws.',
    iconName: 'Globe',
    colorClass: 'text-emerald-400',
    badgeAccent: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    focusAreas: ['SQL Injection', 'Cross-Site Scripting', 'Server-Side Request Forgery', 'IDOR & Broken Access', 'JWT Insecurity'],
  },
  {
    slug: 'linux',
    name: 'Linux Fundamentals & PrivEsc',
    description: 'System enumeration, Linux internals, abuse of SUID binaries, misconfigured capabilities, cron wildcards, and kernel vectors.',
    iconName: 'Terminal',
    colorClass: 'text-cyan-400',
    badgeAccent: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
    focusAreas: ['SUID / SGID Enumeration', 'Linux Capabilities (cap_setuid)', 'Sudoers Misconfigurations', 'Cron & NFS Shared Exports', 'Kernel Exploitation Basics'],
  },
  {
    slug: 'windows',
    name: 'Windows Internals & PrivEsc',
    description: 'Windows operating system mechanics, service permissions, unquoted service paths, token manipulation, and UAC bypasses.',
    iconName: 'LayoutGrid',
    colorClass: 'text-blue-400',
    badgeAccent: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
    focusAreas: ['Unquoted Service Paths', 'SeImpersonatePrivilege Abuse', 'AlwaysInstallElevated Registry', 'DLL Hijacking', 'PowerShell Script Auditing'],
  },
  {
    slug: 'active-directory',
    name: 'Active Directory Security',
    description: 'Enterprise domain architecture, Kerberos authentication mechanics, BloodHound graph analysis, Kerberoasting, and DCSync attacks.',
    iconName: 'Network',
    colorClass: 'text-violet-400',
    badgeAccent: 'border-violet-500/20 bg-violet-500/10 text-violet-300',
    focusAreas: ['Kerberoasting & AS-REP Roasting', 'BloodHound Graph Navigation', 'Pass-the-Hash / Overpass-the-Hash', 'DCSync Domain Replication', 'Group Policy Object Abuse'],
  },
  {
    slug: 'networking',
    name: 'Networking & Pivoting',
    description: 'Deep packet inspection with Wireshark, traffic telemetry, SSH dynamic port forwarding, Chisel tunneling, and firewall bypasses.',
    iconName: 'Radio',
    colorClass: 'text-teal-400',
    badgeAccent: 'border-teal-500/20 bg-teal-500/10 text-teal-300',
    focusAreas: ['Wireshark PCAP Triage', 'SSH Dynamic SOCKS5 Pivoting', 'Chisel Client/Server Tunneling', 'DNS Tunneling Inspection', 'Nmap Scripting Engine (NSE)'],
  },
  {
    slug: 'osint',
    name: 'OSINT & Reconnaissance',
    description: 'Open-source intelligence gathering, Certificate Transparency logs, WHOIS forensics, metadata analysis, and infrastructure footprinting.',
    iconName: 'Eye',
    colorClass: 'text-amber-400',
    badgeAccent: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
    focusAreas: ['Certificate Transparency Logs', 'Passive DNS Profiling', 'ExifTool Metadata Extraction', 'Subdomain Enumeration', 'GitHub Leak Auditing'],
  },
  {
    slug: 'digital-forensics',
    name: 'Digital Forensics & Incident Response',
    description: 'Live memory analysis, volatile artifact recovery, Volatility 3, Autopsy disk triage, timeline reconstruction, and persistence detection.',
    iconName: 'FileSearch',
    colorClass: 'text-rose-400',
    badgeAccent: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
    focusAreas: ['Volatility 3 Memory Analysis', 'Autopsy TSK File Carving', 'Windows Event Log Forensic Auditing', 'Master File Table ($MFT) Parsing', 'Registry Forensics'],
  },
  {
    slug: 'cryptography',
    name: 'Applied Cryptography',
    description: 'Mathematical analysis of classical and modern cryptographic schemes, RSA factorization weaknesses, padding oracle attacks, and hashes.',
    iconName: 'KeyRound',
    colorClass: 'text-yellow-400',
    badgeAccent: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-300',
    focusAreas: ['Weak RSA Factorization (Fermat/Wiener)', 'AES-CBC Padding Oracle Mechanics', 'Hash Collision Concepts', 'Diffie-Hellman Key Exchange', 'Custom XOR Cipher Cracking'],
  },
  {
    slug: 'reverse-engineering',
    name: 'Reverse Engineering',
    description: 'Static and dynamic analysis of compiled x86/x64 binaries, Ghidra disassembly, GDB debugging, stack frames, and control flow graphs.',
    iconName: 'Binary',
    colorClass: 'text-indigo-400',
    badgeAccent: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300',
    focusAreas: ['Ghidra Decompiler Workflow', 'GDB & GEF Dynamic Debugging', 'ELF & PE Header Dissection', 'Buffer Overflow Stack Frames', 'Control Flow Graph Reconstruction'],
  },
  {
    slug: 'malware-analysis',
    name: 'Malware Analysis (Defensive)',
    description: 'Defensive inspection of malicious software, PE file imports, static indicators of compromise (IOCs), sandbox execution, and Yara rules.',
    iconName: 'ShieldAlert',
    colorClass: 'text-red-400',
    badgeAccent: 'border-red-500/20 bg-red-500/10 text-red-300',
    focusAreas: ['PE Section Header Verification', 'Import Address Table (IAT) Analysis', 'YARA Detection Rule Construction', 'C2 Domain / IP Indicator Extraction', 'Obfuscated PowerShell De-obfuscation'],
  },
  {
    slug: 'tools-techniques',
    name: 'Tools & Techniques Hub',
    description: 'Essential command line cheatsheets, real-world syntax, offensive and defensive operational guides for industry-standard security tools.',
    iconName: 'Wrench',
    colorClass: 'text-orange-400',
    badgeAccent: 'border-orange-500/20 bg-orange-500/10 text-orange-300',
    focusAreas: ['Nmap Port Reconnaissance', 'Burp Suite Repeater / Intruder', 'Impacket Toolset', 'LinPEAS & WinPEAS', 'Hashcat & John the Ripper'],
  },
  {
    slug: 'learning-roadmaps',
    name: 'Learning Roadmaps',
    description: 'Structured step-by-step career and skill pathways designed by Aryan Thakur to take you from foundational basics to advanced operator.',
    iconName: 'Compass',
    colorClass: 'text-sky-400',
    badgeAccent: 'border-sky-500/20 bg-sky-500/10 text-sky-300',
    focusAreas: ['Junior Penetration Tester Path', 'Web Application Security Specialist', 'SOC Analyst & Defensive Responder', 'Digital Forensics Investigator'],
  },
];
