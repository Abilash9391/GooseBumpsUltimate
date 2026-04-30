// lib/audit.ts
import { prisma } from "@/lib/prisma";

export async function logAudit({
  userId,
  action,
  entity,
  entityId,
  before,
  after,
  ip,
  userAgent,
  deviceId,
  status = "SUCCESS",
}: any) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entity,
      entityId,
      before,
      after,
      ip,
      userAgent,
      deviceId,
      status,
    },
  });
}