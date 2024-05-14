import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const someSql = async () => sql`
  ALTER TABLE users
  ADD CONSTRAINT unique_username UNIQUE (username);  
  `;

  await someSql();
  return NextResponse.json({ message: "done" }, { status: 200 });
}
