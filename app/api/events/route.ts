import { NextResponse } from "next/server";
import { getEvents } from "@/lib/events";

export async function GET() {
  const data = getEvents();
  return NextResponse.json(data);
}