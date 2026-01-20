import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Admissions } from "../components/sections/Admissions";
import { Programs } from "../components/sections/Programs";
import { Placements } from "../components/sections/Placements";
import { Contact } from "../components/sections/Contact";
import { Campus } from "../components/sections/Campus";
import { Footer } from "../components/layout/Footer";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Campus />
      <Admissions />
      <Placements />
      <Contact />
      <Footer />
    </div>
  );
}
