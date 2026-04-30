import { logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  const body = await req.json();

  await logAudit(body);

  return Response.json({ ok: true });
}