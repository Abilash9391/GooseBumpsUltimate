"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminSidebar from "@/components/admin/AdminSideBar";
import { trackPage } from "@/lib/tracking";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password";

  // auth redirect
  useEffect(() => {
    if (status === "unauthenticated" && !isPublicRoute) {
      router.replace("/admin/login");
    }
  }, [status, isPublicRoute, router]);

  // analytics tracking (safe separation)
  useEffect(() => {
    if (session && !isPublicRoute) {
      trackPage();
    }
  }, [pathname, session, isPublicRoute]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isPublicRoute) return <>{children}</>;
  if (!session) return null;

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
// "use client";

// import { useEffect } from "react";
// import { Shield } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";

// import {
//   LayoutDashboard,
//   FileText,
//   Calendar,
//   Users,
//   Trophy,
//   Image as ImageIcon,
//   Settings,
//   LogOut,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// const sidebarLinks = [
//   { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { to: "/admin/posts", label: "Posts", icon: FileText },
//   { to: "/admin/events", label: "Events", icon: Calendar },
//   { to: "/admin/player-stories", label: "Player Stories", icon: Users },
//   { to: "/admin/team-stories", label: "Team Stories", icon: Trophy },
//   { to: "/admin/images", label: "Image Gallery", icon: ImageIcon },
//   { to: "/admin/security", label: "Security", icon: Shield },
//   { to: "/admin/settings", label: "Settings", icon: Settings },
// ];

// function getOrCreate(key: string) {
//   let value = localStorage.getItem(key);
//   if (!value) {
//     value = crypto.randomUUID();
//     localStorage.setItem(key, value);
//   }
//   return value;
// }

// function getSessionId() {
//   const now = Date.now();
//   const sessionData = JSON.parse(localStorage.getItem("session") || "{}");

//   if (!sessionData.id || now - sessionData.time > 30 * 60 * 1000) {
//     const newSession = {
//       id: crypto.randomUUID(),
//       time: now,
//     };
//     localStorage.setItem("session", JSON.stringify(newSession));
//     return newSession.id;
//   }

//   sessionData.time = now;
//   localStorage.setItem("session", JSON.stringify(sessionData));
//   return sessionData.id;
// }

// export async function trackPage() {
//   const anonId = getOrCreate("anonId");
//   const sessionId = getSessionId();

//   await fetch("/api/track", {
//     method: "POST",
//     body: JSON.stringify({
//       path: window.location.pathname,
//       anonId,
//       sessionId,
//     }),
//   });
// }

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();

//   //  PUBLIC ROUTES (NO AUTH REQUIRED)
//   const isPublicRoute =
//     pathname === "/admin/login" ||
//     pathname === "/admin/forgot-password" ||
//     pathname === "/admin/reset-password";

//   // Redirect unauthenticated users only for protected routes
//   useEffect(() => {
//     if (status === "unauthenticated" && !isPublicRoute) {
//       router.replace("/admin/login");
//     }
//   }, [status, isPublicRoute, router]);

//   //  Loading state (avoid flicker)
//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   // PUBLIC ROUTES → bypass layout UI completely
//   if (isPublicRoute) {
//     return <>{children}</>;
//   }

//   // PROTECTED ROUTES → require session
//   if (!session) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex bg-background">
//       {/* Sidebar */}
//       <aside className="w-64 border-r bg-sidebar-background flex flex-col">
//         <div className="p-4 border-b">
//           <Link href="/admin/dashboard" className="flex items-center gap-3">
//             <img
//               src="/images/logo.png"
//               alt="Logo"
//               className="w-8 h-8 object-contain"
//             />
//             <div>
//               <span className="font-bold text-sm block">GOOSEBUMPS</span>
//               <span className="text-[10px] text-muted-foreground">
//                 ADMIN PORTAL
//               </span>
//             </div>
//           </Link>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 p-3 space-y-1">
//           {sidebarLinks.map((link) => {
//             const isActive = pathname === link.to;

//             return (
//               <Link
//                 key={link.to}
//                 href={link.to}
//                 className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
//                   isActive
//                     ? "bg-primary/10 text-primary"
//                     : "text-muted-foreground hover:text-foreground"
//                 }`}
//               >
//                 <link.icon className="w-4 h-4" />
//                 {link.label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-3 border-t">
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-muted-foreground hover:text-red-500"
//             onClick={() => signOut({ callbackUrl: "/admin/login" })}
//           >
//             <LogOut className="w-4 h-4 mr-2" />
//             Sign Out
//           </Button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-8">{children}</main>
//     </div>
//   );
// }