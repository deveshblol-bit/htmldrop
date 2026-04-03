"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ViewCode() {
  const { id } = useParams<{ id: string }>();
  const [html, setHtml] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState(0);
  const [remaining, setRemaining] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/deploy/${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { setHtml(d.html); setExpiresAt(d.expiresAt); })
      .catch(() => setNotFound(true));
  }, [id]);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const diff = expiresAt - Date.now();
      if (diff <= 0) { setRemaining("Expired"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(h > 0 ? `${h}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}` : `${m}:${s.toString().padStart(2,"0")}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (notFound) {
    return (
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-20 animate-fade-in">
        <h1 className="text-2xl font-semibold mb-3 text-white/90">Not Found</h1>
        <p className="text-white/40 mb-4">This deploy has expired or doesn't exist.</p>
        <a href="/" className="text-accent hover:text-accent-hover transition-colors duration-200">← Create new</a>
      </main>
    );
  }

  if (html === null) {
    return (
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-20">
        <div className="h-64 bg-white/[0.03] rounded-2xl animate-shimmer border border-border" />
      </main>
    );
  }

  return (
    <main className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-16 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <a href="/" className="text-xl font-semibold tracking-tight hover:text-accent transition-colors duration-200">
            <span className="text-accent">HTML</span><span className="text-white/90">Drop</span>
          </a>
          <div className="w-px h-5 bg-border" />
          <span className="text-sm font-mono text-white/25">{id}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/25 tabular-nums">{remaining}</span>
          <a href={`/s/${id}`} target="_blank" className="px-4 py-2 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent-hover transition-all duration-200 shadow-[0_0_20px_rgba(167,139,250,0.15)]">
            View Live →
          </a>
          <button
            onClick={() => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="px-4 py-2 bg-white/[0.04] text-white/70 border border-border rounded-lg text-xs font-medium hover:bg-white/[0.08] hover:text-white transition-all duration-200"
          >
            {copied ? "✓ Copied" : "Copy HTML"}
          </button>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-surface-raised overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.3)]">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06]" />
          </div>
          <span className="text-[10px] font-mono text-white/20 ml-2">source</span>
        </div>
        <pre className="p-5 font-mono text-sm text-white/60 overflow-auto max-h-[70vh] whitespace-pre-wrap break-words leading-relaxed selection:bg-accent/20">
          {html}
        </pre>
      </div>
    </main>
  );
}
