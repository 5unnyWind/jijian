"use client";

import clsx from "clsx";
import Image from "next/image";
import { useToast } from "../lib/toast/use-toast";
import { mutate } from "swr";



const Bubble = ({
  gif,
  item_name,
  item_id,
  onClick,
}: {
  gif: string;
  item_name: string;
  item_id: number;
  onClick: () => void;
}) => {
  const randomWidth = Math.random() * 100 + 220;
  const randomLeft = Math.random() * 50;
  const randomTop = Math.random() * 100;
  const { toast } = useToast();
  return (
    <div
      onClick={onClick}
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
        {item_name || ""}
      </div>
    </div>
  );
};

export default Bubble;
