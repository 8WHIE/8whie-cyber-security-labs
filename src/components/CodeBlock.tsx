/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - CodeBlock Component
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  explanation?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  explanation,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-4 rounded-lg border border-slate-800 bg-slate-950/90 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-800/80 bg-slate-900/60 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-mono">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-200">{title || language}</span>
          <span className="text-[11px] text-slate-500 uppercase tracking-wider">[{language}]</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
          title="Copy to clipboard"
          aria-label="Copy code block"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body with line numbers */}
      <div className="p-3 overflow-x-auto text-xs font-mono leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="pr-4 py-0.5 text-right select-none text-slate-600 text-[11px] w-8 tabular-nums font-mono">
                  {idx + 1}
                </td>
                <td className="py-0.5 text-slate-200 whitespace-pre font-mono">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Explanatory footer note if present */}
      {explanation && (
        <div className="px-3.5 py-2 border-t border-slate-800/60 bg-slate-900/30 text-[11px] text-slate-400 leading-normal">
          <span className="text-emerald-400 font-medium mr-1.5">Note:</span>
          {explanation}
        </div>
      )}
    </div>
  );
};
