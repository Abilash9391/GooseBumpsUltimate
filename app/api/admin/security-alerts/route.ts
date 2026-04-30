import { prisma } from "@/lib/prisma";

export async function GET() {
  const alerts = await prisma.auditLog.findMany({
    where: {
      status: "FAILED",
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return Response.json(alerts);
}