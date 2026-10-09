/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - EthicalBanner Component
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface EthicalBannerProps {
  compact?: boolean;
}

export const EthicalBanner: React.FC<EthicalBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-800 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Educational content intended strictly for authorized CTFs and legal practice labs. Probing unauthorized systems is illegal.
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-500/20 bg-slate-900/60 p-4 sm:p-5 relative overflow-hidden">
      <div className="flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>8WHIE Ethical Practice & Legal Notice</span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Worldwide Hackers Intelligence & Ethics
            </span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            All procedures, scripts, and vulnerability assessments published on 8WHIE Cyber Security Labs are strictly intended for legal CTFs, TryHackMe/Hack The Box rooms, and systems where explicit, written authorization has been granted. Probing or attacking unauthorized systems without permission is a serious violation of computer crime laws. Practice responsibly and defend.
          </p>
        </div>
      </div>
    </div>
  );
};
