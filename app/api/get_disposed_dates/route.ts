import { decrypt } from "@/app/lib/session";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get("session")?.value;
    const userId = (await decrypt(session))?.userId;
    if (!userId)
      return NextResponse.json({ error: "用户未登录" }, { status: 401 });
    const result = await sql`
    SELECT DISTINCT DATE(disposed_at) as disposed_at
    FROM disposed_items
    WHERE user_id = ${userId};`;
    const disposedDates = result.rows;

    return NextResponse.json({ disposedDates }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "网络错误，稍后再试" }, { status: 500 });
  }
}
