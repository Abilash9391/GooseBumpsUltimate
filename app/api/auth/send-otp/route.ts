// import { prisma } from "@/lib/prisma";
// import { generateOTP, getExpiry } from "@/lib/otp";
// import { sendOTPEmail } from "@/lib/mail";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   const { email } = await req.json();

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     return Response.json({ error: "User not found" }, { status: 404 });
//   }

//   const otp = generateOTP();

//   // 🔐 hash OTP
//   const hashedOtp = await bcrypt.hash(otp, 10);

//   await prisma.user.update({
//     where: { email },
//     data: {
//       otpHash: hashedOtp,        // ✅ correct field
//       otpExpiry: getExpiry(),    // ✅ already correct
//       otpType: "LOGIN",          // ✅ add this
//       otpAttempts: 0,            // ✅ reset attempts
//     },
//   });

//   await sendOTPEmail(email, otp);

//   // 🧪 debug (remove in production)
//   console.log("OTP:", otp);

//   return Response.json({ success: true });
// }

// app/api/auth/send-otp/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import crypto from "crypto";
// import bcrypt from "bcryptjs";
// import { useSend } from "@/lib/useSend";
// import { otpTemplate } from "@/lib/templates";

// const MAX_OTP_PER_HOUR = 5;
// const WINDOW = 60 * 60 * 1000;
// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password required" },
//         { status: 400 }
//       );
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     const isValid = await bcrypt.compare(password, user.password);

//     if (!isValid) {
//       return NextResponse.json(
//         { error: "Invalid password" },
//         { status: 401 }
//       );
//     }

//     // ONLY NOW generate OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
//     const otpHash = await bcrypt.hash(otp, 10);

//     await prisma.user.update({
//       where: { email },
//       data: {
//         otpHash,
//         otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
//         otpType: "LOGIN",
//         otpAttempts: 0,
//       },
//     });

//     await useSend({
//       to: email,
//       subject: "Your verification code",
//       html: otpTemplate(otp),
//     });

//     return NextResponse.json({ success: true });

//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { useSend } from "@/lib/useSend";
import { otpTemplate } from "@/lib/templates";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔒 CHECK PASSWORD FIRST (CRITICAL)
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Generate OTP only after success
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    await prisma.user.update({
      where: { email },
      data: {
        otpHash,
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
        otpType: "LOGIN",
        otpAttempts: 0,
        otpVerified: false,
      },
    });

    await useSend({
      to: email,
      subject: "Your verification code",
      html: otpTemplate(otp),
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}