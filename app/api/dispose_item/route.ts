import { NextRequest, NextResponse } from "next/server";

export async function POST(requet: NextRequest) {
  requet.body
  return NextResponse.json({ message: "delete item" }, { status: 200 });
}
