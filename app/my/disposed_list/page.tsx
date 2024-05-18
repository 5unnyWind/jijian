import { DisposedItem } from "@/app/interface";
import { getUserId } from "@/app/lib/dal";
import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import dayjs from "dayjs";
import { Separator } from "@/app/lib/Separator";
import { Badge } from "@/app/lib/Badge";
import clsx from "clsx";
import { Skeleton } from "@/app/lib/Skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/app/lib/Alert";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <main className=" relative">
      <Link
        className="relative block z-50 bg-white w-8 h-8 p-1 rounded-full shadow-lg "
        href={"/my"}
      >
        <Image src={"/back.svg"} alt="back" width={25} height={25} />
      </Link>
      <Image
        className="-mt-10 -z-50"
        src="/discards_head.png"
        alt="discards_head"
        width={382}
        height={129.3}
      />
      <Suspense
        fallback={
          <>
            <div className="flex flex-row justify-between items-center mt-4">
              <div className="flex flex-col text-md font-semibold">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-3 mt-1" />
                <Skeleton className="w-24 h-3 mt-1" />
              </div>
              <Skeleton className="w-10 h-10" />
            </div>
            <Separator className="mt-1" />
            <div className="flex flex-row justify-between items-center mt-4 opacity-80">
              <div className="flex flex-col text-md font-semibold">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-3 mt-1" />
                <Skeleton className="w-24 h-3 mt-1" />
              </div>
              <Skeleton className="w-10 h-10" />
            </div>
            <Separator className="mt-1" />
            <div className="flex flex-row justify-between items-center mt-4 opacity-60">
              <div className="flex flex-col text-md font-semibold">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-3 mt-1" />
                <Skeleton className="w-24 h-3 mt-1" />
              </div>
              <Skeleton className="w-10 h-10" />
            </div>
            <Separator className="mt-1" />
            <div className="flex flex-row justify-between items-center mt-4 opacity-40">
              <div className="flex flex-col text-md font-semibold">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-3 mt-1" />
                <Skeleton className="w-24 h-3 mt-1" />
              </div>
              <Skeleton className="w-10 h-10" />
            </div>
            <Separator className="mt-1" />
            <div className="flex flex-row justify-between items-center mt-4 opacity-20">
              <div className="flex flex-col text-md font-semibold">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-3 mt-1" />
                <Skeleton className="w-24 h-3 mt-1" />
              </div>
              <Skeleton className="w-10 h-10" />
            </div>
          </>
        }
      >
        <ListWrapper />
      </Suspense>
    </main>
  );
}

const ListWrapper = async () => {
  const user_id = await getUserId();
  const result = await sql<DisposedItem & { item_name: string }>`
  SELECT di.*, ii.item_name
  FROM disposed_items di
  JOIN idle_items ii ON di.item_id = ii.item_id
  WHERE di.user_id = ${user_id};
  `;
  const disposed_list = result.rows.reverse();
  return (
    <>
      {disposed_list.length ? (
        disposed_list.map((item) => <Item key={item.item_id} item={item} />)
      ) : (
        <Link href={"/bubble"}>
          <Alert className="mt-10">
            {/* <RocketIcon className="h-4 w-4" /> */}
            <PlusIcon />
            <AlertTitle>暂无记录</AlertTitle>
            <AlertDescription>去添加泡泡</AlertDescription>
          </Alert>
        </Link>
      )}
    </>
  );
};

const DISPOSED_WAY: { [key: number]: string } = {
  1: "丢弃",
  2: "二手",
  3: "赠予",
};

const Item = ({ item }: { item: DisposedItem & { item_name: string } }) => {
  const { item_name, disposed_at, disposed_way, moment_sense } = item;
  return (
    <>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="flex flex-col text-md font-semibold">
          <div>{item_name}</div>
          <div className="text-xs text-gray-500">
            {dayjs(disposed_at).format("YYYY.MM.DD")}
          </div>
          <div className="text-xs text-gray-500">
            <Badge
              variant={"default"}
              className={clsx(
                disposed_way === 2 && "bg-home-primary",
                disposed_way === 3 && "bg-bubble-primary"
              )}
            >
              {DISPOSED_WAY[disposed_way]}
            </Badge>
          </div>
        </div>
        <div className="text-xs">{moment_sense}</div>
        <div className="bg-my-primary rounded-lg w-10 h-10"></div>
      </div>
      <Separator className="mt-1" />
    </>
  );
};
