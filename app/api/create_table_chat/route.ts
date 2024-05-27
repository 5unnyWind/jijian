import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await sql`
    CREATE TABLE chat (
      chat_id SERIAL PRIMARY KEY,
      user_id INT,
      user_message TEXT,
      assistant_message TEXT,
      usage VARCHAR(255),
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
