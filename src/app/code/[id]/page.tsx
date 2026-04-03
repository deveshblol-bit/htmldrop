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
      <main className="max-w-4xl mx-auto px-6 pt-20 animate-fade-in">
        <h1 className="text-2xl font-semibold mb-3">Not Found</h1>
        <p className="text-gray-400 mb-4">This deploy has expired or doesn't exist.</p>
        <a href="/" className="text-accent hover:text-accent-hover">← Create new</a>
      </main>
    );
  }

  if (html === null) {
    return <main className="max-w-4xl mx-auto px-6 pt-20"><div className="h-64 bg-white/5 rounded-xl animate-pulse" /></main>;
  }

  return (
    <main className="max-w-5xl mx-auto px-6 pt-16 pb-16 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <a href="/" className="text-xl font-semibold tracking-tight text-white hover:text-accent transition-colors">HTMLDrop</a>
          <span className="text-sm font-mono text-gray-500">/{id}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-gray-500">{remaining}</span>
          <a href={`/s/${id}`} target="_blank" className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-all">
            View Live →
          </a>
          <button
            onClick={() => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/15 transition-all"
          >
            {copied ? "Copied!" : "Copy HTML"}
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#111113] overflow-hidden">
        <pre className="p-5 font-mono text-sm text-gray-300 overflow-auto max-h-[70vh] whitespace-pre-wrap break-words leading-relaxed">
          {html}
        </pre>
      </div>
    </main>
  );
}
