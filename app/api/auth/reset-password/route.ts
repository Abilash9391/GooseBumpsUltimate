// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   const { email, otp, newPassword } = await req.json();

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user || !user.otp || !user.otpExpiry) {
//     return Response.json({ error: "Invalid request" }, { status: 400 });
//   }

//   if (user.otp !== otp || user.otpExpiry < new Date()) {
//     return Response.json({ error: "OTP invalid" }, { status: 400 });
//   }

//   const hash = await bcrypt.hash(newPassword, 10);

//   await prisma.user.update({
//     where: { email },
//     data: {
//       password: hash,
//       otp: null,
//       otpExpiry: null,
//     },
//   });

//   return Response.json({ success: true });
// }
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, otp, newPassword } = await req.json();

  if (!email || !otp || !newPassword) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.otpHash || !user.otpExpiry) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // ⏱ Expiry check
  if (user.otpExpiry < new Date()) {
    return Response.json({ error: "OTP expired" }, { status: 400 });
  }

  // 🔐 Compare hashed OTP
  const isValid = await bcrypt.compare(otp, user.otpHash);

  if (!isValid) {
    await prisma.user.update({
      where: { email },
      data: { otpAttempts: { increment: 1 } },
    });

    return Response.json({ error: "Invalid OTP" }, { status: 400 });
  }

  // 🔒 Hash new password
  const hash = await bcrypt.hash(newPassword, 10);

  // ✅ Update password + clear OTP
  await prisma.user.update({
    where: { email },
    data: {
      password: hash,
      otpHash: null,
      otpExpiry: null,
      otpAttempts: 0,
    },
  });

  return Response.json({ success: true });
}