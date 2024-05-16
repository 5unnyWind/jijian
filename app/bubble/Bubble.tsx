"use client";

import clsx from "clsx";
import Image from "next/image";
import { useToast } from "../lib/toast/use-toast";
import { mutate } from "swr";

/**
 * 1: 丢弃
 * 2: 二手
 * 3: 赠予
 */
type Disposed_way = 0 | 1 | 2;

const dispose = async (item_id: number, disposed_way: Disposed_way) =>
  fetch("/api/dispose_item", {
    method: "POST",
    body: JSON.stringify({ item_id, disposed_way }),
  }).then((res) => res.json());

const Bubble = ({
  gif,
  text,
  item_id,
}: {
  gif: string;
  text: string;
  item_id: number;
}) => {
  const randomWidth = Math.random() * 100 + 220;
  const randomLeft = Math.random() * 50;
  const randomTop = Math.random() * 100;
  const { toast } = useToast();
  return (
    <div
      onClick={() => {
        dispose(item_id, 1).then((res: any) => {
          if (!res.success) {
            toast({
              title: res.message,
            });
          } else {
            toast({
              title: "✅ 成功戳破一个泡泡",
            });
            mutate("/api/get_items");
          }
        });
      }}
      className={clsx(
        "inline-block relative transition-all duration-300",
        Math.random() > 0.5 ? "animate-bounce-slow1" : "animate-bounce-slow2"
      )}
      style={{ left: `${randomLeft}px`, top: `${randomTop}px` }}
    >
      <Image
        className="opacity-90"
        src={gif}
        height={randomWidth}
        width={randomWidth}
        alt="bubble"
        unoptimized
      />
      <div
        // style={{ width: `${randomWidth}px` }}
        className="text-white/90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold"
      >
        {text || ""}
      </div>
    </div>
  );
};

export default Bubble;
