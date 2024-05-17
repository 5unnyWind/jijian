"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/lib/Avatar";
import Back from "../Back";
import { Input } from "@/app/lib/Input";
import { Button } from "@/app/lib/Button";
import Image from "next/image";
import { useToast } from "@/app/lib/toast/use-toast";

export default function Assistant() {
  const { toast } = useToast();
  return (
    <main className=" w-full">
      <Back />
      <div className="flex justify-center items-center">
        <Avatar>
          <AvatarImage src="/ai.webp" alt="@shadcn" />
          <AvatarFallback>助</AvatarFallback>
        </Avatar>
        <span className="ml-2 text-lg font-semibold">小助手</span>
      </div>
      <div className="mt-8 flex flex-col max-w-[450px] mx-auto">
        <span className="bg-[#EBEBEB] p-3 mr-10 rounded-xl mt-4 text-black">
          您好，我是您的私人断舍离助手。可以询问我任何您纠结是否要断舍离的物品，我会给予您最科学的建议。
        </span>
        <span className="self-end bg-home-primary p-3 rounded-xl mt-4 text-background">
          我收集的快递盒子要扔掉吗？
        </span>
      </div>
      <div className="fixed bottom-10 flex w-11/12 items-center space-x-2 drop-shadow-lg max-w-[450px] left-1/2 -translate-x-1/2">
        <Input className="rounded-full p-3 h-12" />
        <Button
          onClick={() => {
            toast({ title: "🤖 需要提供 API KEY" });
          }}
          className="w-12 h-8 p-2 rounded-full absolute right-2 top-1/2 -translate-y-1/2"
        >
          <Image
            className="mt-1"
            src={"/send.svg"}
            alt="send"
            width={22}
            height={22}
          />
        </Button>
      </div>
    </main>
  );
}
