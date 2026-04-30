import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const type = searchParams.get("type") || "all"; // all, posts, users, books
    const limit = parseInt(searchParams.get("limit") || "20");

    if (!query || query.length < 2) {
      return NextResponse.json({
        posts: [],
        users: [],
        books: [],
      });
    }

    const searchTerm = query.toLowerCase();

    const results: any = {};

    // Search posts
    if (type === "all" || type === "posts") {
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { content: { contains: searchTerm, mode: "insensitive" } },
          ],
          published: true,
        },
        include: {
          author: {
            select: { id: true, name: true, avatar: true },
          },
          tags: true,
        },
        orderBy: { createdAt: "desc" },
        take: limit,
      });
      results.posts = posts;
    }

    // Search users
    if (type === "all" || type === "users") {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          bio: true,
        },
        take: limit,
      });
      results.users = users;
    }

    // Search books
    if (type === "all" || type === "books") {
      const books = await prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { author: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        take: limit,
      });
      results.books = books;
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}