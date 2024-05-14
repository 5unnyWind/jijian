"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const Tab = () => {
  const path = usePathname();
  const isHome = path === "/home";
  const isBubble = path === "/bubble";
  const isMy = path === "/my";
  const showTab = isHome || isBubble || isMy;
  return (
    <div className={clsx("z-50 fixed left-[50%] translate-x-[-50%]  bg-tab-bg w-[90%] max-w-[350px] p-2 rounded-full flex justify-between items-center transition-all  duration-500",showTab?"bottom-4":'-bottom-[50px]')}>
      <Link
        href={"/bubble"}
        className={
          isBubble
            ? "flex flex-row text-tab-text bg-bubble-primary rounded-full pl-7 pr-7 pt-1.5 pb-1.5"
            : "pl-2"
        }
      >
        <Image
          src={isBubble ? "/bubble.svg" : "/bubble_gray.svg"}
          alt="bubble"
          width={26}
          height={26}
          className="h-[26px]"
        />
        {isBubble && <div className="leading-[26px] ml-6">泡泡</div>}
      </Link>
      <Link
        href={"/home"}
        className={
          isHome
            ? "flex flex-row rounded-full pl-7 pr-7 pt-1.5 pb-1.5 text-tab-text bg-home-primary"
            : ""
        }
      >
        <Image
          src={isHome ? "/tab_logo.svg" : "/tab_logo_gray.svg"}
          alt="home"
          width={26}
          height={26}
        />
        {isHome && <div className="leading-[26px] ml-6">极减</div>}
      </Link>
      <Link
        href={"/my"}
        className={
          isMy
            ? "flex flex-row rounded-full pl-7 pr-7 pt-1.5 pb-1.5 text-tab-text bg-my-primary"
            : "pr-2"
        }
      >
        <Image
          src={isMy ? "/my.svg" : "/my_gray.svg"}
          alt="my"
          width={26}
          height={26}
        />
        {isMy && <div className="leading-[26px] ml-6">我的</div>}
      </Link>
    </div>
  );
};
