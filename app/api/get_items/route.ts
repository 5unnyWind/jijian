import { getUserId } from "@/app/lib/dal";
import { decrypt } from "@/app/lib/session";
import { sql } from "@vercel/postgres";
import { unstable_noStore as nostore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  nostore();
  try {
    // const session = request.cookies.get("session")?.value;
    // if (!session) {
    //   throw new Error("请登录");
    // }
    // const userId = (await decrypt(session))?.userId;
    const user_id = await getUserId();
    const result = await sql`
    SELECT *
    FROM idle_items
    WHERE user_id = ${user_id} AND is_disposed = false;
    `;
    const items = result.rows;
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.log("Failed to get items", error);
    return NextResponse.json(
      { message: "❌ 获取泡泡失败，请稍后再试" },
      { status: 500 }
    );
  }
}
