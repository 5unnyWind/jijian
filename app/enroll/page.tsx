"use client";
import Link from "next/link";
import { EnrollState, enroll } from "../actions/atuh";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { useToast } from "../lib/toast/use-toast";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function Enroll() {
  const [state, dispatch] = useFormState<EnrollState, FormData>(enroll, {
    errors: {},
    message: null,
  });
  const router = useRouter();
  const { toast } = useToast();
  console.log("state", state);
  useEffect(() => {
    state.message &&
      toast({
        variant: state.success ? "default" : "destructive",
        title: state.message,
      });
    state.success && router.replace("/");
  }, [state]);

  return (
    <main className="flex min-h-[80vh] flex-col max-w-[450px] justify-between w-full">
      <div
        className="absolute min-h-screen w-screen left-0 top-0 -z-50 opacity-40"
        style={{
          backgroundImage: `url(/login_bg.png)`,
          backgroundSize: "cover",
        }}
      />
      <div className="-mt-[35px]"></div>
      <Link
        className="relative z-50 block bg-white w-8 h-8 p-1 rounded-full shadow-lg "
        href={"/"}
      >
        <Image src={"/back.svg"} alt="back" width={25} height={25} />
      </Link>
      <section>
        <div className="mt-10 text-3xl">注册↗</div>
        <div>RELAX YOUR LIFE.</div>
        <form action={dispatch} className="mt-4">
          <input
            name="username"
            type="text"
            placeholder="用户名：至少两位，中英文皆可"
            className="bg-transparent outline-none border-2 border-foreground w-full rounded-full p-1 pl-4"
            aria-describedby="username-error"
          />
          <div id="username-error" aria-live="polite" aria-atomic="true">
            <p className="pl-4 text-xs text-red-500">
              {state.errors?.username?.[0]}
            </p>
          </div>
          <input
            name="email"
            placeholder="邮箱：可选，用于找回密码"
            className="mt-2 bg-transparent outline-none border-2  border-foreground w-full rounded-full p-1 pl-4"
            aria-describedby="email-error"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            <p className="pl-4 text-xs text-red-500">
              {state.errors?.email?.[0]}
            </p>
          </div>
          <div className=" mt-1 "></div>
          <input
            name="password"
            type="password"
            placeholder="密码：至少8位"
            className="mt-2 bg-transparent outline-none border-2  border-foreground w-full rounded-full p-1 pl-4"
            aria-describedby="password-error"
          />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            <p className="pl-4 text-xs text-red-500">
              {state.errors?.password?.[0]}
            </p>
          </div>

          <input
            name="confirm_password"
            type="password"
            placeholder="确认密码：再输入一次"
            className="mt-2 bg-transparent outline-none border-2  border-foreground w-full rounded-full p-1 mb-2 pl-4"
            aria-describedby="confirm_password-error"
          />
          <div
            id="confirm_password-error"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="pl-4 text-xs text-red-500">
              {state.errors?.confirm_password?.[0]}
            </p>
          </div>
          <Submit />
        </form>
      </section>
      <Image
        src={"/idle_items.png"}
        height={141.3}
        width={250}
        alt="idle_items"
        className="opacity-80 text-center w-full"
      />
    </main>
  );
}

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
        {pending ? "注册中" : "注册"}
      </button>
    </div>
  );
};
