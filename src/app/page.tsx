import { InkCursor } from "@/components/providers/InkCursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cover } from "@/components/sections/Cover";
import { Footer } from "@/components/sections/Footer";
import { MissionControl } from "@/components/sections/MissionControl";
import { Player } from "@/components/sections/Player";
import { Street } from "@/components/sections/Street";
import { TopBar } from "@/components/sections/TopBar";
import { Underground } from "@/components/sections/Underground";

/** Hatched gutter strip between chapters. */
const Gutter = () => <div aria-hidden="true" className="hatch h-4 border-y-3 border-ink" />;

export default function Home() {
  return (
    <SmoothScroll>
      <InkCursor />
      <TopBar />
      {/* 2xl: reserve the fixed chapter rail's width so shelves clip beside it, not under it */}
      <main id="main" className="2xl:pl-14">
        <Cover />
        <Gutter />
        <Street />
        <Underground />
        <Player />
        <Gutter />
        <MissionControl />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
