import { Aurora } from "@/components/providers/Aurora";
import { Cursor } from "@/components/providers/Cursor";
import { CursorGlow } from "@/components/providers/CursorGlow";
import { CursorTrail } from "@/components/providers/CursorTrail";
import { EntryGate } from "@/components/providers/EntryGate";
import { GateProvider } from "@/components/providers/GateProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Navbar } from "@/components/sections/Navbar";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <GateProvider>
        <SmoothScroll>
          <EntryGate />
          <Aurora />
          <CursorGlow />
          <CursorTrail />
          <Cursor />
          <Navbar />
        <main>
          <Hero />
          <hr className="hr-glow" />
          <About />
          <hr className="hr-glow" />
          <Journey />
          <hr className="hr-glow" />
          <Skills />
          <hr className="hr-glow" />
          <Projects />
          <hr className="hr-glow" />
          <TechStack />
          <hr className="hr-glow" />
          <Experience />
          <hr className="hr-glow" />
          <Education />
          <hr className="hr-glow" />
          <Achievements />
          <hr className="hr-glow" />
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
    </GateProvider>
  );
}
