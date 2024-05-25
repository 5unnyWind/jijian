import { decrypt } from "@/app/lib/session";
import { db, sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as nostore } from "next/cache";
import { Item } from "@/app/interface";

export async function GET(request: NextRequest) {
  nostore();
  try {
    const session = request.cookies.get("session")?.value;
    if (!session) {
      throw new Error("请登录");
    }
    const userId = (await decrypt(session))?.userId;

    // const client = await db.connect();
    // const seed = (+new Date().getDate() % 20) / 10 - 1;
    // await db.sql`
    // -- 设置种子
    // SELECT setseed(${seed}::double precision);
    // `;
    // const result = await db.sql`
    // -- 随机选择一条记录
    // SELECT * FROM idle_items WHERE user_id = ${userId} AND is_disposed = false
    // ORDER BY random()
    // LIMIT 1;`;
    const result =
      await sql<Item>`SELECT * FROM idle_items WHERE user_id = ${userId} AND is_disposed = false`;
    const seed = +new Date().getDate() % result.rowCount;
    const todayItem = result.rows[seed];
    return NextResponse.json({ success: true, item: todayItem });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
