import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request: Request) {
  noStore();
  const create_table_users = async () => sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      user_name VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255),
      password_hash CHAR(60) NOT NULL
    );
  `;

  try {
    const result = await create_table_users();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
