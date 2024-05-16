"use client";

import { Item } from "../actions/interface";
import Bubble from "./Bubble";
import useSWR from "swr";

const HOST = process.env.NEXT_PUBLIC_HOST;

const fetcher = (url: string) => {

  return fetch(HOST + url, {
    // credentials: "include",
    // cache: "no-cache",
    // headers: {
    //   Cookie: cookies().toString(),
    // },
  }).then((res) => res.json());
};

const BubblesWrapper = () => {
  const { data, error, isLoading } = useSWR<{ items: Item[] }>(
    "/api/get_items",
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error</div>;
  }
  const bubblesInfo: {
    item_id: number;
    gif: string;
    text: string;
  }[] = data.items.map((item, index) => {
    return {
      item_id: item.item_id,
      gif: `/bubbles/${index % 3}.gif`,
      text: item.item_name,
    };
  });

  return (
    <div id="bubbles_wrapper" className="overflow-scroll max-w-[600px] fixed left-[50vw] -translate-x-[50%] top-0 w-[150vw] h-screen">
      <div className="mt-[40vh]"></div>
      {bubblesInfo.map((item, index) => (
        <Bubble key={index} item_id={item.item_id} gif={item.gif} text={item.text} />
      ))}
      <div className="mt-40"></div>
    </div>
  );
};

export default BubblesWrapper;
