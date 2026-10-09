/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Learning Roadmaps
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React, { useState, useEffect } from 'react';
import { ROADMAPS } from '../data/roadmaps.ts';
import { Roadmap, RoadmapMilestone } from '../types.ts';
import { useLabs } from '../context/LabsContext.tsx';
import {
  Compass,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';

const STORAGE_ROADMAP_PROGRESS_KEY = '8whie_roadmap_completed_topics_v1';

export const RoadmapsPage: React.FC = () => {
  const { navigate } = useLabs();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(ROADMAPS[0].id);

  // Completed topics stored in localStorage
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ROADMAP_PROGRESS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ROADMAP_PROGRESS_KEY, JSON.stringify(completedTopics));
    } catch {
      // ignore
    }
  }, [completedTopics]);

  const toggleTopic = (topic: string) => {
    setCompletedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const activeRoadmap = ROADMAPS.find((r) => r.id === selectedRoadmapId) || ROADMAPS[0];

  // Calculate total topics and progress percentage for this roadmap
  const allRoadmapTopics = activeRoadmap.milestones.flatMap((m) => m.topics);
  const completedInActive = allRoadmapTopics.filter((t) => completedTopics.includes(t)).length;
  const progressPercent = Math.round((completedInActive / allRoadmapTopics.length) * 100);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-2">
          <Compass className="w-4 h-4" />
          <span>Curated by Aryan Thakur</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Cybersecurity Learning Roadmaps
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
          Structured, milestone-based learning curricula designed for progressive skill mastery in authorized labs and industry certifications.
        </p>
      </div>

      {/* Roadmap Navigation Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ROADMAPS.map((r) => {
          const isSelected = r.id === selectedRoadmapId;
          const topics = r.milestones.flatMap((m) => m.topics);
          const finished = topics.filter((t) => completedTopics.includes(t)).length;
          const pct = Math.round((finished / topics.length) * 100);

          return (
            <button
              key={r.id}
              onClick={() => setSelectedRoadmapId(r.id)}
              className={`p-5 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/50 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/70 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-slate-500">{r.level}</span>
                <span className="font-mono tabular-nums text-emerald-400 font-medium">
                  {pct}% Completed
                </span>
              </div>

              <h3 className={`text-base font-semibold leading-snug ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                {r.title}
              </h3>

              <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
                {r.targetRole}
              </p>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Roadmap View */}
      <div className="space-y-8 p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
        
        {/* Roadmap Summary Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="font-medium text-slate-300">{activeRoadmap.targetRole}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {activeRoadmap.totalDuration}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {activeRoadmap.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {activeRoadmap.summary}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 shrink-0 text-center min-w-[140px]">
            <div className="text-2xl font-bold font-mono tabular-nums text-emerald-400">
              {progressPercent}%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {completedInActive} of {allRoadmapTopics.length} Milestones
            </div>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="space-y-8">
          {activeRoadmap.milestones.map((milestone, idx) => (
            <div
              key={milestone.id}
              className="p-5 sm:p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {milestone.title}
                  </h3>
                </div>

                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 self-start sm:self-auto">
                  {milestone.duration}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {milestone.description}
              </p>

              {/* Checklist Topics */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Key Skills & Knowledge Checklist (Click to Track):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {milestone.topics.map((topic) => {
                    const isChecked = completedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`p-2.5 rounded-lg border text-left flex items-start gap-2.5 transition-colors ${
                          isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        )}
                        <span className={isChecked ? 'line-through text-slate-400' : ''}>
                          {topic}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Labs & Resources */}
              <div className="pt-3 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">
                    Recommended Practice Labs:
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {milestone.recommendedLabs.map((lab, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-400">›</span>
                        <span>{lab}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">
                    Recommended Study Resources:
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {milestone.keyResources.map((res, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-teal-400">›</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
