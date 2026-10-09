/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Type Definitions
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

export type PlatformType =
  | 'TryHackMe'
  | 'Hack The Box'
  | 'PortSwigger Academy'
  | '8WHIE Custom Labs'
  | 'OverTheWire'
  | 'Blue Team Labs';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Insane';

export type CategorySlug =
  | 'web-security'
  | 'linux'
  | 'windows'
  | 'active-directory'
  | 'networking'
  | 'osint'
  | 'digital-forensics'
  | 'cryptography'
  | 'reverse-engineering'
  | 'malware-analysis'
  | 'tools-techniques'
  | 'learning-roadmaps';

export interface CodeSnippet {
  id: string;
  language: string;
  title?: string;
  code: string;
  explanation?: string;
}

export interface SectionContent {
  id: string;
  title: string;
  content: string; // Markdown / prose text
  snippets?: CodeSnippet[];
  warningNote?: string;
  tipNote?: string;
}

export interface MitreAttackMapping {
  tactic: string;
  techniqueId: string;
  techniqueName: string;
}

export interface Writeup {
  id: string;
  slug: string;
  title: string;
  machineName: string;
  platform: PlatformType;
  category: CategorySlug;
  difficulty: DifficultyLevel;
  date: string; // YYYY-MM-DD
  readTime: string; // e.g. "18 min read"
  author: string;
  authorRole: string;
  summary: string;
  targetIp?: string;
  os?: 'Linux' | 'Windows' | 'BSD' | 'Web/Agnostic';
  tags: string[];
  cveReferences?: string[];
  mitreAttack?: MitreAttackMapping[];
  prerequisites?: string[];
  keyTakeaways: string[];
  sections: SectionContent[];
  remediationAdvice: string;
  isFeatured?: boolean;
}

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  description: string;
  iconName: string;
  colorClass: string;
  badgeAccent: string;
  focusAreas: string[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  recommendedLabs: string[];
  keyResources: string[];
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  targetRole: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDuration: string;
  summary: string;
  milestones: RoadmapMilestone[];
}

export interface ToolReference {
  id: string;
  name: string;
  category: 'Reconnaissance' | 'Web Exploitation' | 'Privilege Escalation' | 'Active Directory' | 'Forensics' | 'Binary & Crypto';
  description: string;
  syntaxSummary: string;
  commonCommands: {
    command: string;
    purpose: string;
    explanation: string;
  }[];
  authoritativeUrl?: string;
  defensiveCountermeasure: string;
}
