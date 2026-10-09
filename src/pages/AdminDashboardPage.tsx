/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Admin Studio & Lab Manager
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React, { useState } from 'react';
import { useLabs } from '../context/LabsContext.tsx';
import { Writeup, PlatformType, DifficultyLevel, CategorySlug, SectionContent } from '../types.ts';
import {
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Check,
  X,
  FileCode,
  Shield,
  Layers,
  Terminal,
  AlertCircle
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    writeups,
    categories,
    addWriteup,
    updateWriteup,
    deleteWriteup,
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson,
    navigate,
  } = useLabs();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [importJsonInput, setImportJsonInput] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  // Form State
  const initialFormState: Partial<Writeup> = {
    title: '',
    machineName: '',
    platform: 'TryHackMe',
    category: 'web-security',
    difficulty: 'Medium',
    date: new Date().toISOString().split('T')[0],
    readTime: '15 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: '',
    targetIp: '10.10.x.x',
    os: 'Linux',
    tags: ['Web Security', 'Privilege Escalation'],
    cveReferences: [],
    keyTakeaways: ['Always verify input validation before executing shell commands.'],
    remediationAdvice: 'Implement principle of least privilege and enforce secure configuration baselines.',
    isFeatured: false,
    sections: [
      {
        id: 'sec-recon',
        title: 'Phase 1: Reconnaissance & Port Scanning',
        content: 'Identify active TCP/UDP ports and enumerate accessible service banners.',
        snippets: [
          {
            id: 'snip-1',
            language: 'bash',
            title: 'Initial Port Scan',
            code: 'nmap -sC -sV -oN nmap_initial.txt 10.10.x.x',
            explanation: 'Perform standard service detection script scan.'
          }
        ]
      }
    ]
  };

  const [formData, setFormData] = useState<Partial<Writeup>>(initialFormState);
  const [tagInput, setTagInput] = useState<string>('Web Security, PrivEsc');
  const [cveInput, setCveInput] = useState<string>('');
  const [takeawaysInput, setTakeawaysInput] = useState<string>('Always enforce least-privilege principles.');

  // Code snippet editing in form
  const [codeLanguage, setCodeLanguage] = useState<string>('bash');
  const [codeTitle, setCodeTitle] = useState<string>('Initial Port Scan');
  const [codeContent, setCodeContent] = useState<string>('nmap -sC -sV -oN nmap_initial.txt 10.10.x.x');
  const [codeExplanation, setCodeExplanation] = useState<string>('Scan target host for active listening ports.');

  const startCreate = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setTagInput('Web Security, PrivEsc');
    setCveInput('');
    setTakeawaysInput('Verify directory permissions and audit service paths.');
    setCodeLanguage('bash');
    setCodeTitle('Reconnaissance Command');
    setCodeContent('nmap -sC -sV 10.10.x.x');
    setCodeExplanation('Probe target for open ports.');
    setIsEditing(true);
  };

  const startEdit = (w: Writeup) => {
    setFormData(w);
    setEditingId(w.id);
    setTagInput(w.tags.join(', '));
    setCveInput((w.cveReferences || []).join(', '));
    setTakeawaysInput(w.keyTakeaways.join('\n'));
    if (w.sections[0]?.snippets?.[0]) {
      const s = w.sections[0].snippets[0];
      setCodeLanguage(s.language);
      setCodeTitle(s.title || 'Exploit Snippet');
      setCodeContent(s.code);
      setCodeExplanation(s.explanation || '');
    }
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.machineName || !formData.summary) {
      alert('Please fill in the title, machine name, and summary fields.');
      return;
    }

    const tagsArray = tagInput.split(',').map((t) => t.trim()).filter(Boolean);
    const cveArray = cveInput.split(',').map((c) => c.trim()).filter(Boolean);
    const takeawaysArray = takeawaysInput.split('\n').map((k) => k.trim()).filter(Boolean);

    const slug = (formData.machineName || 'lab')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const finalWriteup: Writeup = {
      id: editingId || `writeup-${Date.now()}`,
      slug: formData.slug || `${slug}-${Date.now().toString().slice(-4)}`,
      title: formData.title || 'Untitled Write-up',
      machineName: formData.machineName || 'Lab Machine',
      platform: (formData.platform as PlatformType) || 'TryHackMe',
      category: (formData.category as CategorySlug) || 'web-security',
      difficulty: (formData.difficulty as DifficultyLevel) || 'Medium',
      date: formData.date || new Date().toISOString().split('T')[0],
      readTime: formData.readTime || '15 min read',
      author: formData.author || 'Aryan Thakur',
      authorRole: formData.authorRole || 'Founder & Lead Security Researcher, 8WHIE',
      summary: formData.summary || '',
      targetIp: formData.targetIp || '10.10.x.x',
      os: formData.os || 'Linux',
      tags: tagsArray.length > 0 ? tagsArray : ['Security Lab'],
      cveReferences: cveArray,
      keyTakeaways: takeawaysArray.length > 0 ? takeawaysArray : ['Audit configurations and enforce least privilege.'],
      remediationAdvice: formData.remediationAdvice || 'Apply security patches and enforce strict ACLs.',
      isFeatured: !!formData.isFeatured,
      sections: [
        {
          id: 'sec-overview',
          title: 'Phase 1: Initial Enumeration & Attack Surface',
          content: formData.summary || 'Initial analysis of target infrastructure.',
          snippets: [
            {
              id: 'snip-main',
              language: codeLanguage,
              title: codeTitle,
              code: codeContent,
              explanation: codeExplanation,
            }
          ]
        }
      ]
    };

    if (editingId) {
      updateWriteup(finalWriteup);
      showTemporaryStatus('Write-up updated successfully.');
    } else {
      addWriteup(finalWriteup);
      showTemporaryStatus('New write-up published to lab library.');
    }

    setIsEditing(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteWriteup(id);
      showTemporaryStatus(`Deleted "${name}".`);
    }
  };

  const showTemporaryStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportDataAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `8whie_labs_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showTemporaryStatus('Lab database exported as JSON.');
  };

  const handleImportSubmit = () => {
    if (!importJsonInput.trim()) return;
    const success = importDataFromJson(importJsonInput);
    if (success) {
      showTemporaryStatus('Lab database imported successfully!');
      setShowImportModal(false);
      setImportJsonInput('');
    } else {
      alert('Invalid JSON format. Please verify the exported 8WHIE schema.');
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1">
            <Shield className="w-4 h-4" />
            <span>8WHIE Author Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Lab Write-up Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Publish original machine walkthroughs, edit analysis sections, and manage local backups.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={startCreate}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Write-up</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Export all writeups to JSON"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Import from JSON"
          >
            <Upload className="w-4 h-4 text-slate-400" />
            <span>Import</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all write-ups to the original default 8WHIE research labs?')) {
                resetToDefaults();
                showTemporaryStatus('Reset write-ups to default seed data.');
              }
            }}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 border border-slate-800 transition-colors"
            title="Reset to factory defaults"
            aria-label="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Modal: Import JSON */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Import Lab Data from JSON</h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste the exported 8WHIE JSON string below to restore or sync walkthrough data.
            </p>

            <textarea
              rows={8}
              value={importJsonInput}
              onChange={(e) => setImportJsonInput(e.target.value)}
              placeholder="Paste JSON content here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg"
              >
                Confirm Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Form Drawer/Panel */}
      {isEditing && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-700 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Machine Walkthrough' : 'Author New Machine Walkthrough'}
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6 text-xs">
            
            {/* Row 1: Title & Machine Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Walkthrough Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Kenobi: Samba Reconnaissance & ProFTPd Exploitation"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Machine / Target Name *</label>
                <input
                  type="text"
                  required
                  value={formData.machineName || ''}
                  onChange={(e) => setFormData({ ...formData, machineName: e.target.value })}
                  placeholder="e.g. Kenobi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2: Platform, Category, Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Platform *</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as PlatformType })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="TryHackMe">TryHackMe</option>
                  <option value="Hack The Box">Hack The Box</option>
                  <option value="PortSwigger Academy">PortSwigger Academy</option>
                  <option value="8WHIE Custom Labs">8WHIE Custom Labs</option>
                  <option value="Blue Team Labs">Blue Team Labs</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Security Discipline / Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CategorySlug })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Difficulty Level *</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DifficultyLevel })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Insane">Insane</option>
                </select>
              </div>
            </div>

            {/* Row 3: Target IP, OS, Estimated Read Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Target IP / Environment</label>
                <input
                  type="text"
                  value={formData.targetIp || ''}
                  onChange={(e) => setFormData({ ...formData, targetIp: e.target.value })}
                  placeholder="10.10.x.x"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Operating System</label>
                <select
                  value={formData.os}
                  onChange={(e) => setFormData({ ...formData, os: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Linux">Linux</option>
                  <option value="Windows">Windows</option>
                  <option value="BSD">BSD</option>
                  <option value="Web/Agnostic">Web/Agnostic</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime || ''}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="15 min read"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Executive Summary & Scenario *</label>
              <textarea
                rows={3}
                required
                value={formData.summary || ''}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief summary of the attack chain, vulnerabilities, and final privilege escalation."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Tags & CVEs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Linux, SUID, Samba, CVE-2026-0001"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">CVE References (Comma-separated)</label>
                <input
                  type="text"
                  value={cveInput}
                  onChange={(e) => setCveInput(e.target.value)}
                  placeholder="CVE-2015-3306, CVE-2023-27163"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Primary Code Block Snippet */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="font-semibold text-slate-200 block">
                Primary Exploitation / Command Snippet
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={codeTitle}
                  onChange={(e) => setCodeTitle(e.target.value)}
                  placeholder="Code Block Title (e.g. Exploit Execution)"
                  className="bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-200"
                />
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-200"
                >
                  <option value="bash">bash</option>
                  <option value="python">python</option>
                  <option value="powershell">powershell</option>
                  <option value="c">c</option>
                  <option value="php">php</option>
                  <option value="http">http</option>
                  <option value="yara">yara</option>
                </select>
              </div>

              <textarea
                rows={4}
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                placeholder="Enter command or script here..."
                className="w-full bg-slate-900 border border-slate-800 rounded p-3 font-mono text-xs text-slate-200"
              />

              <input
                type="text"
                value={codeExplanation}
                onChange={(e) => setCodeExplanation(e.target.value)}
                placeholder="Short explanation of what this command accomplishes..."
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-300"
              />
            </div>

            {/* Key Takeaways & Remediation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Key Takeaways (One per line)</label>
                <textarea
                  rows={3}
                  value={takeawaysInput}
                  onChange={(e) => setTakeawaysInput(e.target.value)}
                  placeholder="Takeaways..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Remediation & Defense Advice</label>
                <textarea
                  rows={3}
                  value={formData.remediationAdvice || ''}
                  onChange={(e) => setFormData({ ...formData, remediationAdvice: e.target.value })}
                  placeholder="How to prevent or patch this in production..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Featured Checkbox & Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={!!formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Feature on Homepage</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                >
                  {editingId ? 'Save Changes' : 'Publish Write-up'}
                </button>
              </div>
            </div>

          </form>
        </div>
      )}

      {/* Write-ups Directory Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">
            Published Write-ups ({writeups.length})
          </h2>
          <span className="text-xs text-slate-400">
            Changes persist in browser localStorage
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Title & Machine</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Discipline</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {writeups.map((w) => (
                <tr key={w.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigate(`/writeup/${w.slug}`)}
                      className="text-left font-semibold text-white hover:text-emerald-400 transition-colors block"
                    >
                      {w.title}
                    </button>
                    <span className="text-[11px] text-slate-500 block">
                      Target: {w.machineName}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{w.platform}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{w.category}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-300">{w.difficulty}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">{w.date}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(w)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Edit writeup"
                        aria-label="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(w.id, w.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                        title="Delete writeup"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
