import Image from "next/image";
import Link from "next/link";

export default function My() {
  return (
    <main className="w-full">
      <div className="relative -ml-6 w-screen -mt-6 -top-[35px] h-60 -z-20  bg-my-primary ">
        <div className="ml-6 pt-12 relative top-[35px] text-2xl">
          HELLO，悲伤的荷包蛋
        </div>
        <Image
          className="absolute -bottom-[15px]"
          src={"/my_head.png"}
          width={375}
          height={158}
          alt="my_head"
        />
      </div>
      <section className="max-w-[450px] ml-auto mr-auto">
        <div className="flex justify-around items-center mt-0">
          <div className="bg-[#FDC10C] p-3 rounded-lg text-background-end mr-4">
            <div className="text-xs">你已坚持断舍离天数</div>
            <div className="text-xl font-bold ">
              <span className="text-4xl">20</span>
              <div className="ml-4 inline-block -translate-y-0.5">天</div>
            </div>
          </div>
          <div className="bg-[#FDC10C] p-3 rounded-lg text-background-end">
            <div className="text-xs">你已坚持断舍离件数</div>
            <div className="text-xl font-bold ">
              <span className="text-4xl">55</span>
              <div className="ml-4 inline-block -translate-y-0.5">件</div>
            </div>
          </div>
        </div>
        <Link
          href={"/my/discards_list"}
          className="hover:opacity-80 flex mt-4 text-center p-2 w-full bg-foreground text-background-end rounded-full"
        >
          <span className="ml-auto">查看断舍离清单</span>
          <Image
            className="ml-auto"
            src={"/arrow.svg"}
            width={21}
            height={10}
            alt="arrow"
          />
        </Link>
      </section>
    </main>
  );
}
