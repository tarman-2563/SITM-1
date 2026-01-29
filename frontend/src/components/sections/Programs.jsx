import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, Users, Cpu, Building, Code, Briefcase } from "lucide-react";

export function Programs() {
    const containerRef = useRef(null);

    const programs = [
        {
            title: "Computer Science & Engineering",
            desc: "Focuses on AI, ML, Data Science, and Software Development. Our labs are equipped with high-performance computing clusters.",
            intake: 60,
            duration: "4 Years",
            color: "var(--color-sitm-navy)",
            icon: <Cpu />
        },
        {
            title: "Electronics & Communication",
            desc: "Covers VLSI, IOT, Embedded Systems, and Telecommunication. Partners with leading telecom giants for internships.",
            intake: 60,
            duration: "4 Years",
            color: "var(--color-sitm-maroon)",
            icon: <Users />
        },
        {
            title: "Mechanical Engineering",
            desc: "Deals with Robotics, Autos, Thermodynamics, and Manufacturing. Includes workshops on CNC and 3D Printing.",
            intake: 60,
            duration: "4 Years",
            color: "var(--color-sitm-navy)",
            icon: <Briefcase />
        },
        {
            title: "Civil Engineering",
            desc: "Studies Structural Engineering, Geotech, and Infrastructure Development. Field visits to major construction projects.",
            intake: 60,
            duration: "4 Years",
            color: "var(--color-sitm-maroon)",
            icon: <Building />
        },
        {
            title: "Bachelor of Computer Application",
            desc: "A foundational course in computer applications, software development, and modern programming languages.",
            intake: 40,
            duration: "3 Years",
            color: "var(--color-sitm-navy)",
            icon: <Code />
        },
        {
            title: "Business Administration (BBA)",
            desc: "Developing future managers with skills in finance, marketing, and human resource management.",
            intake: 40,
            duration: "3 Years",
            color: "var(--color-sitm-gold)",
            icon: <TrendingUp />
        }
    ];

    return (
        <section id="programs" className="py-24 bg-gray-50 dark:bg-black transition-colors duration-300 relative">
            {/* AI Background Pattern - 60/20/12/8 Refined */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-sitm-navy/10 rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-sitm-maroon/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-sitm-navy/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-sitm-gold/10 rounded-full blur-2xl"></div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-24">
                    <span className="text-sitm-gold font-serif italic text-lg dark:text-sitm-gold">Academic Excellence</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">Our Programs</h2>
                    <div className="w-24 h-1 bg-sitm-maroon mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Each program is designed to build a strong foundation for your future career.
                    </p>
                </div>

                {/* Sticky Card Stack Container */}
                <div ref={containerRef} className="flex flex-col gap-10 pb-20">
                    {programs.map((program, index) => {
                        // Calculate sticky top position so they stack nicely with a small offset
                        const topOffset = 100 + (index * 20);

                        return (
                            <Card
                                key={index}
                                program={program}
                                index={index}
                                topOffset={topOffset}
                                total={programs.length}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function Card({ program, index, topOffset, total }) {
    return (
        <div
            className="sticky top-0 h-[500px] w-full max-w-5xl mx-auto"
            style={{
                top: `${topOffset}px`,
                marginBottom: `${50}px`, // Spacing between cards when scrolling
                zIndex: index
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`
                    relative h-full w-full 
                    bg-white dark:bg-slate-900 
                    rounded-3xl shadow-2xl shadow-sitm-navy/10 
                    border border-gray-100 dark:border-slate-800
                    overflow-hidden
                    flex flex-col md:flex-row
                `}
            >
                {/* Left Side: Number & Info */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
                    <div className="absolute top-6 left-6 text-[8rem] md:text-[12rem] font-bold text-gray-50 dark:text-slate-800/50 -z-10 select-none font-serif leading-none">
                        0{index + 1}
                    </div>

                    <div className="flex items-center gap-6 mb-8">
                        <span className="text-6xl md:text-7xl font-serif font-bold text-sitm-maroon dark:text-sitm-gold opacity-90">
                            {index + 1}
                        </span>
                        <div className="w-16 h-16 rounded-full bg-sitm-navy/5 flex items-center justify-center text-sitm-navy dark:text-sitm-gold border border-sitm-navy/10">
                            {program.icon}
                        </div>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-sitm-navy dark:text-white mb-6 leading-tight">
                        {program.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                        {program.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <span className="px-5 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-sitm-navy dark:text-gray-300 text-sm font-bold uppercase tracking-wider">
                            {program.duration}
                        </span>
                        <span className="px-5 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-sitm-navy dark:text-gray-300 text-sm font-bold uppercase tracking-wider">
                            Intake: {program.intake}
                        </span>
                    </div>
                </div>

                {/* Right Side: Visual / CTA */}
                <div className="w-full md:w-1/3 bg-sitm-navy dark:bg-slate-950 p-8 flex flex-col items-center justify-center text-center border-l border-gray-100 dark:border-slate-800">
                    <div className="mb-6 p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                        <ArrowUpRight className="w-12 h-12 text-sitm-gold" />
                    </div>
                    <h4 className="text-white text-xl font-bold mb-2">Ready to Apply?</h4>
                    <p className="text-gray-400 text-sm mb-8">View the detailed syllabus and curriculum structure.</p>

                    <Link to="/programs" className="px-8 py-3 bg-sitm-gold text-sitm-navy font-bold rounded-full hover:bg-white transition-colors duration-300 uppercase tracking-widest text-sm">
                        View Syllabus
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
