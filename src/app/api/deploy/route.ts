import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { storeDeploy } from "@/lib/store";

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
    const { expiresAt } = await storeDeploy(id, html, expiry);

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
