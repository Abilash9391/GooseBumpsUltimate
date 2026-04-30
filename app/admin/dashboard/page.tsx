"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Trophy,
  Image as ImageIcon,
} from "lucide-react";

const contentCards = [
  {
    title: "Events",
    icon: Calendar,
    desc: "Manage events, tournaments, and competitions.",
    count: "12 events",
    to: "/admin/events",
  },
  {
    title: "Player Stories",
    icon: Users,
    desc: "Manage player impact stories and testimonials.",
    count: "8 stories",
    to: "/admin/player-stories",
  },
  {
    title: "Team Stories",
    icon: Trophy,
    desc: "Manage team achievements and collective stories.",
    count: "5 stories",
    to: "/admin/team-stories",
  },
  {
    title: "Image Gallery",
    icon: ImageIcon,
    desc: "Manage image galleries and photo collections.",
    count: "Gallery",
    to: "/admin/images",
  },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  const [analytics, setAnalytics] = useState<any>(null);

  
  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then(setAnalytics)
      .catch(console.error);
  }, []);

  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back {session?.user?.name}
          </p>
        </div>

        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Logout
        </Button>
      </div>

      {/* =========================
          ANALYTICS STATS (REAL)
      ========================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Page Views */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Page Views (Unique)
              </span>
              <Eye className="h-5 w-5 text-primary" />
            </div>

            <div className="text-3xl font-bold">
              {analytics?.visitors?.current ?? 0}
            </div>

            <p
              className={`text-xs mt-1 ${
                analytics?.visitors?.growth >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {analytics?.visitors?.growth >= 0 ? "+" : ""}
              {analytics?.visitors?.growth ?? 0}% vs last week
            </p>
          </CardContent>
        </Card>

        {/* New Users */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                New Users
              </span>
              <Users className="h-5 w-5 text-primary" />
            </div>

            <div className="text-3xl font-bold">
              {analytics?.users?.newThisWeek ?? 0}
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              This week
            </p>
          </CardContent>
        </Card>

        {/* Placeholder cards (future metrics) */}
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-2">
              Engagement
            </div>
            <div className="text-3xl font-bold">—</div>
            <p className="text-xs text-muted-foreground mt-1">
              Coming soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-2">
              Growth
            </div>
            <div className="text-3xl font-bold">—</div>
            <p className="text-xs text-muted-foreground mt-1">
              Coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      {/* =========================
          CONTENT MANAGEMENT
      ========================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Content Management
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentCards.map((card) => (
            <Card
              key={card.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <card.icon className="w-5 h-5 text-primary" />
                  {card.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {card.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {card.count}
                  </span>

                  <Button size="sm" asChild>
                    <Link href={card.to}>Manage</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* =========================
          RECENT ACTIVITY
      ========================= */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {[
              { text: "New post published", time: "2m ago" },
              { text: "User registered", time: "1h ago" },
              { text: "New comments", time: "3h ago" },
              { text: "Backup completed", time: "1d ago" },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{activity.text}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   FileText,
//   Users,
//   Eye,
//   TrendingUp,
//   Calendar,
//   Trophy,
//   Image as ImageIcon,
// } from "lucide-react";

// const stats = [
//   { label: "Total Posts", value: "24", icon: FileText, change: "+3 this week" },
//   { label: "Total Users", value: "156", icon: Users, change: "+12 this month" },
//   { label: "Page Views", value: "2.4k", icon: Eye, change: "+18% vs last week" },
//   { label: "Engagement", value: "68%", icon: TrendingUp, change: "+5% vs last month" },
// ];

// const contentCards = [
//   {
//     title: "Events",
//     icon: Calendar,
//     desc: "Manage events, tournaments, and competitions.",
//     count: "12 events",
//     to: "/admin/events",
//   },
//   {
//     title: "Player Stories",
//     icon: Users,
//     desc: "Manage player impact stories and testimonials.",
//     count: "8 stories",
//     to: "/admin/player-stories",
//   },
//   {
//     title: "Team Stories",
//     icon: Trophy,
//     desc: "Manage team achievements and collective stories.",
//     count: "5 stories",
//     to: "/admin/team-stories",
//   },
//   {
//     title: "Image Gallery",
//     icon: ImageIcon,
//     desc: "Manage image galleries and photo collections.",
//     count: "Gallery",
//     to: "/admin/images",
//   },
// ];

// export default function AdminDashboard() {
//   const { data: session, status } = useSession();

//   // 🔥 Loading state
//   if (status === "loading") {
//     return <p className="p-6">Loading...</p>;
//   }

//   return (
//     <div className="space-y-8 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//           <p className="text-muted-foreground mt-1">
//             Welcome back {session?.user?.name}
//           </p>
//         </div>

//         {/* Logout */}
//         <Button
//           variant="destructive"
//           onClick={() => signOut({ callbackUrl: "/admin/login" })}
//         >
//           Logout
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => (
//           <Card key={stat.label} className="hover:shadow-lg transition-shadow">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-muted-foreground">
//                   {stat.label}
//                 </span>
//                 <stat.icon className="h-5 w-5 text-primary" />
//               </div>
//               <div className="text-3xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground mt-1">
//                 {stat.change}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Content */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">
//           Content Management
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {contentCards.map((card) => (
//             <Card key={card.title} className="hover:shadow-lg transition-shadow">
//               <CardHeader className="pb-2">
//                 <CardTitle className="flex items-center gap-2 text-base">
//                   <card.icon className="w-5 h-5 text-primary" />
//                   {card.title}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   {card.desc}
//                 </p>

//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-muted-foreground">
//                     {card.count}
//                   </span>

//                   <Button size="sm" asChild>
//                     <Link href={card.to}>Manage</Link>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Activity */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div className="space-y-4">
//             {[
//               { text: "New post published", time: "2m ago" },
//               { text: "User registered", time: "1h ago" },
//               { text: "New comments", time: "3h ago" },
//               { text: "Backup completed", time: "1d ago" },
//             ].map((activity, i) => (
//               <div key={i} className="flex items-center gap-3 text-sm">
//                 <div className="h-2 w-2 rounded-full bg-primary" />
//                 <span>{activity.text}</span>
//                 <span className="ml-auto text-xs text-muted-foreground">
//                   {activity.time}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }