import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // ✅ PUBLIC ROUTES (NO AUTH)
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password"
  ) {
    return NextResponse.next();
  }

  // 🔒 PROTECTED ROUTES
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     // You can add logs here if needed
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         // ✅ Only allow ADMIN
//         return token?.role === "ADMIN";
//       },
//     },
//     pages: {
//       signIn: "/admin/login",
//     },
//   }
// );

// export const config = {
//   matcher: ["/admin/:path*"],
// };
// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/admin/login",
//   },
// });

// export const config = {
//   matcher: ["/admin/:path*"],
// };