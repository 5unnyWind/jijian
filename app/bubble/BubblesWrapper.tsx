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
    <div className="drop-shadow-md fixed left-[50vw] -translate-x-[50%] bottom-0 w-full h-4/5 max-w-[450px]">
      {info.map((item, index) => (
        <Bubble
          key={index}
          position={item.position}
          gif={item.gif}
          text={item.text}
        />
      ))}
    </div>
  );
};

const Bubble = ({
  position,
  gif,
  text,
}: {
  position: [number, number]; // [x,y]
  gif: string;
  text: string;
}) => {
  const [x, y] = position;
  return (
    <div
      className={clsx(
        "absolute",
        Math.random() > 0.5 ? "animate-bounce-slow1" : "animate-bounce-slow2"
      )}
      style={{ left: `${x}px`, bottom: `${y}px` }}
    >
      <Image
        className="opacity-90"
        src={gif}
        height={280}
        width={280}
        alt="bubble"
        unoptimized
      />
      <div className="text-white/90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
        {text || ""}
      </div>
    </div>
  );
};

export default BubblesWrapper;
