import { prisma } from "@/lib/prisma";

function getDateRange(type: "today" | "week" | "month") {
  const now = new Date();
  let start = new Date();

  if (type === "today") {
    start.setHours(0, 0, 0, 0);
  } else if (type === "week") {
    start.setDate(now.getDate() - 7);
  } else {
    start.setMonth(now.getMonth() - 1);
  }

  return { start, end: now };
}

export async function GET() {
  try {
    const { start, end } = getDateRange("week");

    // 🔹 Unique Visitors
    const visitors = await prisma.pageView.groupBy({
      by: ["anonymousId"],
      where: {
        createdAt: { gte: start, lt: end },
      },
    });

    // 🔹 Sessions
    const sessions = await prisma.pageView.groupBy({
      by: ["sessionId"],
      where: {
        createdAt: { gte: start, lt: end },
      },
    });

    // 🔹 Page Views
    const pageViews = await prisma.pageView.count({
      where: {
        createdAt: { gte: start, lt: end },
      },
    });

    // 🔹 Top Pages
    const topPages = await prisma.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      where: {
        createdAt: { gte: start, lt: end },
      },
      orderBy: {
        _count: { path: "desc" },
      },
      take: 5,
    });

    // 🔹 Previous period (for growth)
    const prevStart = new Date(start);
    const prevEnd = new Date(start);

    prevStart.setDate(prevStart.getDate() - 7);

    const prevVisitors = await prisma.pageView.groupBy({
      by: ["anonymousId"],
      where: {
        createdAt: { gte: prevStart, lt: prevEnd },
      },
    });

    const growth =
      prevVisitors.length === 0
        ? 100
        : ((visitors.length - prevVisitors.length) /
            prevVisitors.length) *
          100;

    return Response.json({
      visitors: visitors.length,
      sessions: sessions.length,
      pageViews,
      growth: Math.round(growth),
      topPages,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}



// import { prisma } from "@/lib/prisma";

// function getWeek(offset = 0) {
//   const now = new Date();
//   now.setDate(now.getDate() - offset * 7);

//   const year = now.getFullYear();
//   const week = Math.ceil(
//     ((now.getTime() - new Date(year, 0, 1).getTime()) /
//       86400000 +
//       new Date(year, 0, 1).getDay() +
//       1) /
//       7
//   );

//   return `${year}-W${week}`;
// }

// export async function GET() {
//   const thisWeek = getWeek(0);
//   const lastWeek = getWeek(1);

//   const [current, previous] = await Promise.all([
//     prisma.visitor.count({ where: { week: thisWeek } }),
//     prisma.visitor.count({ where: { week: lastWeek } }),
//   ]);

//   const growth =
//     previous === 0 ? 100 : ((current - previous) / previous) * 100;

//   const topPages = await prisma.visitor.groupBy({
//     by: ["path"],
//     _count: { path: true },
//     orderBy: { _count: { path: "desc" } },
//     take: 5,
//   });

//   return Response.json({
//     visitors: {
//       current,
//       previous,
//       growth: Math.round(growth),
//     },
//     topPages,
//   });
// }