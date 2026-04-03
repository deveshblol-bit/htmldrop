export interface SeoPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  intro: string;
  features: { icon: string; title: string; desc: string }[];
  steps: string[];
  faq: { q: string; a: string }[];
  cta: string;
  related: string[];
}

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "chatgpt",
    title: "ChatGPT HTML Preview",
    metaTitle: "Deploy ChatGPT HTML Instantly — HTMLDrop",
    metaDescription: "Paste HTML code from ChatGPT and see it rendered live. One click to deploy and share. No signup, auto-expires.",
    heading: "Deploy ChatGPT HTML in seconds",
    subheading: "Copy HTML from any ChatGPT conversation → paste → see it live instantly",
    intro: "ChatGPT generates beautiful HTML — landing pages, dashboards, interactive demos — but there's no easy way to actually see it rendered. HTMLDrop bridges that gap. Paste your ChatGPT HTML output, preview it in real-time with our split-pane editor, and deploy it to a live URL with one click.",
    features: [
      { icon: "⚡", title: "Instant preview", desc: "See ChatGPT's HTML rendered live as you paste — no local server needed" },
      { icon: "🔗", title: "Shareable link", desc: "Deploy to a live URL and share with clients, teammates, or on social media" },
      { icon: "✏️", title: "Edit & iterate", desc: "Tweak ChatGPT's output in our Monaco editor before deploying" },
      { icon: "⏱️", title: "Auto-expires", desc: "Links self-destruct after 15 min to 7 days — your choice" },
    ],
    steps: [
      "Ask ChatGPT to generate HTML (e.g., \"Create a pricing page with 3 tiers\")",
      "Copy the HTML code block from ChatGPT's response",
      "Paste it into HTMLDrop's editor — see it render instantly in the preview pane",
      "Click Deploy → get a live URL to share",
    ],
    faq: [
      { q: "Does it work with ChatGPT artifacts?", a: "Yes! Copy the HTML from any ChatGPT code block or artifact and paste it directly into HTMLDrop." },
      { q: "Can I edit the HTML after pasting?", a: "Absolutely. HTMLDrop includes a full Monaco editor (same as VS Code) with syntax highlighting, so you can tweak anything before deploying." },
      { q: "Is there a size limit?", a: "HTML files up to 500KB are supported, which covers virtually any single-page ChatGPT output." },
    ],
    cta: "Try it — paste your ChatGPT HTML →",
    related: ["claude", "gemini", "cursor", "landing-page"],
  },
  {
    slug: "claude",
    title: "Claude HTML Preview",
    metaTitle: "Deploy Claude Artifacts HTML — HTMLDrop",
    metaDescription: "Preview and deploy HTML from Claude artifacts instantly. Paste Claude's HTML output, see it live, share with a link.",
    heading: "Deploy Claude HTML artifacts instantly",
    subheading: "Claude's artifacts are powerful — now see them live outside the chat",
    intro: "Claude by Anthropic generates stunning HTML through its artifacts feature — complete web pages, interactive components, data visualizations. But artifacts only live inside the Claude interface. HTMLDrop lets you take that HTML, preview it in a full browser context, and deploy it to a shareable URL anyone can visit.",
    features: [
      { icon: "🎨", title: "Full-page rendering", desc: "See Claude artifacts as actual web pages, not confined to a chat bubble" },
      { icon: "🔗", title: "Share with anyone", desc: "Deploy and send the link — recipients don't need a Claude account" },
      { icon: "📐", title: "Responsive testing", desc: "Resize the preview pane to test how Claude's HTML looks on different widths" },
      { icon: "💾", title: "Persistent URLs", desc: "Keep your deploy live for up to 7 days — perfect for async reviews" },
    ],
    steps: [
      "Generate HTML in Claude (artifacts, code blocks, or inline HTML)",
      "Click \"Copy\" on the artifact or select the HTML code",
      "Paste into HTMLDrop — see it rendered in the live preview",
      "Deploy and share the URL with anyone",
    ],
    faq: [
      { q: "Can I deploy Claude artifacts directly?", a: "Copy the HTML source from any Claude artifact and paste it into HTMLDrop. The live preview shows exactly what the artifact looks like as a standalone page." },
      { q: "Does it support Claude's interactive components?", a: "Yes — any HTML/CSS/JS that Claude generates will run in the preview and deployed page, including interactive elements." },
      { q: "What about Claude's React artifacts?", a: "HTMLDrop works with plain HTML. For React artifacts, ask Claude to generate a single-file HTML version with inline scripts." },
    ],
    cta: "Deploy your Claude artifacts →",
    related: ["chatgpt", "gemini", "v0", "developers"],
  },
  {
    slug: "gemini",
    title: "Gemini HTML Preview",
    metaTitle: "Deploy Google Gemini HTML Code — HTMLDrop",
    metaDescription: "Paste HTML from Google Gemini and preview it live. Deploy to a shareable URL instantly. Free, no signup.",
    heading: "Preview & deploy Gemini HTML output",
    subheading: "Take Gemini's code from chat to live page in one click",
    intro: "Google Gemini can generate complete HTML pages, components, and layouts. HTMLDrop gives you a dedicated workspace to paste that output, see it rendered in real-time, make quick edits, and deploy it to a live URL. No need to set up a local dev environment just to preview AI-generated code.",
    features: [
      { icon: "🚀", title: "Zero setup", desc: "No local server, no npm install — just paste and preview" },
      { icon: "🎯", title: "Live editing", desc: "Modify Gemini's output with syntax highlighting and instant preview" },
      { icon: "📤", title: "One-click deploy", desc: "Get a live URL in under a second" },
      { icon: "🔒", title: "Auto-cleanup", desc: "Pages self-destruct — no clutter, no hosting bills" },
    ],
    steps: [
      "Ask Gemini to create HTML (landing pages, forms, dashboards, etc.)",
      "Copy the generated HTML from Gemini's response",
      "Paste into HTMLDrop and preview it live",
      "Deploy to get a shareable link",
    ],
    faq: [
      { q: "Does it work with Gemini 2.5 code output?", a: "Yes. Any valid HTML that Gemini generates can be pasted and previewed in HTMLDrop." },
      { q: "Can I use Gemini's CSS and JavaScript too?", a: "HTMLDrop renders full HTML documents including inline CSS, JavaScript, and external CDN links." },
    ],
    cta: "Paste your Gemini HTML →",
    related: ["chatgpt", "claude", "cursor", "landing-page"],
  },
  {
    slug: "cursor",
    title: "Cursor IDE HTML Preview",
    metaTitle: "Preview Cursor AI HTML Output — HTMLDrop",
    metaDescription: "Deploy HTML generated by Cursor AI editor. Paste, preview, and share with a live URL. Perfect for rapid prototyping.",
    heading: "Deploy Cursor-generated HTML instantly",
    subheading: "From Cursor's AI chat to a live page — no git push required",
    intro: "Cursor's AI can generate full HTML pages and components right inside your editor. But sometimes you want to quickly share what it created without setting up hosting. HTMLDrop lets you paste Cursor's HTML output, preview it in a clean browser environment, and share it via a live URL — perfect for getting quick feedback on AI-generated prototypes.",
    features: [
      { icon: "💻", title: "Same editor feel", desc: "HTMLDrop uses Monaco (VS Code's editor engine) — feels like home for Cursor users" },
      { icon: "🔄", title: "Rapid iteration", desc: "Paste → preview → tweak → deploy in seconds" },
      { icon: "👥", title: "Share prototypes", desc: "Send a live URL instead of screenshots or code snippets" },
      { icon: "🧹", title: "No cleanup needed", desc: "Pages auto-expire — no repos to delete later" },
    ],
    steps: [
      "Generate HTML in Cursor using AI chat or Cmd+K",
      "Select and copy the generated HTML",
      "Paste into HTMLDrop for instant preview",
      "Click Deploy to share with your team",
    ],
    faq: [
      { q: "Why not just open the file locally?", a: "HTMLDrop gives you a shareable URL. Instead of saying \"run this locally,\" just send a link." },
      { q: "Does it support Tailwind CSS?", a: "Yes — include the Tailwind CDN link in your HTML and it works perfectly." },
    ],
    cta: "Preview your Cursor HTML →",
    related: ["v0", "developers", "chatgpt", "claude"],
  },
  {
    slug: "v0",
    title: "v0.dev HTML Deploy",
    metaTitle: "Deploy v0.dev Components as HTML — HTMLDrop",
    metaDescription: "Take v0.dev generated components, convert to HTML, and deploy them instantly with HTMLDrop. Preview and share.",
    heading: "Deploy v0 components as standalone pages",
    subheading: "Share v0 designs without a full Next.js setup",
    intro: "Vercel's v0 generates beautiful UI components, but they're React/Next.js by default. Sometimes you just want a quick shareable HTML version — for client previews, design reviews, or social sharing. Ask v0 for a plain HTML version, paste it into HTMLDrop, and get a live URL in seconds.",
    features: [
      { icon: "🎨", title: "Design previews", desc: "Share v0 designs as live pages, not static screenshots" },
      { icon: "⚡", title: "No build step", desc: "Skip the npm install → build → deploy cycle entirely" },
      { icon: "📱", title: "Test responsive", desc: "Preview v0 designs at different viewport widths" },
      { icon: "⏰", title: "Temporary by design", desc: "Perfect for review cycles — deploys auto-expire" },
    ],
    steps: [
      "Generate a component in v0.dev",
      "Ask v0 for a standalone HTML version with inline styles",
      "Paste the HTML into HTMLDrop",
      "Deploy and share for design review",
    ],
    faq: [
      { q: "Can I paste v0 React code directly?", a: "HTMLDrop renders plain HTML. Ask v0 to generate a single-file HTML version instead of React components." },
      { q: "Will Tailwind classes work?", a: "Include the Tailwind CDN in your HTML head tag and all utility classes will work." },
    ],
    cta: "Deploy your v0 design →",
    related: ["cursor", "claude", "landing-page", "developers"],
  },
  {
    slug: "landing-page",
    title: "Instant Landing Page Deploy",
    metaTitle: "Deploy a Landing Page in 30 Seconds — HTMLDrop",
    metaDescription: "Create and deploy landing pages instantly. Paste HTML, preview live, get a shareable URL. Perfect for MVPs and quick tests.",
    heading: "Deploy landing pages in 30 seconds",
    subheading: "The fastest way to go from HTML to live landing page",
    intro: "Need a landing page for a product launch, event, or quick test? Skip the hosting setup. HTMLDrop lets you paste any HTML landing page — whether you wrote it, got it from AI, or found a template — and deploy it to a live URL instantly. Perfect for MVPs, A/B test variants, and time-sensitive campaigns.",
    features: [
      { icon: "🏎️", title: "30-second deploys", desc: "Paste HTML → click Deploy → live URL. That's it." },
      { icon: "🧪", title: "A/B test variants", desc: "Deploy multiple versions with different links to test messaging" },
      { icon: "📊", title: "Quick validation", desc: "Test an idea before investing in proper hosting" },
      { icon: "🔗", title: "Clean URLs", desc: "Share htmldrop.vercel.app/s/[id] — looks professional" },
    ],
    steps: [
      "Write or generate your landing page HTML (try asking ChatGPT or Claude)",
      "Paste it into HTMLDrop's editor",
      "Preview and tweak in real-time",
      "Deploy with your preferred expiry (up to 7 days)",
    ],
    faq: [
      { q: "Can I use a custom domain?", a: "Currently HTMLDrop serves pages from htmldrop.vercel.app. For custom domains, you'd need traditional hosting." },
      { q: "Can I include forms?", a: "Yes — HTML forms with external action URLs (like Formspree, Typeform embeds) work perfectly." },
      { q: "What about images?", a: "Use externally hosted images (Imgur, Cloudinary, etc.) via img tags. HTMLDrop hosts HTML only." },
    ],
    cta: "Deploy your landing page →",
    related: ["chatgpt", "claude", "portfolio", "email-template"],
  },
  {
    slug: "portfolio",
    title: "Quick HTML Portfolio Deploy",
    metaTitle: "Deploy an HTML Portfolio Instantly — HTMLDrop",
    metaDescription: "Deploy a quick HTML portfolio page in seconds. Perfect for sharing work samples, design mockups, or personal sites.",
    heading: "Deploy a portfolio page in seconds",
    subheading: "Share your work without setting up hosting",
    intro: "Need to quickly share a portfolio with a potential client or employer? Paste your HTML portfolio into HTMLDrop, preview it live, and send a clean link. Great for designers sharing mockups, developers showing side projects, or anyone who needs a temporary personal page fast.",
    features: [
      { icon: "🖼️", title: "Showcase work", desc: "Deploy HTML portfolios with embedded images, videos, and links" },
      { icon: "⚡", title: "No hosting needed", desc: "Skip Netlify/Vercel setup — just paste and deploy" },
      { icon: "🎨", title: "Full creative control", desc: "Any HTML/CSS/JS — no template constraints" },
      { icon: "📧", title: "Perfect for outreach", desc: "Include in job applications or client proposals" },
    ],
    steps: [
      "Create portfolio HTML (or ask AI to generate one from your details)",
      "Paste into HTMLDrop and preview the layout",
      "Make any final tweaks in the editor",
      "Deploy and include the link in emails or applications",
    ],
    faq: [
      { q: "How long does the portfolio stay live?", a: "Choose from 15 minutes to 7 days. For permanent portfolios, consider traditional hosting." },
      { q: "Can I update it after deploying?", a: "Create a new deploy with updated HTML — you'll get a new URL. Old deploys stay live until expiry." },
    ],
    cta: "Deploy your portfolio →",
    related: ["landing-page", "developers", "email-template", "chatgpt"],
  },
  {
    slug: "email-template",
    title: "Email HTML Preview",
    metaTitle: "Preview Email HTML Templates — HTMLDrop",
    metaDescription: "Preview and test email HTML templates in the browser. See how your email renders before sending. Paste, preview, share.",
    heading: "Preview email HTML templates",
    subheading: "See exactly how your email HTML renders — before you hit send",
    intro: "Email HTML is notoriously tricky. HTMLDrop gives you a quick way to paste your email template, see it rendered, and share it with your team for review. No need to send test emails to yourself — just paste, preview, and iterate.",
    features: [
      { icon: "📧", title: "Instant rendering", desc: "See your email HTML rendered in a browser instantly" },
      { icon: "👥", title: "Team review", desc: "Share a preview link with designers and copywriters" },
      { icon: "📏", title: "Width testing", desc: "Resize the preview pane to simulate different email client widths" },
      { icon: "🔄", title: "Quick iterations", desc: "Edit and see changes in real-time" },
    ],
    steps: [
      "Export HTML from your email builder (Mailchimp, SendGrid, etc.)",
      "Paste it into HTMLDrop",
      "Preview the rendering and check for layout issues",
      "Share the preview URL with your team for approval",
    ],
    faq: [
      { q: "Is this the same as an email client preview?", a: "HTMLDrop renders in a standard browser. For exact email client rendering (Outlook, Gmail), use a dedicated tool like Litmus. HTMLDrop is great for quick checks and sharing." },
      { q: "Can I test responsive email templates?", a: "Toggle the preview pane width to approximate mobile vs. desktop rendering." },
    ],
    cta: "Preview your email template →",
    related: ["landing-page", "developers", "chatgpt", "claude"],
  },
  {
    slug: "developers",
    title: "HTML Deploy for Developers",
    metaTitle: "Quick HTML Deploy for Developers — HTMLDrop",
    metaDescription: "Deploy HTML snippets, prototypes, and demos instantly. Monaco editor, live preview, shareable URLs. Built for developers.",
    heading: "The developer's quick deploy tool",
    subheading: "Deploy HTML prototypes and demos without touching your infrastructure",
    intro: "Sometimes you just need to throw some HTML on the internet — a quick demo, a proof of concept, a bug reproduction, or a snippet to share on Stack Overflow. HTMLDrop gives you a Monaco editor (same engine as VS Code), live preview, and one-click deploy. No git push, no CI/CD, no hosting config.",
    features: [
      { icon: "💻", title: "Monaco editor", desc: "VS Code's editor engine with syntax highlighting, bracket matching, and autocomplete" },
      { icon: "🔥", title: "Live reload", desc: "Preview updates as you type — zero latency" },
      { icon: "🐛", title: "Bug reproductions", desc: "Create minimal reproductions and share a link in issues" },
      { icon: "📦", title: "CDN-friendly", desc: "Include any CDN library — Tailwind, Bootstrap, Alpine.js, HTMX" },
    ],
    steps: [
      "Write HTML in the Monaco editor (or paste from your IDE)",
      "See it render live in the split-pane preview",
      "Click Deploy to get a shareable URL",
      "Paste the link in GitHub issues, Slack, or docs",
    ],
    faq: [
      { q: "Can I use external libraries?", a: "Yes — include any CDN script or stylesheet. Popular choices: Tailwind CSS, Bootstrap, Alpine.js, HTMX, Three.js." },
      { q: "Is there an API?", a: "POST to /api/deploy with {html, expiry} to deploy programmatically." },
      { q: "What about JavaScript?", a: "Full JS support. Your deployed page runs scripts in a sandboxed iframe." },
    ],
    cta: "Start building →",
    related: ["cursor", "chatgpt", "claude", "landing-page"],
  },
  {
    slug: "tailwind",
    title: "Tailwind CSS HTML Preview",
    metaTitle: "Preview Tailwind CSS HTML — HTMLDrop",
    metaDescription: "Paste Tailwind CSS HTML and see it rendered live. Deploy Tailwind prototypes instantly. Include the CDN and go.",
    heading: "Preview Tailwind CSS HTML live",
    subheading: "Include the CDN → paste your Tailwind HTML → deploy",
    intro: "Building with Tailwind CSS? HTMLDrop is the fastest way to preview and share Tailwind-based HTML. Include the Tailwind CDN in your HTML head, paste your markup, and see it render with full utility class support. Perfect for sharing Tailwind prototypes, testing component ideas, or deploying quick demos.",
    features: [
      { icon: "🎨", title: "Full Tailwind support", desc: "Include the Play CDN and all utility classes just work" },
      { icon: "⚡", title: "Instant feedback", desc: "See Tailwind classes render as you type" },
      { icon: "📤", title: "Share components", desc: "Deploy and share Tailwind component demos" },
      { icon: "🧩", title: "Copy from UI libraries", desc: "Paste components from Tailwind UI, DaisyUI, or Flowbite" },
    ],
    steps: [
      "Add <script src=\"https://cdn.tailwindcss.com\"></script> to your HTML head",
      "Write or paste your Tailwind HTML",
      "Preview it live in the split pane",
      "Deploy to share your Tailwind prototype",
    ],
    faq: [
      { q: "Which Tailwind version is supported?", a: "Whatever version you include via CDN. The Play CDN gives you Tailwind 3.x/4.x with all plugins." },
      { q: "Can I use Tailwind config customizations?", a: "Yes — the Play CDN supports inline config via a script tag." },
    ],
    cta: "Preview Tailwind HTML →",
    related: ["developers", "landing-page", "chatgpt", "v0"],
  },
  {
    slug: "bolt",
    title: "Bolt.new HTML Deploy",
    metaTitle: "Deploy Bolt.new HTML Output — HTMLDrop",
    metaDescription: "Paste HTML from Bolt.new and deploy it instantly. Preview AI-generated pages and share with a live URL.",
    heading: "Deploy Bolt.new HTML in one click",
    subheading: "Take Bolt's output from prototype to shareable link instantly",
    intro: "Bolt.new generates full web apps with AI, but sometimes you just need to share a single page or component. HTMLDrop lets you extract HTML from Bolt, preview it in isolation, and deploy it to a clean URL — perfect for sharing specific pages without giving access to your whole Bolt project.",
    features: [
      { icon: "🔌", title: "Extract & deploy", desc: "Pull HTML from Bolt projects and deploy standalone" },
      { icon: "👀", title: "Client previews", desc: "Share individual pages without project access" },
      { icon: "✂️", title: "Component isolation", desc: "Test components outside the Bolt environment" },
      { icon: "⏱️", title: "Temporary sharing", desc: "Auto-expiring links for review cycles" },
    ],
    steps: [
      "Copy HTML source from your Bolt.new project",
      "Paste into HTMLDrop's editor",
      "Preview the standalone rendering",
      "Deploy and share the link",
    ],
    faq: [
      { q: "Can I deploy full Bolt apps?", a: "HTMLDrop is for single HTML pages. For full Bolt apps, use Bolt's built-in deployment." },
      { q: "What about Bolt's React components?", a: "Ask Bolt to generate a plain HTML version, or copy the rendered HTML from the preview." },
    ],
    cta: "Deploy from Bolt →",
    related: ["v0", "cursor", "chatgpt", "claude"],
  },
  {
    slug: "lovable",
    title: "Lovable HTML Deploy",
    metaTitle: "Deploy Lovable.dev HTML — HTMLDrop",
    metaDescription: "Preview and deploy HTML from Lovable.dev. Share AI-generated pages with a live URL instantly.",
    heading: "Deploy Lovable pages instantly",
    subheading: "Share Lovable-generated HTML without a full project deploy",
    intro: "Lovable.dev creates beautiful web apps from prompts. When you want to share a specific page or component — for client feedback, design review, or quick demos — extract the HTML and deploy it on HTMLDrop. Get a shareable URL in seconds without deploying your entire Lovable project.",
    features: [
      { icon: "💜", title: "Quick sharing", desc: "Share Lovable designs as live pages, not screenshots" },
      { icon: "✏️", title: "Edit before sharing", desc: "Tweak copy, colors, or layout before deploying" },
      { icon: "🔗", title: "Clean URLs", desc: "Professional-looking links for client presentations" },
      { icon: "🧹", title: "Auto-cleanup", desc: "No hosting management — pages expire automatically" },
    ],
    steps: [
      "Build your page in Lovable.dev",
      "Copy the HTML output",
      "Paste into HTMLDrop and preview",
      "Deploy to share with stakeholders",
    ],
    faq: [
      { q: "Is this a replacement for Lovable hosting?", a: "No — HTMLDrop is for quick, temporary shares. Use Lovable's hosting for production." },
    ],
    cta: "Deploy your Lovable page →",
    related: ["bolt", "v0", "cursor", "chatgpt"],
  },
  {
    slug: "replit",
    title: "Replit HTML Deploy",
    metaTitle: "Deploy Replit HTML Snippets — HTMLDrop",
    metaDescription: "Deploy HTML from Replit without running a full server. Paste, preview, and share with a live URL.",
    heading: "Deploy Replit HTML without a server",
    subheading: "Share HTML from Replit — no running repl required",
    intro: "Replit is great for coding, but sharing a simple HTML page means keeping your repl running. HTMLDrop lets you copy your HTML, deploy it to a static URL, and share it without worrying about your repl sleeping or hitting usage limits.",
    features: [
      { icon: "🖥️", title: "No server needed", desc: "Deploy static HTML without keeping a repl alive" },
      { icon: "💤", title: "Always available", desc: "No sleeping repls — your HTML stays live until expiry" },
      { icon: "📎", title: "Easy sharing", desc: "Short, clean URLs for homework, demos, or portfolios" },
      { icon: "🆓", title: "Free", desc: "No Replit plan required — just paste and deploy" },
    ],
    steps: [
      "Write HTML in Replit (or copy from an existing repl)",
      "Paste into HTMLDrop",
      "Preview the output",
      "Deploy and share the permanent-ish link",
    ],
    faq: [
      { q: "Why not just share my Replit link?", a: "Replit free tier repls sleep after inactivity. HTMLDrop links stay live without a running process." },
    ],
    cta: "Deploy from Replit →",
    related: ["developers", "cursor", "chatgpt", "portfolio"],
  },
  {
    slug: "windsurf",
    title: "Windsurf HTML Deploy",
    metaTitle: "Deploy Windsurf AI HTML — HTMLDrop",
    metaDescription: "Preview and deploy HTML from Windsurf IDE. Share AI-generated prototypes with a live URL instantly.",
    heading: "Deploy Windsurf HTML prototypes",
    subheading: "From Windsurf's AI to a live page — no deploy pipeline needed",
    intro: "Windsurf's AI coding flows generate HTML rapidly. HTMLDrop lets you take that output, preview it outside your IDE, and share it via a live URL. Skip the git-push-deploy cycle for quick prototypes and demos.",
    features: [
      { icon: "🏄", title: "Flow-friendly", desc: "Copy from Windsurf's AI output → paste → deploy in seconds" },
      { icon: "💻", title: "Familiar editor", desc: "Monaco-based editor — same foundation as Windsurf" },
      { icon: "📤", title: "Instant sharing", desc: "Get a live URL without configuring hosting" },
      { icon: "⏱️", title: "Ephemeral", desc: "Auto-expiring — perfect for review cycles" },
    ],
    steps: [
      "Generate HTML with Windsurf's AI",
      "Copy the HTML output",
      "Paste into HTMLDrop and preview",
      "Deploy to share",
    ],
    faq: [
      { q: "Does it support Windsurf's full-stack output?", a: "HTMLDrop serves static HTML. For full-stack apps, use Windsurf's deployment features." },
    ],
    cta: "Deploy from Windsurf →",
    related: ["cursor", "bolt", "v0", "developers"],
  },
];

export function getPageBySlug(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return SEO_PAGES.map((p) => p.slug);
}
