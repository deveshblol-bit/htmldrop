import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HTMLDrop — Instant HTML Deploy",
  description: "Paste HTML from ChatGPT or Claude, get a live URL instantly. No signup, auto-expires.",
  openGraph: {
    title: "HTMLDrop — Instant HTML Deploy",
    description: "Paste HTML, get a live link. Perfect for AI-generated code.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0A0A0B] text-white min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
