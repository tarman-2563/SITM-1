import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence,  useScroll, useTransform  } from "framer-motion";
import { Link } from "react-router-dom";
import { useLeadCapture } from "../../context/LeadCaptureContext";
import { ArrowUpRight, TrendingUp, Users, Cpu, Building, Code, Briefcase, Database, Lightbulb, Layers, Terminal, BarChart3, GraduationCap, X, Rocket, ChevronLeft, ChevronRight } from "lucide-react";

export function Programs() {
  const containerRef = useRef(null);
  const { openApplyNowModal } = useLeadCapture(); // ✅ from leads branch

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);

  const schools = [
    {
      id: "engineering",
      name: "School of Engineering",
      icon: <Rocket className="w-10 h-10" />,
      color: "from-sitm-gold to-sitm-gold",
      programs: [
        {
          title: "Mechanical Engineering",
          desc:
            "Focuses on Robotics, Autos, Thermodynamics, and Advanced Manufacturing. Includes workshops on CNC and 3D Printing.",
          intake: 60,
          duration: "4 Years",
          icon: <Layers />,
        },
        {
          title: "Civil Engineering",
          desc:
            "Studies Structural Engineering, Geotechnical Engineering, and Infrastructure Development.",
          intake: 60,
          duration: "4 Years",
          icon: <Building />,
        },
        {
          title: "Electrical & Electronics Engineering",
          desc:
            "Covers power systems, electrical machines, and control systems with modern lab facilities.",
          intake: 60,
          duration: "4 Years",
          icon: <Lightbulb />,
        },
        {
          title: "Computer Science Engineering",
          desc:
            "Specialization in AI, ML, Data Science, and Software Development.",
          intake: 60,
          duration: "4 Years",
          icon: <Cpu />,
        },
        {
          title: "Electronics & Communication Engineering",
          desc:
            "Focuses on VLSI, IoT, Embedded Systems, and Telecommunication.",
          intake: 60,
          duration: "4 Years",
          icon: <Terminal />,
        },
      ],
    },
    {
      id: "business",
      name: "School of Business Administration",
      icon: <TrendingUp className="w-10 h-10" />,
      color: "from-white to-gray-200",
      programs: [
        {
          title: "Bachelor of Business Administration",
          desc:
            "Developing future business leaders with expertise in finance, marketing, and HR.",
          intake: 40,
          duration: "3 Years",
          icon: <Briefcase />,
        },
      ],
    },
    {
      id: "computer",
      name: "School of Computer Applications",
      icon: <Code className="w-10 h-10" />,
      color: "from-sitm-gold to-sitm-gold",
      programs: [
        {
          title: "Bachelor of Computer Applications",
          desc:
            "A comprehensive course in software development and modern programming.",
          intake: 40,
          duration: "3 Years",
          icon: <Terminal />,
        },
      ],
    },
    {
      id: "data-science",
      name: "School of Applied Data Science",
      icon: <Database className="w-10 h-10" />,
      color: "from-white to-gray-200",
      programs: [
        {
          title: "Data Science",
          desc:
            "Deep dive into statistical modeling, big data analytics, and machine learning.",
          intake: 40,
          duration: "3 Years",
          icon: <BarChart3 />,
        },
      ],
    },
  ];

  const openSchool = (school) => {
    setSelectedSchool(school);
    setCurrentProgramIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedSchool(null);
    document.body.style.overflow = "unset";
  };

  const nextProgram = () => {
    if (selectedSchool && currentProgramIndex < selectedSchool.programs.length - 1) {
      setCurrentProgramIndex(currentProgramIndex + 1);
    }
  };

  const prevProgram = () => {
    if (currentProgramIndex > 0) {
      setCurrentProgramIndex(currentProgramIndex - 1);
    }
  };

  return (
    <section
      id="programs"
      className="py-24 relative bg-gray-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Aurora/Glow Graphics - Different directions from About */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle Geometric Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        ></div>

        {/* Large Graduation Cap Icon - Top Right */}
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] right-[5%] opacity-[0.08] dark:opacity-[0.05]"
        >
          <GraduationCap className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
        </motion.div>

        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#F6E294]/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 70, 0],
            y: [0, -100, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -left-[15%] w-[60%] h-[60%] bg-[#D56B6F]/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 0],
            y: [0, 80, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] right-[20%] w-[55%] h-[55%] bg-[#F6E294]/20 rounded-full blur-[110px]"
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sitm-maroon dark:text-sitm-gold font-bold uppercase tracking-widest text-sm">
            Academic Excellence
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-sitm-navy dark:text-white mt-4">
            Our Specialized Programs
          </h2>
        </motion.div>

        {/* School Grid/Carousel */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll Container */}
          <div className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            <div className="flex gap-6 pb-4">
              {schools.map((school, index) => (
                <motion.button
                  key={school.id}
                  initial={{ 
                    x: 100, 
                    opacity: 0 
                  }}
                  whileInView={{ 
                    x: 0, 
                    opacity: 1 
                  }}
                  viewport={{ once: false }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.1
                  }}
                  onClick={() => openSchool(school)}
                  className="relative min-w-[280px] h-96 rounded-3xl overflow-hidden shadow-xl group border border-white/20 snap-center"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${school.color} group-hover:scale-110 transition-transform duration-700`}
                  />
                  {/* Large Decorative Background Icon */}
                  <div className="absolute top-4 right-2 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-700 rotate-[15deg]">
                    <GraduationCap className="w-48 h-48 text-sitm-navy" strokeWidth={0.5} />
                  </div>
                  <div className="relative z-10 h-full p-8 flex flex-col justify-between text-sitm-navy">
                    <div className="mb-6 bg-white/50 p-4 rounded-2xl w-fit">
                      {school.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-2">
                        {school.name}
                      </h3>
                      <p className="text-sm opacity-80 mb-6">
                        {school.programs.length} Industry-ready programs
                      </p>
                      {/* View Program Button */}
                      <div className="w-full py-3 bg-sitm-navy text-white rounded-full font-bold text-sm uppercase tracking-wider group-hover:bg-sitm-maroon transition-colors duration-300 text-center">
                        View Program
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
            {schools.map((school, index) => (
              <motion.button
                key={school.id}
                initial={{ 
                  x: index < 2 ? -100 : 100, 
                  opacity: 0 
                }}
                whileInView={{ 
                  x: 0, 
                  opacity: 1 
                }}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.8,
                  delay: (index % 2) * 0.2
                }}
                onClick={() => openSchool(school)}
                className="relative h-112 rounded-3xl overflow-hidden shadow-xl group border border-white/20 text-left"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${school.color} group-hover:scale-110 transition-transform duration-700`}
                />
                
                {/* Large Decorative Background Icon */}
                <div className="absolute top-4 right-2 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-700 rotate-[15deg]">
                  <GraduationCap className="w-56 h-56 text-sitm-navy" strokeWidth={0.5} />
                </div>

                {/* Main Card Content */}
                <div className="relative z-10 h-full p-10 flex flex-col justify-between text-sitm-navy">
                  <div className="mb-6 bg-white/50 p-4 rounded-2xl w-fit">
                    {school.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">
                      {school.name}
                    </h3>
                    <p className="text-sm opacity-80 mb-6 font-medium">
                      {school.programs.length} Industry-ready programs
                    </p>
                    {/* View Program Button - Now decorative since whole card is button */}
                    <div className="w-full py-3 bg-sitm-navy text-white rounded-full font-bold text-sm uppercase tracking-wider group-hover:bg-sitm-maroon transition-colors duration-300 text-center shadow-lg">
                      View Programs
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Modal */}
        {createPortal(
          <AnimatePresence>
            {selectedSchool && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-sitm-gold hover:text-sitm-navy transition-colors z-10"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Navigation Arrows */}
                {currentProgramIndex > 0 && (
                  <button
                    onClick={prevProgram}
                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-4 rounded-full bg-white/10 text-white hover:bg-sitm-gold hover:text-sitm-navy transition-colors z-10"
                  >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                )}
                
                {selectedSchool && currentProgramIndex < selectedSchool.programs.length - 1 && (
                  <button
                    onClick={nextProgram}
                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-4 rounded-full bg-white/10 text-white hover:bg-sitm-gold hover:text-sitm-navy transition-colors z-10"
                  >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                )}

                <motion.div 
                  key={currentProgramIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl max-w-6xl w-full h-[70vh] md:h-[50vh] overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Content */}
                  <div className="flex-1 p-6 md:p-12 overflow-y-auto">
                    <h3 className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
                      {
                        selectedSchool.programs[currentProgramIndex]
                          .title
                      }
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-6 md:mb-10">
                      {
                        selectedSchool.programs[currentProgramIndex]
                          .desc
                      }
                    </p>

                    <div className="flex gap-3 md:gap-4 flex-wrap mb-4 md:mb-6">
                      <span className="px-4 md:px-5 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg font-bold text-sm md:text-base">
                        {
                          selectedSchool.programs[currentProgramIndex]
                            .duration
                        }
                      </span>
                      <span className="px-4 md:px-5 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg font-bold text-sm md:text-base">
                        Seats:{" "}
                        {
                          selectedSchool.programs[currentProgramIndex]
                            .intake
                        }
                      </span>
                    </div>

                    {/* Program Navigation Indicator */}
                    {selectedSchool.programs.length > 1 && (
                      <div className="flex gap-2 mt-6 md:mt-8">
                        {selectedSchool.programs.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentProgramIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentProgramIndex 
                                ? 'w-8 bg-sitm-gold' 
                                : 'w-2 bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="md:w-[320px] bg-sitm-navy p-6 md:p-10 text-center flex flex-col justify-center">
                    <ArrowUpRight className="w-10 h-10 md:w-12 md:h-12 text-sitm-gold mx-auto mb-4 md:mb-6" />
                    <h4 className="text-white font-bold text-lg md:text-xl mb-3 md:mb-4">
                      Ready to Apply?
                    </h4>

                    <button
                      onClick={openApplyNowModal}
                      className="mb-3 md:mb-4 py-3 bg-sitm-gold text-sitm-navy font-bold rounded-full uppercase tracking-widest hover:bg-yellow-500 transition-colors text-sm md:text-base"
                    >
                      Apply Now
                    </button>

                    <Link
                      to="/programs"
                      onClick={closeModal}
                      className="text-white/80 text-xs md:text-sm hover:text-white transition-colors"
                    >
                      View Full Syllabus
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
}
