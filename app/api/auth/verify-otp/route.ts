// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   const { email, otp } = await req.json();

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user || !user.otp || !user.otpExpiry) {
//     return Response.json({ error: "Invalid OTP" }, { status: 400 });
//   }

//   if (user.otp !== otp || user.otpExpiry < new Date()) {
//     return Response.json({ error: "OTP expired or wrong" }, { status: 400 });
//   }

//   return Response.json({ success: true });
// }
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// const MAX_ATTEMPTS = 5;
// const LOCK_TIME = 10 * 60 * 1000; // 10 min

// export async function POST(req: Request) {
//   try {
//     const { email, otp } = await req.json();

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user || !user.otpHash || !user.otpExpiry) {
//       return Response.json({ error: "Invalid request" }, { status: 400 });
//     }

//     // 🔒 Check brute-force lock
//     if (user.otpAttempts >= MAX_ATTEMPTS) {
//       const lockUntil =
//         new Date(user.otpExpiry).getTime() + LOCK_TIME;

//       if (Date.now() < lockUntil) {
//         return Response.json(
//           { error: "Too many attempts. Try later." },
//           { status: 429 }
//         );
//       } else {
//         // reset after lock expires
//         await prisma.user.update({
//           where: { email },
//           data: { otpAttempts: 0 },
//         });
//       }
//     }

//     // ⏳ Check expiry
//     if (user.otpExpiry < new Date()) {
//       return Response.json(
//         { error: "OTP expired" },
//         { status: 400 }
//       );
//     }

//     // 🔐 Compare hashed OTP
//     const isValid = await bcrypt.compare(otp, user.otpHash);

//     if (!isValid) {
//       await prisma.user.update({
//         where: { email },
//         data: {
//           otpAttempts: { increment: 1 },
//         },
//       });

//       return Response.json(
//         { error: "Invalid OTP" },
//         { status: 400 }
//       );
//     }

//     // ✅ SUCCESS → reset everything
//     await prisma.user.update({
//       where: { email },
//       data: {
//         otpAttempts: 0,
//         otpHash: null,
//         otpExpiry: null,
//         otpType: null,
//       },
//     });

//     return Response.json({ success: true });

//   } catch (error) {
//     console.error("VERIFY OTP ERROR:", error);
//     return Response.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.otpHash || !user.otpExpiry) {
      return Response.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // 🔒 REAL LOCK CHECK
    if (
      user.otpLockedUntil &&
      user.otpLockedUntil > new Date()
    ) {
      return Response.json(
        { error: "Too many attempts. Try later." },
        { status: 429 }
      );
    }

    // ⏳ Expiry check
    if (user.otpExpiry < new Date()) {
      return Response.json(
        { error: "OTP expired" },
        { status: 400 }
      );
    }

    // 🔐 Validate OTP
    const isValid = await bcrypt.compare(otp, user.otpHash);

    if (!isValid) {
      const newAttempts = user.otpAttempts + 1;

      await prisma.user.update({
        where: { email },
        data: {
          otpAttempts: newAttempts,

          // 🔥 lock user if limit exceeded
          otpLockedUntil:
            newAttempts >= MAX_ATTEMPTS
              ? new Date(Date.now() + 10 * 60 * 1000)
              : null,
        },
      });

      return Response.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // ✅ SUCCESS → reset everything
    await prisma.user.update({
      where: { email },
      data: {
        otpAttempts: 0,
        otpHash: null,
        otpExpiry: null,
        otpType: null,
        otpLockedUntil: null,
        otpVerified:true
      },
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}