import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const create_table_disposed_items = async () => sql`
  CREATE TABLE disposed_items (
    item_id INT PRIMARY KEY,
    disposed_way INT NOT NULL,
    disposed_at TIMESTAMP NOT NULL,
    user_id INT NOT NULL
  );
`;

  try {
    const result = await create_table_disposed_items();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log("Failed to create table disposed_items", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
