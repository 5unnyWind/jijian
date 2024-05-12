import Image from "next/image";
import Link from "next/link";

export default function Back() {
  return (
    <Link
      className="relative z-50 block bg-white w-8 h-8 p-1 rounded-full shadow-lg "
      href={"/home"}
    >
      <Image src={"/back.svg"} alt="back" width={25} height={25} />
    </Link>
  );
}
