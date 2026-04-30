import { prisma } from "@/lib/prisma";

export async function trackDevice(data: any) {
  return prisma.device.upsert({
    where: { deviceId: data.deviceId },
    update: {
      ip: data.ip,
      lastSeen: new Date(),
    },
    create: data,
  });
}