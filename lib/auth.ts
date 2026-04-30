import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

import { logAudit } from "@/lib/audit";
import { logLoginAttempt } from "@/lib/security/loginAttempts";
import { checkBruteForce } from "@/lib/security/anomaly";

/* =========================
   Rate limit (in-memory)
========================= */
const attempts = new Map<string, { count: number; first: number }>();

function addAttempt(email: string) {
  const data = attempts.get(email);

  if (!data) {
    attempts.set(email, { count: 1, first: Date.now() });
    return;
  }

  data.count += 1;
}

function clearAttempts(email: string) {
  attempts.delete(email);
}

/* =========================
   AUTH CONFIG
========================= */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email) return null;

        const email = credentials.email;

        const ip =
          (req as any)?.headers?.["x-forwarded-for"] ||
          (req as any)?.headers?.["x-real-ip"] ||
          "unknown";

        const userAgent =
          (req as any)?.headers?.["user-agent"] ||
          "unknown";

        /* =========================
           Brute force check
        ========================= */
        if (await checkBruteForce(email)) {
          await logAudit({
            userId: null,
            action: "LOGIN_BLOCKED_BRUTE_FORCE",
            entity: "auth",
            entityId: email,
            ip,
            userAgent,
            status: "FAILED",
          });

          throw new Error("Too many failed attempts. Try again later.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          addAttempt(email);

          await logLoginAttempt({
            email,
            success: false,
            ip,
            userAgent,
          });

          throw new Error("Invalid credentials");
        }

        /* =========================
           PASSWORD LOGIN
        ========================= */
        if (credentials.password) {
          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!valid) {
            addAttempt(email);

            await logLoginAttempt({
              email,
              success: false,
              ip,
              userAgent,
            });

            throw new Error("Invalid password");
          }

          await logLoginAttempt({
            email,
            success: true,
            ip,
            userAgent,
          });

          await logAudit({
            userId: user.id,
            action: "LOGIN_SUCCESS",
            entity: "auth",
            entityId: user.id,
            ip,
            userAgent,
            status: "SUCCESS",
          });

          clearAttempts(email);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        /* =========================
           OTP LOGIN (OPTION B FIX)
        ========================= */
        if (credentials.otp) {
          if (!user.otpVerified) {
            throw new Error("OTP not verified");
          }

          // reset OTP state after login
          await prisma.user.update({
            where: { email },
            data: {
              otpVerified: false,
              otpHash: null,
              otpExpiry: null,
              otpType: null,
              otpAttempts: 0,
            },
          });

          await logAudit({
            userId: user.id,
            action: "OTP_LOGIN_SUCCESS",
            entity: "auth",
            entityId: user.id,
            ip,
            userAgent,
            status: "SUCCESS",
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import { NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";

// /* =========================
//    Rate Limiting
// ========================= */
// const MAX_LOGIN_ATTEMPTS = 5;
// const LOGIN_WINDOW_MS = 15 * 60 * 1000;

// const loginAttempts = new Map<
//   string,
//   { count: number; firstAttempt: number }
// >();

// function getRateLimitEntry(key: string) {
//   const entry = loginAttempts.get(key);
//   if (!entry) return null;

//   if (Date.now() - entry.firstAttempt > LOGIN_WINDOW_MS) {
//     loginAttempts.delete(key);
//     return null;
//   }

//   return entry;
// }

// function incrementRateLimit(key: string) {
//   const entry = getRateLimitEntry(key);

//   if (!entry) {
//     loginAttempts.set(key, { count: 1, firstAttempt: Date.now() });
//     return 1;
//   }

//   entry.count += 1;
//   return entry.count;
// }

// function isRateLimited(key: string) {
//   const entry = getRateLimitEntry(key);
//   return entry ? entry.count >= MAX_LOGIN_ATTEMPTS : false;
// }

// function clearRateLimit(key: string) {
//   loginAttempts.delete(key);
// }

// /* =========================
//    NextAuth Config
// ========================= */
// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),

//   providers: [
//     CredentialsProvider({
//       name: "credentials",

//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//         otp: { label: "OTP", type: "text" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email) return null;

//         const key = `login:${credentials.email}`;

//         // 🚫 Rate limit check
//         if (isRateLimited(key)) {
//           throw new Error("Too many attempts. Try again in 15 minutes.");
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;

//         /* =========================
//            OTP LOGIN
//         ========================= */
//         if (credentials.otp) {
//           if (!user.otpHash || !user.otpExpiry) {
//             throw new Error("No OTP found");
//           }

//           if (user.otpExpiry < new Date()) {
//             throw new Error("OTP expired");
//           }

//           if (user.otpAttempts >= 5) {
//             throw new Error("Too many OTP attempts");
//           }

//           const isValidOTP = await bcrypt.compare(
//             credentials.otp,
//             user.otpHash
//           );

//           if (!isValidOTP) {
//             await prisma.user.update({
//               where: { email: user.email },
//               data: { otpAttempts: { increment: 1 } },
//             });

//             throw new Error("Invalid OTP");
//           }

//           // ✅ Clear OTP after success
//           await prisma.user.update({
//             where: { email: user.email },
//             data: {
//               otpHash: null,
//               otpExpiry: null,
//               otpType: null,
//               otpAttempts: 0,
//             },
//           });

//           clearRateLimit(key);

//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             role: user.role,
//           };
//         }

//         /* =========================
//            PASSWORD LOGIN
//         ========================= */
//         if (!credentials.password) return null;

//         const validPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!validPassword) {
//           const attempts = incrementRateLimit(key);
//           const attemptsLeft = MAX_LOGIN_ATTEMPTS - attempts;

//           throw new Error(
//             attemptsLeft > 0
//               ? `Invalid password. ${attemptsLeft} attempts left`
//               : "Too many attempts. Try again later"
//           );
//         }

//         clearRateLimit(key);

//         // 🔒 OPTIONAL: restrict only admin login
//         if (user.role !== "ADMIN") {
//           throw new Error("Access denied");
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = (user).role;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub!;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/admin/login",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };