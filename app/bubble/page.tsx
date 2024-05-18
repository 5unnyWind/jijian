import BubblesWrapper from "./BubblesWrapper";
import AddBubbleDrawer from "./AddBubbleDrawer";
import JijianSVG from "../lib/JijianSVG";
import JijianSloganSVG from "../lib/JijianSloganSVG";

export default function Page() {
  return (
    <main className="w-full">
      <div className="mt-20" />
      <JijianSVG />
      <div className="text-end mt-4">
        <JijianSloganSVG />
      </div>
      <BubblesWrapper />
      <AddBubbleDrawer />
    </main>
  );
}
