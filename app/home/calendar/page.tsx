"use client";
import { Button } from "@/app/lib/Button";
import Back from "../Back";
import { Calendar as Calendar_cmp } from "@/app/lib/Calendar";
import React from "react";

export default function Calendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <main className="w-full">
      <Back />
      <Calendar_cmp
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border inline-block mt-10"
      />
    </main>
  );
}
