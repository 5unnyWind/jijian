import Back from "../../lib/Back";
import React, { Suspense } from "react";
import { Skeleton } from "@/app/lib/Skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/app/lib/Alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { sql } from "@vercel/postgres";
import { getUserId } from "@/app/lib/dal";
import Image from "next/image";
import CalendarWithPopover from "./CalendarWithPopover";

export default function Calendar() {
  return (
    <main className="w-full">
      <Back />
      <div
        className="absolute min-h-screen w-screen left-0 top-0 -z-50 opacity-40"
        style={{
          backgroundImage: `url(/login_bg.avif)`,
          backgroundSize: "cover",
        }}
      />
      <Alert className="mt-10">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>30天断舍离挑战</AlertTitle>
        <AlertDescription>正视需求，清理闲置，点亮日历</AlertDescription>
      </Alert>

      <div className="flex flex-col items-center mt-1 relative">
        <Suspense
          fallback={<Skeleton className="w-[330px] h-[427px] border mt-10" />}
        >
          <Image
            // className="absolute left-72 -top-6"
            className="relative -left-24 top-6 z-30"
            src={"/flower.svg"}
            alt=""
            width={53}
            height={50}
          />
          <CalendarWrapper />
        </Suspense>
      </div>
    </main>
  );
}

export type DisposedData = {
  item_id: number; // 物品ID
  item_name: string; // 物品名称
  item_count: number; // 物品数量
  disposed_way: string; // 处置方式
  disposed_at: Date; // 处置时间
};
const CalendarWrapper = async () => {
  const userId = await getUserId();
  const result = await sql<DisposedData>`
  SELECT di.item_id,
       ii.item_name,
       ii.item_count,
       di.disposed_way,
       di.disposed_at
  FROM disposed_items di
  JOIN idle_items ii ON di.item_id = ii.item_id
  WHERE di.user_id = ${userId};`;
  const data = result.rows;

  return <CalendarWithPopover disposedData={data} />;
};
