import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function Back({
  className,
  href = "/home",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      className={clsx(
        "sticky top-4 z-50 block bg-white w-8 h-8 p-2 rounded-full shadow-lg",
        className
      )}
      href={href}
    >
      <Image src={"/back.svg"} alt="back" width={25} height={25} />
    </Link>
  );
}
