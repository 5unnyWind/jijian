import Image from "next/image";
import Link from "next/link";

export default function List() {
  return (
    <main className=" relative">
      <Link
        className="relative block z-50 bg-white w-8 h-8 p-1 rounded-full shadow-lg "
        href={"/my"}
      >
        <Image src={"/back.svg"} alt="back" width={25} height={25} />
      </Link>
      <Image
        className="-mt-10 -z-50"
        src="/discards_head.png"
        alt="discards_head"
        width={382}
        height={129.3}
      />
      List
      <Item />
      <Item />
      <Item />
    </main>
  );
}

const Item = () => {
  return (
    <div className="flex flex-row justify-between items-center mt-2">
      <div className="flex flex-col">
        <div>丢弃的一个东西</div>
        <div className="text-xs text-gray-500">2024.01.01</div>
        <div className="text-xs text-gray-500">丢弃</div>
      </div>
      <div className="bg-my-primary rounded-lg w-10 h-10"></div>
    </div>
  );
};
