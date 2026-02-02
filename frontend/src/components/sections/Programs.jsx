import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLeadCapture } from "../../context/LeadCaptureContext";
import {
  ArrowUpRight,
  Cpu,
  Building,
  Code,
  Briefcase,
  Database,
  TrendingUp,
  Lightbulb,
  Layers,
  Terminal,
  BarChart3,
  GraduationCap,
  Users,
  X,
  Rocket,
} from "lucide-react";

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

  return (
    <section
      id="programs"
      className="py-24 relative bg-gray-50 dark:bg-slate-950 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <span className="text-sitm-maroon dark:text-sitm-gold font-bold uppercase tracking-widest text-sm">
            Academic Excellence
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-sitm-navy dark:text-white mt-4">
            Our Specialized Programs
          </h2>
        </div>

        {/* School Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {schools.map((school) => (
            <button
              key={school.id}
              onClick={() => openSchool(school)}
              className="relative h-112 rounded-3xl overflow-hidden shadow-xl group border border-white/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${school.color} group-hover:scale-110 transition-transform duration-700`}
              />
              <div className="relative z-10 h-full p-10 flex flex-col justify-end text-sitm-navy">
                <div className="mb-6 bg-white/50 p-4 rounded-2xl w-fit">
                  {school.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2">
                  {school.name}
                </h3>
                <p className="text-sm opacity-80">
                  {school.programs.length} Industry-ready programs
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {createPortal(
          <AnimatePresence>
            {selectedSchool && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-sitm-gold hover:text-sitm-navy"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-6xl w-full overflow-hidden flex flex-col md:flex-row">
                  {/* Content */}
                  <div className="flex-1 p-12">
                    <h3 className="text-4xl font-serif font-bold mb-6">
                      {
                        selectedSchool.programs[currentProgramIndex]
                          .title
                      }
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-10">
                      {
                        selectedSchool.programs[currentProgramIndex]
                          .desc
                      }
                    </p>

                    <div className="flex gap-4 flex-wrap">
                      <span className="px-5 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg font-bold">
                        {
                          selectedSchool.programs[currentProgramIndex]
                            .duration
                        }
                      </span>
                      <span className="px-5 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg font-bold">
                        Seats:{" "}
                        {
                          selectedSchool.programs[currentProgramIndex]
                            .intake
                        }
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="md:w-[320px] bg-sitm-navy p-10 text-center flex flex-col justify-center">
                    <ArrowUpRight className="w-12 h-12 text-sitm-gold mx-auto mb-6" />
                    <h4 className="text-white font-bold text-xl mb-4">
                      Ready to Apply?
                    </h4>

                    <button
                      onClick={openApplyNowModal}
                      className="mb-4 py-3 bg-sitm-gold text-sitm-navy font-bold rounded-full uppercase tracking-widest"
                    >
                      Apply Now
                    </button>

                    <Link
                      to="/programs"
                      onClick={closeModal}
                      className="text-white/80 text-sm hover:text-white"
                    >
                      View Full Syllabus
                    </Link>
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
