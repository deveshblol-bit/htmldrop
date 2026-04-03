import { NextResponse } from "next/server";
import { getDeploy } from "@/lib/store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deploy = await getDeploy(id);

  if (!deploy) {
    return NextResponse.json({ error: "Deploy not found or expired" }, { status: 404 });
  }

  return NextResponse.json({ html: deploy.html, expiresAt: deploy.expiresAt.getTime() });
}
