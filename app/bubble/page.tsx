import Image from "next/image";
import BubblesWrapper from "./BubblesWrapper";
import AddBubbleDrawer from "./AddBubbleDrawer";

export default function Page() {
  return (
    <main className="w-full" >
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
      <BubblesWrapper />
      <AddBubbleDrawer />
      
    </main>
  );
}
