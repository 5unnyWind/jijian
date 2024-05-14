import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "./LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-[80vh] flex-col max-w-[450px] justify-between">
      <div
        className="absolute min-h-screen w-screen left-0 top-0 -z-50 opacity-40"
        style={{
          backgroundImage: `url(/login_bg.png)`,
          backgroundSize: "cover",
        }}
      />
      <LoginForm />
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
      </section>
    </main>
  );
}
