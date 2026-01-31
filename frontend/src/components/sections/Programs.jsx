import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
    ArrowUpRight, 
    Cpu, 
    Building, 
    Code, 
    Briefcase, 
    Wrench, 
    Database, 
    TrendingUp, 
    ChevronLeft,
    Lightbulb,
    Layers,
    Terminal,
    BarChart3,
    GraduationCap,
    Users,
    X
} from "lucide-react";

export function Programs() {
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
    const containerRef = useRef(null);

    const schools = [
        // ... (schools data remains the same)
        {
            id: "engineering",
            name: "School of Engineering",
            icon: <Wrench className="w-10 h-10" />,
            color: "from-sitm-navy to-sitm-navy", // Solid Navy
            programs: [
                {
                    title: "Mechanical Engineering",
                    desc: "Focuses on Robotics, Autos, Thermodynamics, and Advanced Manufacturing. Includes workshops on CNC and 3D Printing.",
                    intake: 60,
                    duration: "4 Years",
                    icon: <Layers />
                },
                {
                    title: "Civil Engineering",
                    desc: "Studies Structural Engineering, Geotechnical Engineering, and Infrastructure Development. Field visits to major projects.",
                    intake: 60,
                    duration: "4 Years",
                    icon: <Building />
                },
                {
                    title: "Electrical and Electronics Engineering (EEE)",
                    desc: "Covers power systems, electrical machines, and control systems with modern lab facilities and industry exposure.",
                    intake: 60,
                    duration: "4 Years",
                    icon: <Lightbulb />
                },
                {
                    title: "Computer Science Engineering (CSE)",
                    desc: "Specialization in AI, ML, Data Science, and Software Development. Labs equipped with high-performance clusters.",
                    intake: 60,
                    duration: "4 Years",
                    icon: <Cpu />
                },
                {
                    title: "Electronics and Communication Engineering (ECE)",
                    desc: "Focuses on VLSI, IOT, Embedded Systems, and Telecommunication. Partners with leading tech giants.",
                    intake: 60,
                    duration: "4 Years",
                    icon: <Terminal />
                }
            ]
        },
        {
            id: "business",
            name: "School of Business Administration",
            icon: <TrendingUp className="w-10 h-10" />,
            color: "from-sitm-gold to-sitm-gold", // Solid Gold
            programs: [
                {
                    title: "Bachelor of Business Administration",
                    desc: "Developing future business leaders with expertise in finance, marketing, and human resource management.",
                    intake: 40,
                    duration: "3 Years",
                    icon: <Briefcase />
                }
            ]
        },
        {
            id: "computer",
            name: "School of Computer Applications",
            icon: <Code className="w-10 h-10" />,
            color: "from-sitm-navy to-sitm-navy", // Solid Navy
            programs: [
                {
                    title: "Bachelor of Computer Applications",
                    desc: "A comprehensive course in software development, modern programming, and digital systems management.",
                    intake: 40,
                    duration: "3 Years",
                    icon: <Terminal />
                }
            ]
        },
        {
            id: "data-science",
            name: "School of Applied Data Science",
            icon: <Database className="w-10 h-10" />,
            color: "from-sitm-gold to-sitm-gold", // Solid Gold
            programs: [
                {
                    title: "Data Science",
                    desc: "Deep dive into statistical modeling, big data analytics, and machine learning to drive data-led decision making.",
                    intake: 40,
                    duration: "3 Years",
                    icon: <BarChart3 />
                }
            ]
        }
    ];

    const nextProgram = () => {
        if (!selectedSchool || currentProgramIndex >= selectedSchool.programs.length - 1) return;
        setCurrentProgramIndex((prev) => prev + 1);
    };

    const prevProgram = () => {
        if (!selectedSchool || currentProgramIndex <= 0) return;
        setCurrentProgramIndex((prev) => prev - 1);
    };

    const handleSchoolClick = (school) => {
        setSelectedSchool(school);
        setCurrentProgramIndex(0);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedSchool(null);
        document.body.style.overflow = 'unset';
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariantsLeft = {
        hidden: { 
            opacity: 0, 
            x: -150 
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const itemVariantsRight = {
        hidden: { 
            opacity: 0, 
            x: 150 
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="programs" className="py-24 bg-gray-50 dark:bg-black transition-colors duration-300 relative overflow-hidden min-h-[700px]">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <motion.div 
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span 
                        className="text-sitm-maroon dark:text-sitm-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
                    >
                        Academic Excellence
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold text-sitm-navy dark:text-white mt-2 mb-6 font-serif tracking-tight">
                        Our Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-sitm-navy to-indigo-600 dark:from-white dark:to-sitm-gold">Programs</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-sitm-maroon to-sitm-gold mx-auto rounded-full"></div>
                </motion.div>

                {/* School Grid View */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {schools.map((school, idx) => (
                        <motion.button
                            key={school.id}
                            variants={idx < 2 ? itemVariantsLeft : itemVariantsRight}
                            onClick={() => handleSchoolClick(school)}
                            className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 text-left border border-white/10"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${school.color} transition-all duration-700 group-hover:scale-110`}></div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            <div className="absolute top-0 right-0 p-8">
                                <div className="text-white/10 group-hover:text-white/20 transition-colors duration-500">
                                    <GraduationCap className="w-32 h-32 rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700" />
                                </div>
                            </div>
                            
                            <div className="relative h-full p-10 flex flex-col justify-end text-white z-20">
                                <div className="mb-8 p-5 rounded-[1.5rem] bg-white/15 backdrop-blur-xl border border-white/20 w-fit group-hover:scale-110 group-hover:bg-white group-hover:text-indigo-900 transition-all duration-500 shadow-xl">
                                    {school.icon}
                                </div>
                                <h3 className="text-3xl font-bold font-serif mb-3 leading-[1.1] tracking-tight">
                                    {school.name}
                                </h3>
                                <p className="text-white/80 text-sm mb-8 line-clamp-2 max-w-[200px] font-medium">
                                    Excellence in {school.programs.length} specialized industry-ready programs.
                                </p>
                                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] bg-white/10 w-fit px-6 py-3 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-sitm-navy transition-all duration-300">
                                    Open Programs <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Modal Carousel View */}
                {createPortal(
                    <AnimatePresence>
                        {selectedSchool && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden bg-black/80 backdrop-blur-md"
                            >
                                <button 
                                    onClick={closeModal}
                                    className="absolute top-24 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-sitm-gold hover:text-sitm-navy transition-all duration-300 z-[110] border border-white/10 shadow-xl group"
                                >
                                    <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
                                </button>

                                {/* Carousel Content Container */}
                                <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                                    {/* Navigation Arrows */}
                                    <AnimatePresence>
                                        {currentProgramIndex > 0 && (
                                            <motion.button 
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                onClick={(e) => { e.stopPropagation(); prevProgram(); }}
                                                className="absolute left-0 md:-left-24 z-[110] p-4 text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95 group"
                                            >
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {currentProgramIndex < selectedSchool.programs.length - 1 && (
                                            <motion.button 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                onClick={(e) => { e.stopPropagation(); nextProgram(); }}
                                                className="absolute right-0 md:-right-24 z-[110] p-4 text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95 group"
                                            >
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    {/* The Program Card Component */}
                                    <div className="w-full relative h-[600px] md:h-[550px]">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`${selectedSchool.id}-${currentProgramIndex}`}
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10"
                                            >
                                                {/* Left Area - Content */}
                                                <div className="flex-1 p-10 md:p-16 flex flex-col relative">
                                                    <div className="flex items-start gap-6 mb-10">
                                                        <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-sitm-navy dark:text-sitm-gold border border-gray-100 dark:border-white/10">
                                                            {selectedSchool.programs[currentProgramIndex].icon}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-black text-sitm-maroon uppercase tracking-[0.2em] mb-1">
                                                                {selectedSchool.name}
                                                            </span>
                                                            <span className="text-2xl font-serif font-bold text-sitm-navy dark:text-white/80">
                                                                Prog. {currentProgramIndex + 1}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-sitm-navy dark:text-white mb-8 leading-tight tracking-tight">
                                                        {selectedSchool.programs[currentProgramIndex].title}
                                                    </h3>

                                                    <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed mb-auto max-w-3xl">
                                                        {selectedSchool.programs[currentProgramIndex].desc}
                                                    </p>

                                                    <div className="flex flex-wrap items-center gap-4 mt-12">
                                                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 dark:bg-white/5 text-sitm-navy dark:text-gray-300 text-base font-bold border border-gray-100 dark:border-white/10">
                                                            <GraduationCap className="w-5 h-5 text-sitm-maroon" />
                                                            {selectedSchool.programs[currentProgramIndex].duration}
                                                        </div>
                                                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 dark:bg-white/5 text-sitm-navy dark:text-gray-300 text-base font-bold border border-gray-100 dark:border-white/10">
                                                            <Users className="w-5 h-5 text-sitm-maroon" />
                                                            Seats: {selectedSchool.programs[currentProgramIndex].intake}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Sidebar Area (Navy Box) */}
                                                <div className="md:w-[320px] bg-sitm-navy dark:bg-black p-12 flex flex-col items-center justify-center text-center relative overflow-hidden border-l border-white/5">
                                                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                                        <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                                                    </div>
                                                    
                                                    <div className="relative z-10 w-full">
                                                        <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-10 mx-auto group hover:bg-sitm-gold transition-all duration-500 transform hover:scale-110">
                                                            <ArrowUpRight className="w-10 h-10 text-sitm-gold group-hover:text-sitm-navy" />
                                                        </div>
                                                        <h4 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">Start Your Journey</h4>
                                                        <p className="text-gray-400 text-sm mb-12 leading-relaxed">Download detailed curriculum & career path info.</p>

                                                        <Link to="/programs" onClick={closeModal} className="w-[120%] -ml-[10%] py-5 bg-sitm-gold text-sitm-navy font-black rounded-2xl hover:bg-white transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] block">
                                                            Syllabus 
                                                        </Link>
                                                    </div>

                                                    <div className="mt-12 text-white/30 text-xs font-bold uppercase tracking-widest">
                                                        {currentProgramIndex + 1} / {selectedSchool.programs.length}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </section>
    );
}
