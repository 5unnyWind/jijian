"use client";

import { Item } from "../interface";
import Bubble from "./Bubble";
import useSWR, { mutate } from "swr";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import DisposeDrawer from "./DisposeBubbleDrawer";
import clsx from "clsx";
import { useToast } from "../lib/toast/use-toast";

// const HOST = process.env.NEXT_PUBLIC_HOST || "";

const BubblesWrapper = () => {
  const [host, setHost] = useState<string>("");

  const fetcher = useCallback(
    (url: string) => {
      // if (!host) return Promise.resolve({ items: [] });
      return fetch(host + url, {
        credentials: "include",
      }).then((res) => res.json());
    },
    [host]
  );

  const { data, error, isLoading } = useSWR<{
    items: Item[];
    message?: string;
  }>("/api/get_items", fetcher);

  useEffect(() => {
    setHost(window?.location?.origin || "");
    // mutate("/api/get_items");
  }, []);

  const [selectItem, setSelectItem] = useState<number | null>(null);

  const drawerTrigerRef = useRef<HTMLButtonElement>(null);

  const bubblesInfo:
    | {
        item_id: number;
        gif: string;
        item_name: string;
      }[]
    | undefined = useMemo(() => {
    return data?.items?.map((item, index) => {
      return {
        item_id: item.item_id,
        gif: `/bubbles/${index % 3}.gif`,
        item_name: item.item_name,
      };
    });
  }, [data]);

  const Bubbles = useMemo(() => {
    return bubblesInfo?.map((item, index) => (
      <Bubble
        key={index}
        item_id={item.item_id}
        gif={item.gif}
        item_name={item.item_name}
        onClick={() => handleBubbleClick(item.item_id)}
      />
    ));
  }, [data]);
  const { toast } = useToast();

  useEffect(() => {
    data?.message && toast({ title: data.message });
  }, [data]);

  // if (error || !data) {
  //   return <div>Error</div>;
  // }

  const handleBubbleClick = (item_id: number) => {
    flushSync(() => {
      setSelectItem(item_id);
    });
    drawerTrigerRef.current?.click();
  };

  return (
    <>
      <div
        className={clsx(
          "glow w-3/4 h-[0px] left-1/2 -translate-x-1/2 absolute -bottom-10 transition-opacity duration-1000 ",
          isLoading ? "opacity-100" : "opacity-0"
        )}
      />
      {!isLoading && bubblesInfo?.length !== 0 && (
        <div className="animate-pulse-3times opacity-0 text-sm">
          泡泡🫧可以戳破！
        </div>
      )}
      <div
        id="bubbles_wrapper"
        className={clsx(
          "overflow-scroll max-w-[600px] fixed left-[50vw] -translate-x-[50%] w-[150vw] h-screen transition-all ease-out duration-1000",
          isLoading ? "top-[100vh]" : "top-0"
        )}
      >
        <div className="mt-[40vh]"></div>
        {Bubbles || ""}
        <div className="mt-40"></div>
      </div>
      <DisposeDrawer
        item_id={selectItem!}
        item_name={
          bubblesInfo?.find((item) => item.item_id === selectItem)?.item_name ||
          ""
        }
        ref={drawerTrigerRef}
        onSuccess={() => {
          mutate("/api/get_items", {
            items: data?.items?.filter((item) => item.item_id !== selectItem),
          });
        }}
      />
    </>
  );
};

export default BubblesWrapper;
