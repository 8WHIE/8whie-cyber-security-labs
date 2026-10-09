/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Learning Roadmaps
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import { Roadmap } from '../types.ts';

export const ROADMAPS: Roadmap[] = [
  {
    id: 'roadmap-junior-pentester',
    slug: 'junior-penetration-tester',
    title: 'Junior Penetration Tester Pathway',
    targetRole: 'Junior Penetration Tester / Red Team Associate',
    level: 'Beginner',
    totalDuration: '16–20 Weeks',
    summary: 'A disciplined, hands-on path built for aspiring ethical hackers. Master networking, Linux internals, initial access vectors, privilege escalation, and foundational Active Directory mechanics through guided lab practice.',
    milestones: [
      {
        id: 'milestone-1',
        title: 'Stage 1: Core Networking & Operating System Fundamentals',
        duration: '4 Weeks',
        description: 'Understand TCP/IP handshakes, subnetting, routing tables, fundamental Linux CLI operations, and Windows operating system architectures.',
        topics: [
          'TCP/UDP 3-Way Handshake & Flags',
          'Linux File Permissions, SUID/SGID, and Process Hierarchy',
          'Windows NT Architecture, Registry, and Services',
          'Network packet capture basics with tcpdump & Wireshark'
        ],
        recommendedLabs: ['TryHackMe: Linux Fundamentals 1-3', 'TryHackMe: Network Fundamentals', 'OverTheWire: Bandit Labs 1-20'],
        keyResources: ['8WHIE Networking Guide', 'Linux Journey', 'RFC 793 (TCP Protocol Specs)']
      },
      {
        id: 'milestone-2',
        title: 'Stage 2: Reconnaissance & Web Application Vulnerabilities',
        duration: '5 Weeks',
        description: 'Learn structured port scanning, service version banner analysis, directory discovery, and primary web vulnerability types.',
        topics: [
          'Nmap advanced scan flags and NSE scripting',
          'Directory discovery with Gobuster & Feroxbuster',
          'OWASP Top 10: SQLi, XSS, SSRF, IDOR, File Upload',
          'Burp Suite Community edition interception and Repeater'
        ],
        recommendedLabs: ['TryHackMe: RootMe', 'PortSwigger Web Security Academy: SQL Injection', 'Hack The Box: Sau'],
        keyResources: ['8WHIE Web Security Hub', 'OWASP Testing Guide v4.2', 'PortSwigger Learning Materials']
      },
      {
        id: 'milestone-3',
        title: 'Stage 3: Linux & Windows Privilege Escalation',
        duration: '4 Weeks',
        description: 'Transition from low-privilege system shell to root/SYSTEM through automated auditing scripts and manual configuration checks.',
        topics: [
          'LinPEAS interpretation and manual GTFOBins techniques',
          'Cron jobs, writable paths, capabilities (cap_setuid)',
          'Windows Unquoted Service Paths & AlwaysInstallElevated',
          'Token abuse (SeImpersonatePrivilege with GodPotato)'
        ],
        recommendedLabs: ['TryHackMe: Steel Mountain', 'TryHackMe: Kenobi', 'Hack The Box: Bashed'],
        keyResources: ['GTFOBins', 'LOLBAS Project', '8WHIE Privilege Escalation Cheatsheets']
      },
      {
        id: 'milestone-4',
        title: 'Stage 4: Active Directory Fundamentals & Certification Prep',
        duration: '5 Weeks',
        description: 'Learn domain architecture, Kerberos authentication protocol, BloodHound attack path identification, and credential dumping.',
        topics: [
          'Domain Controllers, Forests, Trees, and OUs',
          'Kerberoasting & AS-REP Roasting with Impacket',
          'BloodHound / SharpHound graph reconnaissance',
          'Pass-the-Hash & DCSync replication attacks'
        ],
        recommendedLabs: ['Hack The Box: Forest', 'TryHackMe: Attacktive Directory', 'TryHackMe: Holo Live Lab'],
        keyResources: ['8WHIE Active Directory Deep Dive', 'HarmJ0y Active Directory Articles', 'BloodHound Documentation']
      }
    ]
  },
  {
    id: 'roadmap-web-security',
    slug: 'web-application-security-specialist',
    title: 'Web Application Security Specialist',
    targetRole: 'Web Penetration Tester / AppSec Engineer',
    level: 'Intermediate',
    totalDuration: '14–18 Weeks',
    summary: 'Master full-spectrum web security testing from client-side DOM vulnerabilities to server-side business logic flaws, deserialization, GraphQL vulnerabilities, and cloud API security.',
    milestones: [
      {
        id: 'milestone-web-1',
        title: 'Stage 1: In-Depth HTTP, Authentication & Session Architecture',
        duration: '3 Weeks',
        description: 'Understand state management, session cookies, CORS headers, OAuth 2.0 / OIDC flows, and JWT implementation flaws.',
        topics: [
          'Cookie security attributes (HttpOnly, Secure, SameSite)',
          'CORS misconfigurations and cross-origin exploitation',
          'JWT signature verification bypasses and algorithm switching',
          'Multi-Factor Authentication (MFA) logic race conditions'
        ],
        recommendedLabs: ['PortSwigger: JWT Lab Series', 'PortSwigger: CORS Vulnerabilities', '8WHIE Web Lab 01'],
        keyResources: ['RFC 6749 (OAuth 2.0)', 'Auth0 JWT Handbook', 'PortSwigger Web Academy']
      },
      {
        id: 'milestone-web-2',
        title: 'Stage 2: Server-Side Injections & Vulnerability Chains',
        duration: '6 Weeks',
        description: 'Deep dive into complex server-side vulnerabilities including blind SQL injection, second-order SQLi, SSRF, SSTI, and Deserialization.',
        topics: [
          'Blind boolean and error-based SQL injection with out-of-band exfiltration',
          'Server-Side Template Injection (Jinja2, Thymeleaf, Freemarker)',
          'Insecure Deserialization in Java, Python (Pickle), and PHP',
          'SSRF cloud metadata extraction (AWS IMDSv1/v2, GCP metadata)'
        ],
        recommendedLabs: ['PortSwigger: Blind SQLi Labs', 'PortSwigger: Server-Side Template Injection', 'Hack The Box: Sau'],
        keyResources: ['8WHIE Blind SQLi Walkthrough', 'PayloadsAllTheThings Repository']
      },
      {
        id: 'milestone-web-3',
        title: 'Stage 3: Modern API Security & Microservices',
        duration: '5 Weeks',
        description: 'Audit modern REST and GraphQL APIs, WebSockets, rate limiting bypasses, and Mass Assignment vulnerabilities.',
        topics: [
          'GraphQL introspection and query batching attacks',
          'Broken Object Level Authorization (BOLA / IDOR)',
          'Mass assignment and parameter pollution',
          'WebSocket state tampering and CSWSH'
        ],
        recommendedLabs: ['PortSwigger: GraphQL API Security', 'TryHackMe: Postman Lab', 'Hack The Box: Craft'],
        keyResources: ['OWASP API Security Top 10', '8WHIE API Testing Blueprint']
      }
    ]
  },
  {
    id: 'roadmap-blue-team',
    slug: 'soc-analyst-blue-team',
    title: 'SOC Analyst & Defensive Security Path',
    targetRole: 'SOC Analyst Tier 1/2 / Defensive Security Specialist',
    level: 'Intermediate',
    totalDuration: '16 Weeks',
    summary: 'Focus on defensive cybersecurity operations, threat detection, SIEM log analysis, network intrusion detection, memory dump triage, and authoring YARA/Sigma rules.',
    milestones: [
      {
        id: 'milestone-blue-1',
        title: 'Stage 1: SIEM & Windows Event Log Auditing',
        duration: '4 Weeks',
        description: 'Understand Windows Event Log IDs (4624, 4625, 4688, 7045), Sysmon configuration, and search queries in Splunk / Elastic.',
        topics: [
          'Sysmon event monitoring (Process Creation, Network Connections)',
          'Detecting credential access attempts and anomalous logons',
          'Writing Sigma rules for threat detection',
          'Splunk SPL query syntax and dashboard creation'
        ],
        recommendedLabs: ['TryHackMe: Splunk Basics', 'TryHackMe: Sysmon Deep Dive', 'Blue Team Labs Online: Investigation 1'],
        keyResources: ['Ultimate Windows Security Event Log Guide', 'Sigma Detection Format']
      },
      {
        id: 'milestone-blue-2',
        title: 'Stage 2: Network Traffic Telemetry & PCAP Triage',
        duration: '4 Weeks',
        description: 'Dissect packet captures, isolate C2 beaconing rhythms, inspect TLS handshakes, and write Snort / Suricata intrusion rules.',
        topics: [
          'Wireshark display filters and stream following',
          'Detecting DNS tunneling and ICMP exfiltration',
          'Suricata signature drafting for protocol anomalies',
          'Zeek log interpretation (conn.log, dns.log, http.log)'
        ],
        recommendedLabs: ['TryHackMe: Wireshark 101', 'TryHackMe: Zeek In Practice', 'CyberDefenders: PacketMaze'],
        keyResources: ['8WHIE Networking Guide', 'Zeek Documentation', 'Practical Packet Analysis']
      },
      {
        id: 'milestone-blue-3',
        title: 'Stage 3: Memory Forensics & YARA Threat Hunting',
        duration: '8 Weeks',
        description: 'Analyze volatile memory images with Volatility 3, detect process hollowing, and author resilient YARA rules for detection.',
        topics: [
          'Volatility 3 plugins (pslist, malfind, handles, vadinfo)',
          'Process injection techniques (Hollowing, DLL Injection, reflective loading)',
          'YARA rule condition logic and byte-level hunting',
          'MITRE ATT&CK defensive mapping & incident reporting'
        ],
        recommendedLabs: ['Blue Team Labs: Forensics Lab 01', 'TryHackMe: Volatility', 'CyberDefenders: Memory Triage'],
        keyResources: ['8WHIE DFIR Case 01', 'Volatility Foundation Docs', 'YARA Official Manual']
      }
    ]
  }
];
