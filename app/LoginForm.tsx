"use client";
import { useFormState, useFormStatus } from "react-dom";
import { LoginFormState, login } from "./actions/auth";
import { useToast } from "./lib/toast/use-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./lib/Button";
import clsx from "clsx";

export const LoginForm = () => {
  const [formState, dispatch] = useFormState<LoginFormState, FormData>(login, {
    errors: {},
    message: null,
    success: false,
  });

  const { toast, dismiss } = useToast();
  const router = useRouter();

  useEffect(() => {
    formState.message &&
      toast({
        variant: formState.success ? "default" : "destructive",
        title: formState.message,
        action:
          formState.message === "用户不存在" ? (
            <Link href={"/enroll"} onClick={() => dismiss()}>
              <Button variant={"ghost"}>去注册</Button>
            </Link>
          ) : undefined,
      });
    if (formState.success) {
      router.replace("/home");
    }
  }, [formState]);
  return (
    <section>
      <div className="mt-10 text-3xl">登录↗</div>
      <div>RELAX YOUR LIFE.</div>
      <form action={dispatch} className="mt-4">
        <input
          name="username"
          type="text"
          placeholder="请输入用户名"
          className="bg-transparent outline-none border-2  border-foreground w-full rounded-full p-1 mb-2 pl-4"
        />
        {/* fix ios 用户名无法输入中文的 bug。一个 input text 跟着一个 input password 会导致第一个框无法输入中文 */}
        <input type="text" className="h-0 w-0" name="no_use" />
        <input
          name="password"
          type="password"
          placeholder="请输入密码"
          className="bg-transparent outline-none border-2  border-foreground w-full rounded-full p-1 mb-2 pl-4"
        />
        <Submit />
      </form>
    </section>
  );
};

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        type="submit"
        aria-disabled={pending}
        disabled={pending}
        className={clsx(
          "w-full bg-foreground text-background-end mt-4 rounded-full p-2 hover:opacity-80"
        )}
      >
        {pending ? "登录中" : "登录"}
      </button>
    </div>
  );
};
