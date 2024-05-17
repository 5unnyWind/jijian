import { Button } from "@/app/lib/Button";
import Back from "../Back";
import { Calendar as Calendar_cmp } from "@/app/lib/Calendar";
import React from "react";
import { cookies } from "next/headers";

const HOST = process.env.NEXT_PUBLIC_HOST || "";

const getDisposedDates: () => Promise<{
  disposedDates: { disposed_at: string }[];
}> = () =>
  fetch(HOST + "/api/get_disposed_dates", {
    headers: {
      Cookie: cookies().toString(),
    },
  }).then((res) => res.json());

export default async function Calendar() {
  const data = await getDisposedDates();
  const disposedDates = data.disposedDates.map(
    (date) => new Date(date.disposed_at)
  );

  return (
    <main className="w-full">
      <Back />
      <div className="flex flex-col items-center">
        <Calendar_cmp
          mode="multiple"
          selected={disposedDates}
          // onSelect={setDate}
          className="rounded-md border mt-10"
        />
      </div>
    </main>
  );
}
