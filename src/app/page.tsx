import Editor from "@/components/Editor";

export default function Home() {
  return (
    <div className="h-screen flex flex-col relative z-10">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight">
            <span className="text-accent">HTML</span>
            <span className="text-white/90">Drop</span>
          </h1>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-px h-4 bg-border" />
            <span className="text-xs text-white/30 font-light">
              Paste HTML → Get a live URL
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/deveshblol-bit/htmldrop"
            target="_blank"
            className="text-xs text-white/30 hover:text-accent transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      {/* Editor */}
      <Editor />
    </div>
  );
}
