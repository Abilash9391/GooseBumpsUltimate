import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@goosebumpsultimate.org" },
    update: {},
    create: {
      email: "admin@goosebumpsultimate.org",
      password: hash,
      role: "ADMIN",
    },
  });

  console.log("Admin created");
}

main();