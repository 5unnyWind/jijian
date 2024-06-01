import { Badge } from "@/app/lib/Badge";
import { Button } from "@/app/lib/Button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/app/lib/Drawer";
import { getUserId } from "@/app/lib/dal";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { Suspense } from "react";
import PrivacyPolicy from "./PrivacyPolicy";

const ColorText = ({ children }: { children: JSX.Element | string }) => {
  return <span className="text-bubble-primary">{children}</span>;
};

const BackLinkWithCheckNewUser = async () => {
  try {
    const user_id = await getUserId();
    const result = await sql<{
      is_new_user: boolean;
    }>`SELECT is_new_user FROM users WHERE user_Id = ${user_id};`;
    const is_new_user = result.rows[0].is_new_user;
    sql`UPDATE users SET is_new_user = false WHERE user_id = ${user_id};`;
    return (
      <Button asChild className="w-full">
        <Link href={is_new_user ? "/home" : "/my"}>我了解了</Link>
      </Button>
    );
  } catch (error) {
    console.error(error);
    return (
      <Button asChild className="w-full">
        <Link href={"/my"}>我了解了</Link>
      </Button>
    );
  }
};

export default function Page() {
  return (
    <main className="w-full font-semibold space-y-2 max-w-[450px]">
      <div className=" text-3xl font-bold bg-text-gradient text-gradient -mb-6 opacity-40">
        ABOUT
      </div>
      <div className="text-3xl">
        关于极减 <Badge>VER. 1.0</Badge>
      </div>
      <div>
        “极减”的灵感来源于山下英子的作品
        <ColorText>《断舍离》</ColorText>
        。文中提到，“断舍离是一种生活态度和行为方式，旨在通过
        <ColorText>整理和清理</ColorText>
        生活中的物品和信息，从而清理内心空间，提高生活质量。断舍离的含义在于，通过割舍不必要的东西，让人生变得简单、自由和舒适。”
      </div>
      <div>
        <ColorText>物品的存在本身是为了我们更好的生活而服务的</ColorText>
        ，然而，太多时候我们关注的是物质本身的价值，而非对自己的价值。正是因为这种“以物质为评判基础”的观念，导致了我们对自身相同的习惯性思维，导致自身价值被物化。
      </div>
      <div>
        在当下的大环境里，大家都被忙碌的洪流所裹挟前进，心态浮躁无法沉静下来好好整理内心，久而久之这也会影响人们的心理健康。
      </div>
      <div>
        极减给用户提供机会去改变自己当下的境况，希望大家先把外界的物品与信息开始整理，进而才能让大家的心理空间变得舒适。
      </div>
      <div>
        无论是追求
        <ColorText>更多的空间、更多的时间，还是更多的心灵平静</ColorText>
        ，"极减"都是一个有力的工具，帮助用户实现这些目标，让人们的生活回归简单。
      </div>
      <div className="pt-2" />
      <div className="text-xs font-normal opacity-80">
        开始使用即代表你同意
        <Drawer>
          <DrawerTrigger className="underline text-bubble-primary">
            隐私政策及用户协议
          </DrawerTrigger>
          <DrawerContent>
            <div className="h-[60vh] max-w-lg p-2 overflow-auto mx-auto">
              <PrivacyPolicy />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <Suspense
        fallback={
          <Button asChild className="w-full">
            <Link href={"/my"}>我了解了</Link>
          </Button>
        }
      >
        <BackLinkWithCheckNewUser />
      </Suspense>
      <div className="text-xs text-center text-background-end  mt-4 ">
        DEV. tf , UI wj , PM lj
      </div>
    </main>
  );
}
