import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const someSql = async () => sql`
  -- 更新idle_items表中的is_disposed字段
  UPDATE idle_items
  SET is_disposed = TRUE
  WHERE item_id = 1;
  `;

  try {
    const result = await someSql();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
