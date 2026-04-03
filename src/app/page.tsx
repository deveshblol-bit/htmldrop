import Editor from "@/components/Editor";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0A0A0B]">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight">
            <span className="text-accent">HTML</span>Drop
          </h1>
          <span className="text-xs text-gray-500 font-light hidden sm:inline">
            Paste HTML → Get a live URL
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/deveshblol-bit/htmldrop"
            target="_blank"
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Editor */}
      <Editor />
    </div>
  );
}
