import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request: Request) {
  noStore();
  const list_all_users = async () => sql`
    SELECT id,username,email FROM users;
  `;

  try {
    const result = await list_all_users();
    return NextResponse.json({ result:result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
