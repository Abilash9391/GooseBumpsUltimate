"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Trophy,
  Image as ImageIcon,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/posts", label: "Posts", icon: FileText },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/player-stories", label: "Player Stories", icon: Users },
  { to: "/admin/team-stories", label: "Team Stories", icon: Trophy },
  { to: "/admin/images", label: "Image Gallery", icon: ImageIcon },
  { to: "/admin/security", label: "Security", icon: Shield },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-sidebar-background flex flex-col">
      <div className="p-4 border-b">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <img src="/images/logo.png" className="w-8 h-8" />
          <div>
            <span className="font-bold text-sm block">GOOSEBUMPS</span>
            <span className="text-[10px] text-muted-foreground">
              ADMIN PORTAL
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.to;

          return (
            <Link
              key={link.to}
              href={link.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-red-500"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}