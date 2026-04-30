

import { prisma } from "@/lib/prisma";

/**
 * Detect brute force login attempts
 */
export async function checkBruteForce(email: string) {
  const failedAttempts = await prisma.loginAttempt.count({
    where: {
      email,
      success: false,
      createdAt: {
        gte: new Date(Date.now() - 10 * 60 * 1000), // last 10 min
      },
    },
  });

  return failedAttempts >= 5;
}