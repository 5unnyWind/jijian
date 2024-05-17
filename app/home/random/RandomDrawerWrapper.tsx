"use client";
import { Item } from "@/app/actions/interface";
import DisposeDrawer from "@/app/bubble/DisposeBubbleDrawer";
import { Button } from "@/app/lib/Button";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getTodayItem, setTodayItem } from "./utils";

const RandomDrawerWrapper = ({ item }: { item: Item }) => {
  const router = useRouter();
  const [isDisposed, setDisposed] = useState(item.is_disposed);

  return (
    <DisposeDrawer
      item_id={item.item_id}
      item_name={item.item_name}
      triggerElement={
        <div
          onClick={(e) => {
            isDisposed && e.preventDefault();
          }}
          className={clsx(
            "p-1 hover:opacity-90 w-full rounded-full bg-foreground text-background-end",
            isDisposed && " opacity-80 "
          )}
        >
          {isDisposed ? "已扔" : "扔！"}
        </div>
      }
      onSuccess={() => {
        setDisposed(true);
        setTodayItem({ ...item, is_disposed: true });
        router.refresh();
      }}
    />
  );
};

export default RandomDrawerWrapper;
