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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    h1 { font-size: 3rem; }
  </style>
</head>
<body>
  <h1>Hello World 🚀</h1>
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

  // Live preview update
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
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#111113]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${showPreview ? "bg-accent/20 text-accent" : "bg-white/5 text-gray-400 hover:text-white"}`}
          >
            {showPreview ? "◧ Split" : "☐ Editor"}
          </button>
          <span className={`text-xs font-mono ${overLimit ? "text-red-400" : "text-gray-500"}`}>
            {(byteSize / 1024).toFixed(1)} KB / 500 KB
          </span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300 focus:outline-none focus:border-accent/40"
          >
            {EXPIRY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            onClick={handleDeploy}
            disabled={!code.trim() || loading || overLimit}
            className="px-5 py-1.5 bg-accent text-white rounded-md text-xs font-semibold hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Deploying..." : "Deploy →"}
          </button>
        </div>
      </div>

      {/* Result banner */}
      {result && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-accent/10 border-b border-accent/20 animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="text-xs text-accent font-medium">LIVE</span>
            <a href={result.url} target="_blank" className="text-sm font-mono text-white hover:text-accent transition-colors truncate max-w-[400px]">
              {result.url}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a href={result.codeUrl} target="_blank" className="px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors">
              Source
            </a>
            <button onClick={handleCopy} className="px-4 py-1.5 bg-accent text-white rounded-md text-xs font-medium hover:bg-accent-hover transition-all">
              {copied ? "Copied!" : "Copy URL"}
            </button>
            <button onClick={() => setResult(null)} className="px-2 py-1 text-gray-500 hover:text-white text-xs">✕</button>
          </div>
        </div>
      )}

      {error && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Editor + Preview */}
      <div className="flex-1 flex min-h-0">
        <div className={`${showPreview ? "w-1/2" : "w-full"} border-r border-white/10 min-h-0`}>
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
              padding: { top: 12 },
              renderLineHighlight: "none",
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              scrollbar: { verticalScrollbarSize: 6 },
            }}
          />
        </div>
        {showPreview && (
          <div className="w-1/2 bg-white min-h-0">
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
