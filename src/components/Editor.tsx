"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const PLACEHOLDER = `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      color: white;
    }
    h1 { font-size: 3rem; text-shadow: 0 0 40px rgba(167,139,250,0.5); }
  </style>
</head>
<body>
  <h1>Hello World ✨</h1>
</body>
</html>`;

const EXPIRY_OPTIONS = [
  { value: "15m", label: "15 min" },
  { value: "1h", label: "1 hour" },
  { value: "24h", label: "24 hours" },
  { value: "7d", label: "7 days" },
];

export default function Editor() {
  const [code, setCode] = useState(PLACEHOLDER);
  const [expiry, setExpiry] = useState("24h");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ url: string; codeUrl: string; id: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const byteSize = new Blob([code]).size;
  const overLimit = byteSize > 500 * 1024;

  useEffect(() => {
    if (!iframeRef.current || !showPreview) return;
    const doc = iframeRef.current.contentDocument;
    if (doc) {
      doc.open();
      doc.write(code);
      doc.close();
    }
  }, [code, showPreview]);

  async function handleDeploy() {
    if (!code.trim() || overLimit) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: code, expiry }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="h-[calc(100vh-52px)] flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-raised/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              showPreview
                ? "bg-accent/15 text-accent border border-border-accent"
                : "bg-white/[0.03] text-white/40 border border-transparent hover:text-white/60 hover:bg-white/[0.06]"
            }`}
          >
            {showPreview ? "◧ Split" : "☐ Editor"}
          </button>
          <span className={`text-xs font-mono ${overLimit ? "text-red-400" : "text-white/25"}`}>
            {(byteSize / 1024).toFixed(1)} KB
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <select
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="px-3 py-1.5 bg-white/[0.03] border border-border rounded-lg text-xs text-white/50 focus:outline-none focus:border-border-accent focus:text-white/70 transition-all duration-200 cursor-pointer"
          >
            {EXPIRY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            onClick={handleDeploy}
            disabled={!code.trim() || loading || overLimit}
            className="group relative px-5 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_20px_rgba(167,139,250,0.15)] hover:shadow-[0_0_30px_rgba(167,139,250,0.3)]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Deploying…
              </span>
            ) : "Deploy →"}
          </button>
        </div>
      </div>

      {/* Result banner */}
      {result && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-accent/[0.06] border-b border-border-accent animate-slide-up backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">Live</span>
            <a href={result.url} target="_blank" className="text-sm font-mono text-white/80 hover:text-accent transition-colors duration-200 truncate max-w-[400px]">
              {result.url}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a href={result.codeUrl} target="_blank" className="px-3 py-1 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 rounded-md hover:bg-white/[0.04]">
              Source
            </a>
            <button onClick={handleCopy} className="px-4 py-1.5 bg-accent/15 text-accent border border-border-accent rounded-lg text-xs font-medium hover:bg-accent/25 transition-all duration-200">
              {copied ? "✓ Copied" : "Copy URL"}
            </button>
            <button onClick={() => setResult(null)} className="px-2 py-1 text-white/20 hover:text-white/50 text-xs transition-colors">✕</button>
          </div>
        </div>
      )}

      {error && (
        <div className="px-4 py-2 bg-red-500/[0.06] border-b border-red-500/20 text-red-400 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Editor + Preview */}
      <div className="flex-1 flex min-h-0">
        <div className={`${showPreview ? "w-1/2" : "w-full"} border-r border-border min-h-0`}>
          <MonacoEditor
            height="100%"
            defaultLanguage="html"
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              wordWrap: "on",
              padding: { top: 16 },
              renderLineHighlight: "gutter",
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              scrollbar: { verticalScrollbarSize: 5, horizontalScrollbarSize: 5 },
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              smoothScrolling: true,
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>
        {showPreview && (
          <div className="w-1/2 bg-white min-h-0 relative">
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              title="Preview"
            />
          </div>
        )}
      </div>
    </div>
  );
}
