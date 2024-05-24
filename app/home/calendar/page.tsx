import Back from "../Back";
import { Calendar as Calendar_cmp } from "@/app/lib/Calendar";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { Skeleton } from "@/app/lib/Skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/app/lib/Alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { sql } from "@vercel/postgres";
import { getUserId } from "@/app/lib/dal";
import Image from "next/image";

const HOST = process.env.NEXT_PUBLIC_HOST || "";

const getDisposedDates: () => Promise<{
  disposedDates: { disposed_at: string }[];
}> = () =>
  fetch(HOST + "/api/get_disposed_dates", {
    headers: {
      Cookie: cookies().toString(),
    },
  }).then((res) => res.json());

export default function Calendar() {
  return (
    <main className="w-full">
      <Back />
      <div
        className="absolute min-h-screen w-screen left-0 top-0 -z-50 opacity-40"
        style={{
          backgroundImage: `url(/login_bg.png)`,
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

const CalendarWrapper = async () => {
  const userId = await getUserId();
  const result = await sql<{ disposed_at: Date }>`
  SELECT DISTINCT DATE(disposed_at) as disposed_at
  FROM disposed_items
  WHERE user_id = ${userId};`;
  const disposedDates = result.rows.map((row) => row.disposed_at);

  return (
    <Calendar_cmp
      mode="multiple"
      selected={disposedDates}
      // onSelect={setDate}
      className="w-[330px] h-[427px]"
    />
  );
};
