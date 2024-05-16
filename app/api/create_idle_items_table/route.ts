import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(requers: Request) {
  const create_idle_items_table = async () => sql`
  CREATE TABLE idle_items (
    item_id SERIAL PRIMARY KEY,    -- 物品ID，自动递增
    item_name VARCHAR(255) NOT NULL,  -- 物品名称
    item_count INT NOT NULL,            -- 物品数量
    user_id INT NOT NULL,             -- 对应的用户ID
    is_disposed BOOLEAN NOT NULL      -- 是否已处置，使用布尔值表示
);
`;
  try {
    const result = await create_idle_items_table();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
