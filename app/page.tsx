import Link from "next/link";
import { login } from "./actions";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col max-w-[375px] justify-around">
      <div
        className="absolute min-h-screen w-screen left-0 top-0 -z-50 opacity-40"
        style={{
          backgroundImage: `url(/login_bg.png)`,
          backgroundSize: "cover",
        }}
      />
      <section>
        <div className="text-3xl">登录↗</div>
        <div>RELAX YOUR LIFE.</div>
        <form action={login} className="mt-4">
          <input
            type="text"
            placeholder="请输入账号"
            className="bg-transparent outline-none border-2  border-foreground w-full rounded-full p-1 mb-2 pl-4"
          />
          <input
            type="password"
            placeholder="请输入密码"
            className="bg-transparent outline-none border-2  border-foreground w-full rounded-full p-1 mb-2 pl-4"
          />
          <div>
            <button
              type="submit"
              className="w-full bg-foreground text-background-end mt-4 rounded-full p-2 hover:opacity-80"
            >
              登录
            </button>
          </div>
        </form>
      </section>
      <section>
        <Image
          src={"/idle_items.png"}
          height={141.3}
          width={250}
          alt="idle_items"
          className=" text-center w-full"
        />
        <div className="text-center">
          还没有账号？点这里
          <Link href="/enroll" className="text-blue-400">
            注册
          </Link>
        </div>
        <Link href="/home">home</Link>
      </section>
    </main>
  );
}
