import Image from "next/image";
import Link from "next/link";
import { getUser, getUserId } from "../lib/dal";
import { Suspense } from "react";
import { Skeleton } from "../lib/Skeleton";
import { sql } from "@vercel/postgres";
import { Button } from "../lib/Button";
import { logout } from "../actions/auth";

const DisposedDaysCount = async () => {
  try {
    const userId = await getUserId();
    const result = await sql`
    SELECT DISTINCT DATE(disposed_at) as disposed_date
    FROM disposed_items
    WHERE user_id = ${userId};`;
    return <span className="text-4xl">{result.rowCount}</span>;
  } catch (error) {
    console.log(error);
    return <span></span>;
  }
};

const DisposedItemsCount = async () => {
  try {
    const userId = await getUserId();
    const result = await sql`
    SELECT COUNT(*) as disposed_items_count
    FROM disposed_items
    WHERE user_id = ${userId};`;
    return (
      <span className="text-4xl">{result.rows[0]?.disposed_items_count}</span>
    );
  } catch (error) {
    console.log(error);
    return <span></span>;
  }
};

const UserName = async () => {
  try {
    const user = await getUser();
    return <span>{user?.user_name || ""}</span>;
  } catch (error) {
    console.log(error);
    return <span></span>;
  }
};

export default function Page() {
  return (
    <main className="w-full">
      <div className=" rounded-t-2xl relative -ml-6 w-screen -mt-6 -top-[35px] h-60 -z-20  bg-my-primary ">
        <div className="ml-6 pt-12 relative top-[35px] text-2xl">
          HELLO，
          <Suspense fallback={<Skeleton className="inline-block w-32 h-5 " />}>
            <UserName />
          </Suspense>
        </div>
        <Image
          className="absolute -bottom-[15px]"
          src={"/my_head.png"}
          width={375}
          height={158}
          alt="my_head"
        />
      </div>
      <section className="max-w-[450px] ml-auto mr-auto">
        <div className="flex justify-between items-center mt-0">
          <div className="bg-[#FDC10C] p-4 pl-6 pr-6 rounded-lg text-background-end mr-4">
            <div className="text-xs">你已坚持断舍离天数</div>
            <div className="text-xl font-bold flex items-end justify-between h-[36px]">
              <Suspense
                fallback={
                  <Skeleton className="inline-block w-[50px] h-[36px] " />
                }
              >
                <DisposedDaysCount />
              </Suspense>
              <div className="inline-block -translate-y-0.5">天</div>
            </div>
          </div>
          <div className="bg-[#FDC10C] p-4 pl-6 pr-6 rounded-lg text-background-end">
            <div className="text-xs">你已坚持断舍离件数</div>
            <div className="text-xl font-bold flex items-end justify-between h-[36px]">
              <Suspense
                fallback={
                  <Skeleton className="inline-block w-[50px] h-[36px] " />
                }
              >
                <DisposedItemsCount />
              </Suspense>
              <div className="ml-4 inline-block -translate-y-0.5">件</div>
            </div>
          </div>
        </div>
        <Button asChild className="w-full rounded-full mt-10">
          <Link
            href={"/my/disposed_list"}
            className="hover:opacity-80 flex text-center "
          >
            <span className="ml-auto">查看断舍离清单 </span>
            <Image
              className="ml-auto"
              src={"/arrow.svg"}
              width={21}
              height={10}
              alt="arrow"
            />
          </Link>
        </Button>

        <Button asChild className="w-full rounded-full mt-2">
          <Link href={"/my/about_us"}>关于极减</Link>
        </Button>
        <form action={logout}>
          <Button variant={"destructive"} className="w-full rounded-full mt-2">
            退出登录
          </Button>
        </form>
      </section>
    </main>
  );
}
