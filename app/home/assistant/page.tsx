"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/lib/Avatar";
import Back from "../../lib/Back";
import { Input } from "@/app/lib/Input";
import { Button } from "@/app/lib/Button";
import Image from "next/image";
import { useToast } from "@/app/lib/toast/use-toast";
import { useEffect, useRef, useState } from "react";
import remarkBreaks from "remark-breaks";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

export type Message = {
  role: "system" | "assistant" | "user";
  content: string;
};

export default function Assistant() {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setGenerating] = useState(false);
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (isGenerating) return;
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      toast({ title: "还没输入内容呢" });
      inputRef.current?.focus();
      return;
    }
    setGenerating(true);
    inputRef.current.value = "";
    const preMessages = [
      ...messages,
      { role: "user", content: inputValue } as Message,
    ];
    setMessages([
      ...preMessages,
      { role: "assistant", content: "(正在输入中...)" },
    ]);
    try {
      const res = await fetch(location.origin + "/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: preMessages,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      let curAnswer = "";
      // read stream
      const reader = res.body?.getReader();
      if (!reader) {
        return;
      }
      const decoder = new TextDecoder("utf-8");
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          setMessages([
            ...preMessages,
            { role: "assistant", content: curAnswer },
          ]);
          break;
        }
        curAnswer += decoder.decode(value);

        setMessages([
          ...preMessages,
          { role: "assistant", content: curAnswer + "_" },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages([
        ...preMessages,
        { role: "assistant", content: "网络不稳定，生成失败，一会儿再试试吧" },
      ]);
    }
    setGenerating(false);
  };

  return (
    <main className=" w-full">
      <Back />
      <div className="w-full -mt-6 text-center mx-auto text-lg font-semibold">
        神奇小助手
      </div>
      <div className={clsx("mt-8 mb-20 flex flex-col max-w-[450px] mx-auto ")}>
        <div className="flex items-end">
          <AssistantAvatar />
          <ReactMarkdown className="bg-[#EBEBEB] p-3 ml-2 mr-10 rounded-xl mt-4 text-black">
            你好，很高兴能成为你的私人断舍离助手。如果你有任何关于如何整理、处理或重新利用你的闲置物品的问题，随时可以问我。我们一起让生活变得更加简单和有序吧！
          </ReactMarkdown>
        </div>
        {messages.map((message, index) => (
          <MessageEl
            key={index}
            {...message}
            className={clsx(
              isGenerating && index === messages.length - 1 && "animate-pulse"
            )}
          />
        ))}
      </div>
      {/* 空 div 作为滚动锚点 */}
      <div ref={endOfMessagesRef} />
      <div className=" fixed bottom-3 flex w-11/12 items-center space-x-2 drop-shadow-lg max-w-[450px] left-1/2 -translate-x-1/2">
        <Input
          ref={inputRef}
          className="rounded-full p-3 h-12 bg-background"
          placeholder='例如：“棉质短袖一般穿多久要扔掉？"'
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button
          disabled={isGenerating}
          ref={buttonRef}
          onClick={handleSubmit}
          className={clsx(
            "w-12 h-8 p-2 rounded-full absolute right-2 top-1/2 -translate-y-1/2",
            isGenerating && "opacity-80"
          )}
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

const MessageEl = ({
  role,
  content,
  className,
}: Message & { className?: string }) => {
  return (
    <div className={clsx("flex items-end", role === "user" && "self-end")}>
      {role === "assistant" && <AssistantAvatar />}
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        className={clsx(
          "p-3 mt-4 rounded-xl",
          role === "assistant" && "bg-[#EBEBEB] ml-2 mr-10 text-black",
          role === "user" && "bg-home-primary text-background mr-2",
          className
        )}
      >
        {content.replaceAll("\\n", "\n")}
      </ReactMarkdown>
      {role === "user" && <UserAvatar />}
    </div>
  );
};

const picCounts = 6;
const UserRamdon = Math.floor(Math.random() * (picCounts - 1) + 1);
const AssistantRamdon = (UserRamdon % picCounts) + 1;
const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src={`/palworld0${UserRamdon}.webp`} alt="user" />
      <AvatarFallback>我</AvatarFallback>
    </Avatar>
  );
};
const AssistantAvatar = () => {
  return (
    <Avatar>
      <AvatarImage
        className="-scale-x-100"
        src={`/palworld0${AssistantRamdon}.webp`}
        alt="assistant"
      />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
};
