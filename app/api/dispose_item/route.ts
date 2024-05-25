import { getUserId } from "@/app/lib/dal";
import { decrypt } from "@/app/lib/session";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function POST(requet: NextRequest) {
  const body = await requet.json();
  const { item_id, disposed_way, moment_sense } = body;
  const user_id = await getUserId();
  if (!user_id) {
    return NextResponse.json({ message: "请登录" }, { status: 401 });
  }
  if (!item_id || !disposed_way) {
    return NextResponse.json(
      { message: "参数错误，稍后再试" },
      { status: 400 }
    );
  }
  try {
    // const client = await db.connect();
    // await client.sql`
    // -- 插入数据到disposed_items表
    // INSERT INTO disposed_items (user_id, item_id, disposed_way, disposed_at)
    // VALUES (${user_id}, ${item_id}, ${disposed_way}, CURRENT_TIMESTAMP);

    // -- 更新idle_items表中的is_disposed字段
    // UPDATE idle_items
    // SET is_disposed = TRUE
    // WHERE item_id = ${item_id};
    // `;

    await Promise.all([
      sql`
    -- 插入数据到disposed_items表
    INSERT INTO disposed_items (user_id, item_id, disposed_way, moment_sense, disposed_at)
    VALUES (${user_id}, ${item_id}, ${disposed_way},${moment_sense}, CURRENT_TIMESTAMP);
    `,
      sql`
    -- 更新idle_items表中的is_disposed字段
    UPDATE idle_items
    SET is_disposed = TRUE
    WHERE item_id = ${item_id};
    `,
    ]);
  } catch (error) {
    console.log("Failed to dispose item", error);
    return NextResponse.json(
      { message: "❌ 网络波动，稍后再试" },
      { status: 500 }
    );
  }
  revalidatePath("/my");
  revalidatePath("/home/calendar");
  return NextResponse.json(
    { message: "✅ 戳破了一个泡泡", success: true },
    { status: 200 }
  );
}
