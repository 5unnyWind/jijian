"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const Tab = () => {
  const path = usePathname();
  console.log(path);
  const isHome = path === "/home";
  const isBubble = path === "/bubble";
  const isMy = path === "/my";
  return (
    <div className="fixed left-[50%] translate-x-[-50%] bottom-4 bg-tab-bg w-[90%] max-w-[350px] p-2 rounded-full flex justify-between items-center">
      <Link
        href={"/bubble"}
        className={
          isBubble
            ? "flex flex-row text-tab-text bg-[#59BAE7] rounded-full pl-7 pr-7 pt-1.5 pb-1.5"
            : "pl-2"
        }
      >
        <img
          src={isBubble ? "/bubble.svg" : "/bubble_gray.svg"}
          alt=""
          className={"h-[26px]"}
        />
        {isBubble && <div className="leading-[26px] ml-6">泡泡</div>}
      </Link>
      <Link
        href={"/home"}
        className={
          isHome
            ? "flex flex-row rounded-full pl-7 pr-7 pt-1.5 pb-1.5 text-tab-text bg-logo-bg"
            : ""
        }
      >
        <img
          src={isHome ? "/tab_logo.svg" : "/tab_logo_gray.svg"}
          alt=""
          className="h-[26px]"
        />
        {isHome && <div className="leading-[26px] ml-6">极减</div>}
      </Link>
      <Link
        href={"/my"}
        className={
          isMy
            ? "flex flex-row rounded-full pl-7 pr-7 pt-1.5 pb-1.5 text-tab-text bg-[#C59BF9]"
            : "pr-2"
        }
      >
        <img
          src={isMy ? "/my.svg" : "/my_gray.svg"}
          alt=""
          className="h-[26px]"
        />
        {isMy && <div className="leading-[26px] ml-6">我的</div>}
      </Link>
    </div>
  );
};
