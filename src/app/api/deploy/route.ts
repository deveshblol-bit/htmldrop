import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { saveDeploy } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const html = body?.html;
    const expiry = body?.expiry || "15m";

    if (!html || typeof html !== "string" || html.trim().length === 0) {
      return NextResponse.json({ error: "HTML is required" }, { status: 400 });
    }

    if (Buffer.byteLength(html, "utf-8") > 500 * 1024) {
      return NextResponse.json({ error: "HTML exceeds 500KB limit" }, { status: 413 });
    }

    const id = nanoid(8);
    const expiryMap: Record<string, number> = {
      "15m": 15 * 60 * 1000,
      "1h": 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
    };
    const expiryMs = expiryMap[expiry] || expiryMap["15m"];
    await saveDeploy(id, html, expiryMs);
    const expiresAt = new Date(Date.now() + expiryMs).toISOString();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
      || "http://localhost:3000";

    return NextResponse.json({
      id,
      url: `${baseUrl}/s/${id}`,
      codeUrl: `${baseUrl}/code/${id}`,
      expiresAt,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Internal error" }, { status: 500 });
  }
}
