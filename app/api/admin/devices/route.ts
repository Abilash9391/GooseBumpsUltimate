import { prisma } from "@/lib/prisma";

export async function GET() {
  const devices = await prisma.device.findMany({
    orderBy: { lastSeen: "desc" },
  });

  return Response.json(devices);
}