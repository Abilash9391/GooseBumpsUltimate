// import type { Metadata } from "next";
// import { AdminAuthProvider } from "@/components/providers/AdminAuthProvider";
// import { Toaster } from "@/components/ui/toaster";
// import { ThemeProvider } from "next-themes";
// import  "./globals.css";

// export const metadata: Metadata = {
//   title: "GooseBumps",
//   description: "A modern application with admin management",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           <AdminAuthProvider>
//             {children}
//             <Toaster />
//           </AdminAuthProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/app/providers";
import  "./globals.css";

export const metadata: Metadata = {
  icons: "/favicon.ico",
  title: "GooseBumps",
  description: "A modern application with admin management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}


// // import { Providers } from "@/components/Providers";
// // import "./globals.css";
// // import { Navbar } from "@/components/Navbar";

// // export const metadata = {
// //   title: "GooseBumps", 
// //   icon: "./public/favicon.ico",
// //   description: "A thrilling adventure game",
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <body>
// //         <Navbar/>
// //                <Providers>{children}</Providers>
// //       </body>
// //     </html>
// //   );
// // }

// import type { Metadata } from "next";
// import { AdminAuthProvider } from "@/components/providers/AdminAuthProvider";
// import { Toaster } from "@/components/ui/toaster";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "GooseBumps",
//   description: "A modern application with admin management",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <AdminAuthProvider>
//           {children}
//           <Toaster />
//         </AdminAuthProvider>
//       </body>
//     </html>
//   );
// }