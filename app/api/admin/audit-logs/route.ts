import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  const action = searchParams.get("action");

  const logs = await prisma.auditLog.findMany({
    where: {
      userId: userId || undefined,
      action: action || undefined,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return Response.json(logs);
}