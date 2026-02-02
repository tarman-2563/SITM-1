import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, X, BookOpen, Rocket, Shield, Target, GraduationCap, Building2 } from "lucide-react";

const comparisonData = [
  {
    id: "curriculum",
    category: "Learning Model",
    icon: <BookOpen className="w-5 h-5" />,
    sitm: {
      title: "SITM Excellence",
      features: [
        "Outcome-driven & Industry-aligned curriculum",
        "Microsoft Collaboration for Tech Certifications",
        "70% Practical & Project-based Learning",
        "Regularly updated by industry practitioners"
      ]
    },
    traditional: {
      title: "Traditional Colleges",
      features: [
        "Theory-heavy & outdated syllabi",
        "Lack of modern industrial tie-ups",
        "Limited lab exposure & hands-on work",
        "Rigid, slow-to-update curriculum"
      ]
    }
  },
  {
    id: "industry",
    category: "Industry Exposure",
    icon: <Rocket className="w-5 h-5" />,
    sitm: {
      title: "SITM Advantage",
      features: [
        "Direct interaction with Tech Leaders & Founders",
        "Live industrial projects from 2nd year",
        "Mandatory internships with leading firms",
        "Job-ready specialized training programs"
      ]
    },
    traditional: {
      title: "Traditional Colleges",
      features: [
        "Rare interaction with industry experts",
        "Theoretical projects with no real-world use",
        "Optional or self-sourced internships",
        "Generalized education without specialization"
      ]
    }
  },
  {
    id: "campus",
    category: "Campus & Growth",
    icon: <Building2 className="w-5 h-5" />,
    sitm: {
      title: "SITM Environment",
      features: [
        "SITM 10-Acre Serene Green Belt Campus",
        "Ecologically sustainable learning system",
        "Advanced Labs & Research Innovation centers",
        "Holistic mental & physical well-being focus"
      ]
    },
    traditional: {
      title: "Traditional Colleges",
      features: [
        "Congested city buildings or concrete zones",
        "Lack of environmental sustainability initiatives",
        "Standardized, aging infrastructure",
        "Academic-only focus with limited growth"
      ]
    }
  },
  {
    id: "placements",
    category: "Placement Support",
    icon: <Target className="w-5 h-5" />,
    sitm: {
      title: "SITM Career Edge",
      features: [
        "Dedicated 360° Placement Cell support",
        "Mock interviews & soft-skill personality labs",
        "Record placements in top MNCs",
        "Strong Alumni network for career mentorship"
      ]
    },
    traditional: {
      title: "Traditional Colleges",
      features: [
        "Basic career services with limited reach",
        "Poor focus on communication & grooming",
        "Fluctuating, unreliable placement records",
        "Weak or disconnected alumni engagement"
      ]
    }
  }
];

export function WhySITM() {
  const [activeTab, setActiveTab] = useState(comparisonData[0].id);

  const activeData = comparisonData.find((item) => item.id === activeTab);

  return (
    <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Background Graphics - Gradient Blobs (Visible in Light & Dark Mode) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-500">
        {/* Subtle Geometric Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        ></div>

        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#D56B6F]/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 80, 0],
            y: [0, -100, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[5%] w-[60%] h-[60%] bg-[#F6E294]/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 0],
            y: [0, 80, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] -right-[10%] w-[55%] h-[55%] bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-serif font-bold text-sitm-navy dark:text-white mb-4"
          >
            Beyond the Degree: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-amber-500">Are you ready</span> for the Real World?
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Navigation Sidebar */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 space-y-3"
          >
            {comparisonData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 rounded-xl transition-all duration-300 text-left border overflow-hidden relative group ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-sitm-gold to-white text-sitm-navy border-transparent shadow-xl scale-110 py-7 px-5"
                    : "bg-gradient-to-r from-white to-sitm-gold text-sitm-navy border-transparent hover:scale-[1.02] shadow-lg p-5"
                }`}
              >
                <div className={`p-3 rounded-lg flex items-center justify-center ${activeTab === item.id ? "bg-black/10 text-sitm-navy" : "bg-black/5 text-sitm-navy"}`}>
                  {item.icon}
                </div>
                <div className="relative z-10">
                  <h4 className={`font-bold transition-all duration-300 ${activeTab === item.id ? "text-xl" : "text-base"}`}>{item.category}</h4>
                  <p className={`text-xs ${activeTab === item.id ? "text-slate-800" : "text-slate-700"}`}>
                    Evolutionary Edge
                  </p>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Stacking Comparison Cards */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3 relative h-[500px] md:h-[450px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="absolute inset-0 grid md:grid-cols-2 gap-4"
              >
                {/* SITM Card (Highlighted - Premium Gold) */}
                <div className="bg-sitm-gold text-sitm-navy rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group z-10 border border-white/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/30 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-sitm-navy rounded-full flex items-center justify-center">
                      <Check className="text-sitm-gold" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold font-serif">{activeData.sitm.title}</h3>
                  </div>
                  <ul className="space-y-5">
                    {activeData.sitm.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 w-5 h-5 bg-sitm-navy/10 rounded-full flex items-center justify-center shrink-0">
                           <div className="w-2 h-2 bg-sitm-navy rounded-full" />
                        </div>
                        <span className="text-lg leading-tight font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Traditional Colleges Card (Premium White) */}
                <div className="bg-white dark:bg-slate-200 border-2 border-sitm-gold rounded-3xl p-8 shadow-sm scale-95 opacity-90 transition-all duration-300 md:-ml-8 z-0">
                   <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                      <X className="text-red-500" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900">{activeData.traditional.title}</h3>
                  </div>
                  <ul className="space-y-5">
                    {activeData.traditional.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className="mt-1 w-5 h-5 bg-black/5 rounded-full flex items-center justify-center shrink-0">
                           <div className="w-2 h-2 bg-slate-400 rounded-full" />
                        </div>
                        <span className="text-md leading-tight font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
