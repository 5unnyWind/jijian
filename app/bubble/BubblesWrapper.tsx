import Image from "next/image";
import { cn } from "../lib/utils";

const BubblesWrapper = () => {
  const info: {
    position: [number, number];
    gif: string;
    text: string;
  }[] = [
    {
      position: [-20, 10],
      gif: "/bubbles/0.gif",
      text: "小时候穿的衬衫",
    },
    {
      position: [48, 10],
      gif: "/bubbles/1.gif",
      text: "初中课本",
    },
    {
      position: [10, 60],
      gif: "/bubbles/2.gif",
      text: "旧电视机",
    },
  ];
  return (
    <div className="fixed left-[50vw] -translate-x-[50%] bottom-0 w-full h-4/5 opacity-80 max-w-[450px]">
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
  const className = cn(
    "absolute",
    x >= 0 ? `left-${x}` : `-left-${Math.abs(x)}`,
    y >= 0 ? `bottom-${y}` : `-bottom-${Math.abs(y)}`
  );
  console.log(className);
  return (
    <div className={className}>
      <Image src={gif} height={280} width={280} alt="bubble" unoptimized />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
        {text || ""}
      </div>
    </div>
  );
};

export default BubblesWrapper;
