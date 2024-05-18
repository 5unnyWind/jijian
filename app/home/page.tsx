import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import HomeSlogan from "../lib/HomeSlogan";

export default function Home() {
  const info: {
    direction: "ltr" | "rtl";
    title: string;
    icon: string;
    pic: string;
    content: JSX.Element | string;
    href: string;
  }[] = [
    {
      direction: "ltr",
      title: "30天断舍离挑战",
      icon: "/calendar.svg",
      pic: "/home_pic0.svg",
      content: (
        <>
          <div>坚持养成习惯</div>
          <div>用30天正视内心真正的需求</div>
        </>
      ),
      href: "/home/calendar",
    },
    {
      direction: "rtl",
      title: '每天随机"扔"一件',
      icon: "/ask.svg",
      pic: "/home_pic1.svg",
      content: (
        <>
          <div>抛开物品对自身的限制</div>
        </>
      ),
      href: "/home/random",
    },
    {
      direction: "ltr",
      title: "您的私人断舍离助手",
      icon: "/assistant.svg",
      pic: "/home_pic2.svg",
      content: (
        <>
          <div>询问小助手 </div>
          <div>为你进行科学的分析</div>
        </>
      ),
      href: "/home/assistant",
    },
  ];
  return (
    <main className="max-w-[450px] ">
      <div className="-mt-4 self-end">
        <HomeSlogan />
      </div>
      <section className="w-full bg-home-primary rounded-3xl p-2 mt-10 mb-20">
        <div className="-mt-8">
          {info.map((props, index) => (
            <Card key={index} {...props} />
          ))}
        </div>
      </section>
    </main>
  );
}

const Card = ({
  direction = "ltr",
  title,
  icon,
  pic,
  content,
  href,
}: {
  direction: "ltr" | "rtl";
  title: string;
  icon: string;
  pic: string;
  content: JSX.Element | string;
  href: string;
}) => {
  const isRtl = direction === "rtl";
  return (
    <Link href={href} className="hover:drop-shadow-xl">
      <div
        className={clsx(
          "mt-4 relative z-10 w-3/4 bg-foreground rounded-full p-2 pl-4 pr-4 text-background-end flex items-center",
          isRtl && "ml-auto justify-end"
        )}
      >
        {isRtl && <span className="mr-2 text-sm">{title}</span>}
        <Image className="" src={icon} alt={icon} width={16} height={16} />
        {!isRtl && <span className="ml-2 text-sm">{title}</span>}
      </div>
      <div className="-mt-1 flex flex-row bg-background-start p-2 rounded-3xl text-sm items-center justify-between">
        {isRtl && <div className="m-auto">{content}</div>}
        <Image src={pic} width={109} height={102} alt={pic} />
        {!isRtl && <div className="m-auto">{content}</div>}
      </div>
    </Link>
  );
};
