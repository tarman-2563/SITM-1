import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Admissions } from "../components/sections/Admissions";
import { Programs } from "../components/sections/Programs";
import { Awards } from "../components/sections/Awards";
import { Placements } from "../components/sections/Placements";
import { Contact } from "../components/sections/Contact";
import { Campus } from "../components/sections/Campus";
import { Footer } from "../components/layout/Footer";
import { Reveal } from "../components/common/Reveal";
import { Gallery } from "../components/sections/Gallery";
import { WhySITM } from "../components/sections/WhySITM";
import Mentors from "../components/sections/Mentors";
import StartupFunding from "../components/sections/StartupFunding";
import StudentPlaced from "../components/sections/StudentPlaced";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <Reveal width="100%">
        <Hero />
      </Reveal>
      <Reveal width="100%">
        <WhySITM />
      </Reveal>
      <Reveal width="100%">
        <About />
      </Reveal>
      <Programs />
      <Reveal width="100%">
        <Mentors />
      </Reveal>
      <Reveal width="100%">
        <StartupFunding />
      </Reveal>
      <Reveal width="100%">
        <Placements />
      </Reveal>
      <Reveal width="100%">
        <StudentPlaced />
      </Reveal>
      <Reveal width="100%">
        <Campus />
      </Reveal>
      <Reveal width="100%">
        <Admissions />
      </Reveal>
      <Reveal width="100%">
        <Awards />
      </Reveal>
      <Reveal width="100%">
        <Gallery />
      </Reveal>
      <Reveal width="100%">
        <Contact />
      </Reveal>
      <Footer />
    </div>
  );
}

