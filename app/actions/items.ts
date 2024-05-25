"use server";
import { z } from "zod";
import { getUser, verifySession } from "../lib/dal";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export type ActionState = {
  errors?: {};
  message?: string | null;
  success?: boolean;
} | null;
export async function addItem(currentState: ActionState, formData: FormData) {
  try {
    const userId = (await verifySession()).userId;
    if (!userId) {
      return {
        errors: {},
        message: "请登录",
      };
    }
    const schema = z.object({
      item_name: z.string().min(1, { message: "名称不能为空" }),
      item_count: z.string().min(1, { message: "数量不能为空" }),
    });
    const result = schema.safeParse({
      item_name: formData.get("item_name"),
      item_count: formData.get("item_count"),
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
        message: "❌ 请检查信息",
      };
    }
    const data = result.data;
    // 存入idle_items表
    await sql`INSERT INTO idle_items (item_name, item_count, user_id,is_disposed) VALUES (${data.item_name}, ${data.item_count}, ${userId}, false)`;
  } catch (error) {
    console.log("Failed to add item", error);
    return {
      errors: {},
      message: "❌ 添加失败,请稍后再试",
    };
  }

  return {
    errors: {},
    message: "✔️ 添加成功",
    success: true,
  };
}
