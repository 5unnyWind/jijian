import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/");
  }

  return { isAuth: true, userId: String(session.userId) };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data =
      await sql`SELECT user_id,user_name,email FROM users WHERE id = ${session.userId}; `;

    const user = data.rows[0];

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});

export const getUserId = cache(async () => {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);
  if (!session || !payload) {
    return null;
  }
  return payload.userId;
});
