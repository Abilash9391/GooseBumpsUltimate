"use client";

import { useAdminAuth } from "@/components/providers/AdminAuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Settings, LogOut, User, KeyRound, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Posts", path: "/admin/posts", icon: FileText },
  { label: "Security", path: "/admin/security", icon: Shield}
];

const AdminNavbar = () => {
  const { logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <nav className="bg-[hsl(262,40%,18%)] text-[hsl(262,20%,90%)] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              GooseBumps
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200">
              Admin
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button
                  className={cn(
                    "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    "text-[hsl(262,20%,90%)]/70 hover:text-[hsl(262,20%,90%)] hover:bg-white/10",
                    pathname === item.path && "bg-white/10 text-[hsl(262,20%,90%)]"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              </Link>
            ))}
          </div>

          <div className="relative group">
            <button className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-[hsl(262,20%,90%)]/70 hover:text-[hsl(262,20%,90%)] hover:bg-white/10">
              <div className="h-8 w-8 rounded-full bg-purple-500/30 flex items-center justify-center mr-2">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline">{ "Admin"}</span>
              <Settings className="h-4 w-4 ml-2" />
            </button>
            {/* Simple dropdown — replace with your preferred dropdown component */}
            <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border-b">Account</div>
              <Link href="/admin/settings" className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <User className="mr-2 h-4 w-4" /> Account Management
              </Link>
              <Link href="/admin/settings?tab=password" className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <KeyRound className="mr-2 h-4 w-4" /> Change Password
              </Link>
              <div className="border-t" />
              <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;