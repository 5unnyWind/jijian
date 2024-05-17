"use client";
import Image from "next/image";
import Back from "../Back";
import RandomDrawerWrapper from "./RandomDrawerWrapper";
import { Item } from "@/app/interface";
import Link from "next/link";
import { getTodayItem, setTodayItem } from "./utils";
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/lib/Skeleton";
import Loading from "@/app/lib/Loading";

const HOST = process.env.NEXT_PUBLIC_HOST;

const getRandomItem: () => Promise<{
  item?: Item;
  success?: boolean;
  error?: string;
}> = async () => fetch(HOST + "/api/get_random_item").then((res) => res.json());

export default function Random() {
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (getTodayItem()) {
      setItem(getTodayItem());
      setLoading(false);
      return;
    } else {
      getRandomItem().then((data) => {
        if (data.success && data.item) {
          setItem(data.item);
          setTodayItem(data.item);
        }
        setLoading(false);
      });
    }
  }, []);

  return (
    <main className="w-full flex flex-col">
      <Back />

      <div className="flex flex-col items-center mt-10 max-w-[450px] mx-auto">
        <div className="text-3xl font-semibold">每天随机“扔”一件</div>
        <div className="mt-2">每天一件，烦恼再见</div>
        <Image
          className="-ml-2"
          src={"/home_random_pic.png"}
          alt="t-shirt"
          width={326}
          height={100}
        />
        {
          <div className="-mt-8 text-xl font-semibold bg-[#FECC01] w-full text-center pt-16 pb-16 rounded-lg">
            {isLoading ? (
              <>
                <Loading className="inline-block" />
                挑选中...
              </>
            ) : (
              item?.item_name || (
                <>
                  暂无物品，去
                  <Link
                    className="underline underline-offset-4 text-blue-400"
                    href={"/bubble"}
                  >
                    添加泡泡
                  </Link>
                  吧！
                </>
              )
            )}
          </div>
        }
        <div className="mt-4"></div>
        {isLoading ? (
          <Skeleton className="w-full rounded-full h-10" />
        ) : (
          item !== undefined &&
          item !== null && <RandomDrawerWrapper item={item} />
        )}
      </div>
    </main>
  );
}
