import Image from "next/image";
import clsx from "clsx";
import { cookies } from "next/headers";
import { Item } from "../actions/interface";

const getItems = async () => {
  const res = await fetch(process.env.URL + "/api/get_items", {
    // credentials: "include",
    // cache: "no-cache",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const data: { items: Item[] } = await res.json();
  return data;
};

const BubblesWrapper = async () => {
  const data = await getItems();
  const bubblesInfo: {
    gif: string;
    text: string;
  }[] = data.items.map((item, index) => {
    return {
      gif: `/bubbles/${index % 3}.gif`,
      text: item.item_name,
    };
  });

  return (
    <div className="overflow-scroll max-w-[600px] fixed left-[50vw] -translate-x-[50%] top-0 w-[150vw] h-screen">
      <div className="mt-[40vh]"></div>
      {bubblesInfo.map((item, index) => (
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
