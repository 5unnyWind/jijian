"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { zhCN } from "date-fns/locale";
import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/lib/Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={zhCN}
      showOutsideDays={showOutsideDays}
      className={cn(" text-background", className)}
      classNames={{
        months:
          "w-full h-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "w-full h-full",
        caption:
          "w-full p-3 rounded-full bg-foreground flex justify-center  relative items-center",
        caption_label: " text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "hover:rounded-full border-none absolute left-1",
        nav_button_next: "hover:rounded-full border-none absolute right-1",
        table: " rounded-2xl  bg-[#01B875] w-full  space-y-1",
        head_row: "flex justify-around mt-8",
        head_cell: "text-foreground rounded-md w-8 font-semibold text-[0.9rem]",
        row: "flex w-full mt-4 justify-around last:mb-20",
        cell: cn(
          " relative p-0 text-center text-sm focus-within:relative focus-within:z-20   ",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : ""
        ),
        day: cn(
          // buttonVariants({ variant: "ghost" }),
          "bg-[#05AF71] h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: " bg-[#C59BF9] ",
        day_today: " border ",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
