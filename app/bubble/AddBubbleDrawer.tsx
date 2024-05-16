"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/lib/Drawer";
import { Button } from "../lib/Button";
import Image from "next/image";
import { Input } from "../lib/Input";
import { Label } from "../lib/Label";
import { useActionState, useEffect, useRef } from "react";
import { ActionState, addItem } from "../actions/items";
import { useToast } from "../lib/toast/use-toast";
import { useFormState, useFormStatus } from "react-dom";
import { mutate } from "swr";

export default function AddBubbleDrawer() {
  return (
    <Drawer>
      <DrawerTrigger className="">
        <div className=" z-30 absolute right-6 bottom-28 rounded-full p-3  bg-[#212121] hover:bg-[#212121]/80">
          <Image src={"/plus.svg"} alt="plus" width={25} height={25} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>添加一个泡泡?</DrawerTitle>
          <DrawerDescription>
            <Image
              className="ml-auto mr-auto"
              src={"/add_bubble_head.svg"}
              alt="add_bubble"
              width={258.82}
              height={174}
            />
          </DrawerDescription>
        </DrawerHeader>
        <AddBubbleForm />
        {/* <DrawerFooter></DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}

const AddBubbleForm = () => {
  const { toast } = useToast();
  const ref = useRef<HTMLButtonElement>(null);
  const [state, formAction] = useFormState<ActionState, FormData>(
    addItem,
    null
  );

  useEffect(() => {
    state?.message &&
      toast({
        title: state.message,
      });
    if (state?.success) {
      ref.current?.click();
      mutate("/api/get_items").then(() => {
        const bubblesWrapper = document.getElementById("bubbles_wrapper");
        bubblesWrapper?.scroll({
          behavior: "smooth",
          // 滚动到底部
          top: bubblesWrapper.scrollHeight,
        });
      });
    }
  }, [state]);

  return (
    <div className="p-2 pl-6 pr-6">
      <form action={formAction}>
        <Label htmlFor="item_name">名称</Label>
        <Input
          className="pl-8"
          style={{
            background:
              'url("/add_bubble_name_icon.svg") no-repeat scroll 9px 9px',
          }}
          name="item_name"
          placeholder="请输入物品名称"
        />
        {/* 数量 */}
        <Label htmlFor="item_count">数量</Label>
        <Input
          className="pl-8"
          style={{
            background:
              'url("/add_bubble_count_icon.svg") no-repeat scroll 12px 12px',
          }}
          name="item_count"
          placeholder="请输入数量"
        />
        <Submit />
        <DrawerClose ref={ref} asChild className="w-full mt-2 mb-2">
          <Button variant="outline">取消</Button>
        </DrawerClose>
      </form>
    </div>
  );
};

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className="w-full mt-4 bg-bubble-primary hover:bg-bubble-primar hover:opacity-80"
    >
      {pending ? "添加中" : "添加"}
    </Button>
  );
};
