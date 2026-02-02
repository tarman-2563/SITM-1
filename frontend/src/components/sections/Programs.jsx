import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLeadCapture } from "../../context/LeadCaptureContext";
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  Cpu,
  Building,
  Code,
  Briefcase,
} from "lucide-react";

export function Programs() {
  const containerRef = useRef(null);
  const { openApplyNowModal } = useLeadCapture();

  const programs = [
    {
      title: "Computer Science & Engineering",
      desc: "Focuses on AI, ML, Data Science, and Software Development. Our labs are equipped with high-performance computing clusters.",
      intake: 60,
      duration: "4 Years",
      icon: <Cpu />,
    },
    {
      title: "Electronics & Communication",
      desc: "Covers VLSI, IOT, Embedded Systems, and Telecommunication. Partners with leading telecom giants for internships.",
      intake: 60,
      duration: "4 Years",
      icon: <Users />,
    },
    {
      title: "Mechanical Engineering",
      desc: "Deals with Robotics, Autos, Thermodynamics, and Manufacturing. Includes workshops on CNC and 3D Printing.",
      intake: 60,
      duration: "4 Years",
      icon: <Briefcase />,
    },
    {
      title: "Civil Engineering",
      desc: "Studies Structural Engineering, Geotech, and Infrastructure Development. Field visits to major construction projects.",
      intake: 60,
      duration: "4 Years",
      icon: <Building />,
    },
    {
      title: "Bachelor of Computer Application",
      desc: "A foundational course in computer applications, software development, and modern programming languages.",
      intake: 40,
      duration: "3 Years",
      icon: <Code />,
    },
    {
      title: "Business Administration (BBA)",
      desc: "Developing future managers with skills in finance, marketing, and human resource management.",
      intake: 40,
      duration: "3 Years",
      icon: <TrendingUp />,
    },
  ];

  return (
    <section
      id="programs"
      className="py-24 bg-gray-50 dark:bg-black transition-colors duration-300 relative"
    >
      {/* Background accents */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-sitm-navy/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-sitm-maroon/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-sitm-navy/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-sitm-gold/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-24">
          <span className="text-sitm-gold font-serif italic text-lg">
            Academic Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">
            Our Programs
          </h2>
          <div className="w-24 h-1 bg-sitm-maroon mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Each program is designed to build a strong foundation for your
            future career.
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col gap-10 pb-20">
          {programs.map((program, index) => {
            const topOffset = 100 + index * 20;

            return (
              <Card
                key={index}
                program={program}
                index={index}
                topOffset={topOffset}
                onApply={openApplyNowModal}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({ program, index, topOffset, onApply }) {
  return (
    <div
      className="sticky h-[500px] w-full max-w-5xl mx-auto"
      style={{
        top: `${topOffset}px`,
        marginBottom: "50px",
        zIndex: index,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="relative h-full w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-sitm-navy/10 border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="absolute top-6 left-6 text-[8rem] md:text-[12rem] font-bold text-gray-50 dark:text-slate-800/50 -z-10 font-serif">
            0{index + 1}
          </div>

          <div className="flex items-center gap-6 mb-8">
            <span className="text-6xl md:text-7xl font-serif font-bold text-sitm-maroon dark:text-sitm-gold">
              {index + 1}
            </span>
            <div className="w-16 h-16 rounded-full bg-sitm-navy/5 flex items-center justify-center text-sitm-navy dark:text-sitm-gold border border-sitm-navy/10">
              {program.icon}
            </div>
          </div>

          <h3 className="text-3xl md:text-5xl font-serif font-bold text-sitm-navy dark:text-white mb-6">
            {program.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-lg">
            {program.desc}
          </p>

          <div className="flex gap-4 flex-wrap">
            <span className="px-5 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm font-bold">
              {program.duration}
            </span>
            <span className="px-5 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm font-bold">
              Intake: {program.intake}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/3 bg-sitm-navy dark:bg-slate-950 p-8 flex flex-col items-center justify-center text-center border-l border-gray-100 dark:border-slate-800">
          <div className="mb-6 p-4 rounded-full bg-white/5 border border-white/10">
            <ArrowUpRight className="w-12 h-12 text-sitm-gold" />
          </div>

          <h4 className="text-white text-xl font-bold mb-2">
            Ready to Apply?
          </h4>
          <p className="text-gray-400 text-sm mb-6">
            Start your application or explore the syllabus.
          </p>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={onApply}
              className="px-6 py-3 bg-sitm-gold text-sitm-navy font-bold rounded-full hover:bg-white transition-colors uppercase tracking-widest text-sm"
            >
              Apply Now
            </button>

            <Link
              to="/programs"
              className="px-6 py-2 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              View Syllabus
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
