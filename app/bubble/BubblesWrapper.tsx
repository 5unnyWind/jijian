"use client";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "../lib/Button";

const BubblesWrapper = () => {
  const info: {
    position: [number, number];
    gif: string;
    text: string;
  }[] = [
    {
      position: [-80, 40],
      gif: "/bubbles/0.gif",
      text: "小时候穿的衬衫",
    },
    {
      position: [200, 40],
      gif: "/bubbles/1.gif",
      text: "初中课本",
    },
    {
      position: [40, 240],
      gif: "/bubbles/2.gif",
      text: "旧电视机",
    },
  ];
  return (
    <div className="overflow-scroll max-w-[600px] fixed left-[50vw] -translate-x-[50%] top-0 w-[150vw] h-screen">
      <div className="mt-[40vh]"></div>
      {info.map((item, index) => (
        <Bubble key={index} gif={item.gif} text={item.text} />
      ))}
      <div className="mt-40"></div>
    </div>
  );
};

const Bubble = ({ gif, text }: { gif: string; text: string }) => {
  const randomWidth = Math.random() * 100 + 220;
  const randomLeft = Math.random() * 50;
  const randomTop = Math.random() * 100;
  return (
    <div
      className={clsx(
        "inline-block relative",
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
      <div className="text-ellipsis text-white/90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
        {text || ""}
      </div>
    </div>
  );
};

export default BubblesWrapper;
