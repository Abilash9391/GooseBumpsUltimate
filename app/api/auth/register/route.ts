import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Registration is disabled. Contact the site administrator." },
    { status: 405 }
  );
}
