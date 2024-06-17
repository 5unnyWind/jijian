"use server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { createSession, deleteSession } from "../lib/session";

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10); // 生成盐值
  const hashedPassword = await bcrypt.hash(password, salt); // 使用生成的盐值哈希密码
  return hashedPassword;
}

// 登录
export type LoginFormState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
  success?: boolean;
};
export async function login(prevState: LoginFormState, formData: FormData) {
  const rawData = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  if (!rawData.username)
    return {
      errors: { username: ["用户名不能为空"] },
      message: "用户名不能为空",
    };
  if (!rawData.password)
    return { errors: { password: ["密码不能为空"] }, message: "密码不能为空" };

  try {
    const getUser = async () => sql`
  SELECT * FROM users WHERE user_name = ${rawData.username};
  `;
    const user = (await getUser()).rows[0];

    if (!user) {
      return {
        message: "用户不存在",
      };
    }

    const match = await bcrypt.compare(rawData.password, user.password_hash);
    if (!match) {
      return {
        message: "密码错误",
      };
    }

    // if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
    //   throw new Error("Token secret not found");
    // const accessToken = jwt.sign(
    //   { sub: user.id, name: user.username },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: "15m" }
    // );
    // const refreshToken = jwt.sign(
    //   { sub: user.id, name: user.username },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "30d" }
    // );

    // cookies().set("access_token", accessToken, {
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 60 * 15,
    // });

    // cookies().set("refresh_token", refreshToken, {
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 30,
    // });

    await createSession(String(user.user_id));
  } catch (error) {
    console.error("error", error);
    return { errors: {}, message: "登录失败，请稍后再试" };
  }

  let is_new_user = false;
  try {
    const result =
      await sql`SELECT is_new_user FROM users WHERE user_name = ${rawData.username};`;
    is_new_user = result.rows[0].is_new_user;
  } catch (error) {
    console.error("error", error);
  }

  if (is_new_user) {
    redirect("/my/about_us");
  }
  redirect("/home");

  // return {
  //   errors: {},
  //   message: "✅登录成功",
  //   success: true,
  // };
}

// 注册
export type EnrollState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function enroll(
  prevState: EnrollState,
  formData: FormData
): Promise<EnrollState> {
  const schema = z
    .object({
      username: z
        .string()
        .min(1, { message: "用户名不能为空" })
        .min(2, { message: "用户名太短了" })
        .max(20, { message: "用户名太长了" }),
      email: z.string().email({ message: "邮箱格式不正确" }).optional(),
      password: z
        .string()
        .min(1, { message: "密码不能为空" })
        .min(6, { message: "密码至少需要6个字符" })
        .max(20, { message: "密码太长了" }),
      confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "两次密码不一致",
      path: ["confirm_password"],
    });
  try {
    const result = schema.safeParse({
      username: formData.get("username"),
      email: formData.get("email") || undefined,
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
        message: "",
      };
    }

    const data = result.data;

    //检查用户名是否已经存在
    const checkUser = async () => sql`
  SELECT * FROM users WHERE user_name = ${data.username};
  `;

    const user = await checkUser();
    if (user.rows.length) {
      return {
        errors: { username: ["用户名已存在"] },
        message: "❌用户名已存在，注册失败",
      };
    }

    const hashedPassword = await hashPassword(data.password);
    const insert = async () => sql`
  INSERT INTO users (user_name, email, password_hash) VALUES (${data.username}, ${data.email}, ${hashedPassword});
  `;

    await insert();
  } catch (error) {
    console.log("error", error);
    return {
      errors: {},
      message: `注册失败，请检查信息或稍后再试 ${error}`,
    };
  }

  // redirect("/");
  return { errors: {}, message: "✅ 注册成功，现在登录吧！", success: true };
}

// 退出登录
export async function logout() {
  deleteSession();
  redirect("/");
}
