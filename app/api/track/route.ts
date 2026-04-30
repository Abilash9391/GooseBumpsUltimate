import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { path, anonId, sessionId } = body;

    if (!path || !anonId || !sessionId) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.pageView.create({
      data: {
        path,
        anonymousId: anonId,
        sessionId,
      },
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}