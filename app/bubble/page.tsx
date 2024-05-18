import Image from "next/image";
import BubblesWrapper from "./BubblesWrapper";
import AddBubbleDrawer from "./AddBubbleDrawer";

export default function Page() {
  return (
    <main className="w-full">
      <Image
        className="mt-20 text-pink"
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
        alt="物质极“减” 精神极简"
      />
      <BubblesWrapper />
      <AddBubbleDrawer />
    </main>
  );
}
