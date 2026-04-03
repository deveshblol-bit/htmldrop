import { getDeploy } from "@/lib/store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deploy = await getDeploy(id);

  if (!deploy) {
    return new Response(
      `<!DOCTYPE html><html><head><title>Expired</title><style>body{font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#0A0A0B;color:#fff}div{text-align:center}a{color:#6366F1}</style></head><body><div><h1>This deploy has expired</h1><p>HTMLDrop pages auto-delete after their expiry time.</p><a href="https://htmldrop.vercel.app">Create a new one →</a></div></body></html>`,
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  return new Response(deploy.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "frame-ancestors 'self'",
      "X-Frame-Options": "SAMEORIGIN",
    },
  });
}
