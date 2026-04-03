import { getDeploy } from "@/lib/store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deploy = await getDeploy(id);

  if (!deploy) {
    return new Response(
      `<!DOCTYPE html><html><head><title>Expired</title><style>body{font-family:Inter,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#0C0C0E;color:#fff}div{text-align:center}h1{font-weight:600;color:rgba(255,255,255,0.85);font-size:1.5rem}p{color:rgba(255,255,255,0.35);margin:0.75rem 0 1.5rem;font-size:0.9rem}a{color:#A78BFA;text-decoration:none;font-weight:500;font-size:0.9rem}a:hover{color:#8B5CF6}</style></head><body><div><h1>This deploy has expired</h1><p>HTMLDrop pages auto-delete after their expiry time.</p><a href="https://htmldrop.vercel.app">Create a new one →</a></div></body></html>`,
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
