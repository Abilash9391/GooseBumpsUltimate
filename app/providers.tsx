// "use client";

// import { SessionProvider } from "next-auth/react";
// import { ThemeProvider } from "next-themes";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//       <SessionProvider>
//         {children}
//       </SessionProvider>
//     </ThemeProvider>
//   );
// }
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
// import { AdminAuthProvider } from "@/components/providers/AdminAuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        {/* <AdminAuthProvider> */}
          {children}
        {/* </AdminAuthProvider> */}
      </SessionProvider>
    </ThemeProvider>
  );
}