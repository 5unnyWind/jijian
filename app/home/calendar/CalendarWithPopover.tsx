"use client";
import { Calendar as Calendar_cmp } from "@/app/lib/Calendar";
import { DisposedData } from "./page";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/lib/Popover";
import dayjs from "dayjs";
import { useRef, useState } from "react";

export default function CalendarWithPopover({
  disposedData,
}: {
  disposedData: DisposedData[];
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [selectedData, setSelectedData] = useState<DisposedData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const disposedDates = disposedData.map((row) => row.disposed_at);
  return (
    <>
      <Calendar_cmp
        mode="multiple"
        selected={disposedDates}
        // onSelect={setDate}
        className="w-[330px] h-[427px]"
        onDayClick={(day) => {
          setSelectedData(
            disposedData.filter((row) =>
              dayjs(row.disposed_at)
                .startOf("day")
                .isSame(dayjs(day).startOf("day"))
            )
          );
          setSelectedDate(day);
          ref.current?.click();
        }}
      />
      <Popover>
        <PopoverTrigger ref={ref}></PopoverTrigger>
        <PopoverContent>
          {selectedData.length !== 0 ? (
            <div>
              你在{dayjs(selectedData[0].disposed_at).format("MM月DD日")}处置了
              {selectedData.map((item, index) => {
                return (
                  <>
                    <span className="text-home-primary">{item.item_name}</span>
                    {index !== selectedData.length - 1 ? "、" : " 。"}
                  </>
                );
              })}
            </div>
          ) : (
            <div>
              {selectedDate ? dayjs(selectedDate).format("MM月DD日") : ""}
              ，你没有处理掉任何闲置哦。
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
