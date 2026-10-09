/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - CategoryCard Component
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { CategoryInfo } from '../types.ts';
import { useLabs } from '../context/LabsContext.tsx';
import {
  Globe,
  Terminal,
  LayoutGrid,
  Network,
  Radio,
  Eye,
  FileSearch,
  KeyRound,
  Binary,
  ShieldAlert,
  Wrench,
  Compass,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Terminal,
  LayoutGrid,
  Network,
  Radio,
  Eye,
  FileSearch,
  KeyRound,
  Binary,
  ShieldAlert,
  Wrench,
  Compass,
};

interface CategoryCardProps {
  category: CategoryInfo;
  count: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, count }) => {
  const { navigate } = useLabs();
  const IconComponent = iconMap[category.iconName] || Terminal;

  return (
    <div
      onClick={() => navigate(`/category/${category.slug}`)}
      className="group cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700/80 transition-all p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-10 h-10 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-200 group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
            <IconComponent className="w-5 h-5" />
          </div>

          <span className="text-xs font-mono tabular-nums text-slate-400">
            {count} {count === 1 ? 'lab' : 'labs'}
          </span>
        </div>

        <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
          {category.name}
        </h3>

        <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
        <span className="truncate max-w-[200px]">
          {category.focusAreas[0]}
        </span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-emerald-400" />
      </div>
    </div>
  );
};
