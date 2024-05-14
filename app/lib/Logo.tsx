"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const Logo = () => {
  const path = usePathname();
  const pathDepth = path.split("/").filter((p) => p).length;
  const showLogo = pathDepth <= 1 && path !== "/enroll";
  return (
    <div
      className={clsx(
        "self-start transition-all ease-in-out duration-500 z-[999]",
        !showLogo && "-translate-y-16"
      )}
    >
      <img src="/logo.svg" alt="" />
    </div>
  );
};
