import { prisma } from "@/lib/prisma";

export async function logLoginAttempt(data) {
  return prisma.loginAttempt.create({ data });
}