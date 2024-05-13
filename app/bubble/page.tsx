import Image from "next/image";

export default function Bubble() {
  return (
    <main className="w-full">
      <Image
        className="mt-20"
        src={"/jijian.svg"}
        height={65}
        width={144}
        alt="极减"
      />
      <Image
        className="ml-auto mt-4"
        src={"/slogan.svg"}
        height={65}
        width={144}
        alt="极减"
      />
      <div className="fixed left-[50vw] -translate-x-[50%] bottom-0 w-full h-4/5 opacity-80 max-w-[450px]">
        <Image
          className="absolute bottom-28 -left-20"
          src={"/bubbles/0.gif"}
          height={280}
          width={280}
          alt="bubble"
        />
        <Image
          className="absolute bottom-10 left-48"
          src={"/bubbles/1.gif"}
          height={280}
          width={280}
          alt="bubble"
        />
        <Image
          className="absolute bottom-60 right-10"
          src={"/bubbles/2.gif"}
          height={280}
          width={280}
          alt="bubble"
        />
      </div>
    </main>
  );
}
