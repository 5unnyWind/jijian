import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const someSql = async () => sql`
  ALTER TABLE users
  RENAME COLUMN username TO user_name;
  `;

  try {
    const result = await someSql();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
