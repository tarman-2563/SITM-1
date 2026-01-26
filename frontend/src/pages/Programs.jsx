import { motion } from "framer-motion";
import { PageHeader } from "../components/common/PageHeader";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ArrowRight, BookOpen, Clock, Users, Award, Briefcase, Code, Terminal, Database, Cpu } from "lucide-react";

export function Programs() {
  const departments = [
    { 
      id: "cse",
      title: "Computer Science & Engineering", 
      desc: "Prepare for the digital future with our cutting-edge CSE program. Promoting research and innovation in AI, ML, and Data Science.",
      icon: <Terminal className="w-8 h-8" />,
      features: ["AI & Machine Learning Lab", "Cloud Computing Center", "Industry-led Hackathons"],
      stats: { students: "240+", faculty: "20+", placements: "95%" },
      color: "from-blue-500 to-indigo-600"
    },
    { 
      id: "ece",
      title: "Electronics & Communication", 
      desc: "Master the convergence of hardware and software. Specializations in VLSI, IoT, and Embedded Systems.",
      icon: <Cpu className="w-8 h-8" />,
      features: ["VLSI Design Lab", "IoT Research Hub", "Robotics Workshop"],
      stats: { students: "180+", faculty: "15+", placements: "92%" },
      color: "from-purple-500 to-pink-600"
    },
    { 
      id: "me",
      title: "Mechanical Engineering", 
      desc: "The broadest engineering discipline. Focus on thermodynamics, fluid mechanics, and advanced manufacturing.",
      icon: <Briefcase className="w-8 h-8" />,
      features: ["CNC Machining Lab", "CAD/CAM Studio", "Automotive Workshop"],
      stats: { students: "120+", faculty: "12+", placements: "88%" },
      color: "from-orange-500 to-red-600"
    },
    { 
      id: "ce",
      title: "Civil Engineering", 
      desc: "Build the infrastructure of tomorrow. Expertise in structural engineering, geoinformatics, and sustainable construction.",
      icon: <BuildingIcon className="w-8 h-8" />,
      features: ["Surveying Lab", "Geotech Engineering", "Material Testing"],
      stats: { students: "120+", faculty: "12+", placements: "85%" },
      color: "from-emerald-500 to-teal-600"
    },
     { 
      id: "bca",
      title: "Bachelor of Computer Application", 
      desc: "A gateway to the world of software development. Learn modern programming languages and application design.",
      icon: <Code className="w-8 h-8" />,
      features: ["Web Development", "App Development", "Software Engineering"],
      stats: { students: "120+", faculty: "10+", placements: "90%" },
      color: "from-indigo-500 to-violet-600"
    },
     { 
      id: "bba",
      title: "Business Administration", 
      desc: "Developing future leaders. Comprehensive curriculum covering finance, marketing, and human resource management.",
      icon: <Award className="w-8 h-8" />,
      features: ["Case Studies", "Industry Visits", "Entrepreneurship Cell"],
      stats: { students: "120+", faculty: "10+", placements: "88%" },
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <PageHeader title="Academic Programs" subtitle="Innovate. Create. Lead." />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-12">
            {departments.map((dept, i) => (
                <DepartmentCard key={i} dept={dept} index={i} />
            ))}
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-20 bg-sitm-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-6">Start Your Journey Today</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Applications are open for the upcoming academic session. Secure your spot in one of the region's premier technical institutes.</p>
            <div className="flex justify-center gap-4">
                <a href="/#admissions" className="px-8 py-4 bg-sitm-gold text-sitm-navy font-bold rounded-full hover:bg-white transition-all transform hover:scale-105">
                    Apply Now
                </a>
                <a href="/#contact" className="px-8 py-4 bg-transparent border border-sitm-gold text-sitm-gold font-bold rounded-full hover:bg-sitm-gold/10 transition-all">
                    Contact Admissions
                </a>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function DepartmentCard({ dept, index }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500"
        >
            <div className="grid md:grid-cols-12 h-full">
                {/* Visual Side */}
                <div className={`md:col-span-4 bg-gradient-to-br ${dept.color} p-8 flex flex-col justify-between text-white relative overflow-hidden`}>
                     <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                     <div className="relative z-10">
                         <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/30">
                            {dept.icon}
                         </div>
                         <h3 className="text-3xl font-serif font-bold leading-tight mb-2">{dept.title}</h3>
                         <div className="h-1 w-12 bg-white/50 rounded-full"></div>
                     </div>
                     <div className="relative z-10 mt-8">
                         <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                            <Clock className="w-4 h-4" />
                            <span>4 Year B.Tech / 3 Year B.Sc</span>
                         </div>
                     </div>
                </div>

                {/* Content Side */}
                <div className="md:col-span-8 p-8 md:p-10 flex flex-col justify-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dept.desc}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 className="text-sm font-bold text-sitm-navy dark:text-sitm-gold uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Award className="w-4 h-4" /> Key Features
                            </h4>
                            <ul className="space-y-2">
                                {dept.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sitm-maroon dark:bg-sitm-gold"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                             <h4 className="text-sm font-bold text-sitm-navy dark:text-sitm-gold uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Users className="w-4 h-4" /> At a Glance
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-sitm-navy dark:text-white">{dept.stats.students}</div>
                                    <div className="text-xs text-gray-500 uppercase">Students</div>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-sitm-navy dark:text-white">{dept.stats.placements}</div>
                                    <div className="text-xs text-gray-500 uppercase">Placement</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-slate-800">
                        <span className="text-sm text-gray-400 italic">Affiliated to ASTU / Approved by AICTE</span>
                        <a href="#" className="flex items-center gap-2 text-sitm-maroon dark:text-sitm-gold font-bold hover:gap-3 transition-all group-hover:underline">
                            Download Syllabus <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Icon wrapper to avoid undefined errors if lucide icons aren't imported specifically for 'BuildingIcon' collision
function BuildingIcon(props) {
    return <Building {...props} />;
}
