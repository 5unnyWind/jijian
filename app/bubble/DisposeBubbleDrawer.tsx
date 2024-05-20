import { forwardRef, useRef, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../lib/Drawer";
import { Textarea } from "../lib/Textarea";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../lib/RadioGroup";
import { Label } from "../lib/Label";
import { Button } from "../lib/Button";
import { useToast } from "../lib/toast/use-toast";

/**
 * 1: 丢弃
 * 2: 二手
 * 3: 赠予
 */
type Disposed_way = 0 | 1 | 2;

const dispose = async (
  item_id: number,
  disposed_way: number,
  moment_sense?: string
) =>
  fetch("/api/dispose_item", {
    method: "POST",
    body: JSON.stringify({ item_id, disposed_way, moment_sense }),
  }).then((res) => res.json());

const DisposeDrawer = forwardRef<
  HTMLButtonElement,
  {
    item_id: number;
    item_name: string;
    triggerElement?: JSX.Element;
    onSuccess?: () => void;
  }
>(({ item_id, item_name, triggerElement = "", onSuccess }, ref) => {
  const [disposed_way, set_disposed_way] = useState(1);
  const [moment_sense, set_moment_sense] = useState("");
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleDispose = () => {
    setLoading(true);
    dispose(item_id, disposed_way, moment_sense).then((res) => {
      res.message &&
        toast({
          title: res.message,
        });
      if (res.success) {
        drawerCloseRef.current?.click();
        onSuccess?.();
      }
      setLoading(false);
    });
  };
  return (
    <Drawer>
      <DrawerTrigger ref={ref} className="w-full">
        {triggerElement}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>戳破一个泡泡?</DrawerTitle>
          <DrawerDescription>
            <span>(弃置一个闲置物品)</span>
            <Image
              className="ml-auto mr-auto"
              src={"/add_bubble_head.svg"}
              alt="add_bubble"
              width={258.82}
              height={174}
            />
          </DrawerDescription>
          <div className="font-semibold flex flex-col items-center">
            <div>
              你要怎么处理
              <span className="text-bubble-primary">{item_name}</span>
            </div>
            <RadioGroup
              onValueChange={(value) => {
                set_disposed_way(+value);
              }}
              defaultValue="1"
              className="grid-cols-3 gap-10 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="option-one" />
                <Label className="accent-bubble-primary" htmlFor="option-one">
                  丢弃
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="option-two" />
                <Label htmlFor="option-two">二手</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="option-three" />
                <Label htmlFor="option-three">赠予</Label>
              </div>
            </RadioGroup>
            <div className="mt-4">记录一下此刻感想？</div>
            <Textarea
              onChange={(e) => {
                set_moment_sense(e.target.value);
              }}
              placeholder={`${item_name}与你之间有什么故事，记录下来吧！`}
            />
            <Button
              onClick={() => {
                handleDispose();
              }}
              disabled={isLoading}
              className="w-full mt-4 bg-bubble-primary hover:bg-bubble-primar hover:opacity-80"
            >
              {isLoading ? "弃置中" : "弃置"}
            </Button>
            <DrawerClose ref={drawerCloseRef} asChild className="w-full mt-2">
              <Button variant="outline">取消</Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

export default DisposeDrawer;
