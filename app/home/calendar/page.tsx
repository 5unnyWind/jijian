import { Button } from "@/app/lib/Button";
import Back from "../Back";
import { Calendar as Calendar_cmp } from "@/app/lib/Calendar";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { Skeleton } from "@/app/lib/Skeleton";

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
      <div className="flex flex-col items-center">
        <Suspense fallback={<Skeleton className="w-[224px] h-[261px]" />}>
          <CalendarWrapper />
        </Suspense>
      </div>
    </main>
  );
}

const CalendarWrapper = async () => {
  const data = await getDisposedDates();
  const disposedDates = data.disposedDates.map(
    (date) => new Date(date.disposed_at)
  );
  return (
    <Calendar_cmp
      mode="multiple"
      selected={disposedDates}
      // onSelect={setDate}
      className="rounded-md border mt-10"
    />
  );
};
