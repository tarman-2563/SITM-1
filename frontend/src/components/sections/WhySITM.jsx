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
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background Graphics - Random Rope-like Flow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-80"
          preserveAspectRatio="none"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M-100,200 C150,50 350,500 600,250 C850,0 1050,450 1300,150"
            stroke="url(#rope-gradient)"
            strokeWidth="50"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M-100,600 C200,800 450,150 700,550 C950,950 1100,400 1300,700"
            stroke="url(#rope-gradient)"
            strokeWidth="40"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 5, delay: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
          <defs>
            <linearGradient id="rope-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
              <stop offset="50%" stopColor="#facc15" /> {/* Yellow */}
              <stop offset="100%" stopColor="#f59e0b" /> {/* Amber */}
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-white mb-4"
          >
            Beyond the Degree: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-amber-500">Are you ready</span> for the Real World?
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Navigation Sidebar */}
          <div className="w-full lg:w-1/3 space-y-3">
            {comparisonData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-xl transition-all duration-300 text-left border overflow-hidden relative group ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-sitm-maroon to-sitm-gold text-white border-transparent shadow-xl scale-105"
                    : "bg-linear-to-r from-sitm-navy to-sitm-gold text-white border-transparent hover:scale-[1.02] shadow-lg"
                }`}
              >
                <div className={`p-3 rounded-lg flex items-center justify-center ${activeTab === item.id ? "bg-white/20 text-white" : "bg-white/20 text-white"}`}>
                  {item.icon}
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold">{item.category}</h4>
                  <p className={`text-xs ${activeTab === item.id ? "text-gray-200" : "text-gray-200"}`}>
                    Evolutionary Edge
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Stacking Comparison Cards */}
          <div className="w-full lg:w-2/3 relative h-[500px] md:h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="absolute inset-0 grid md:grid-cols-2 gap-4"
              >
                {/* SITM Card (Highlighted) */}
                <div className="bg-sitm-navy text-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group z-10 border border-white/10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sitm-maroon/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-sitm-maroon/30 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-sitm-gold rounded-full flex items-center justify-center">
                      <Check className="text-sitm-navy" size={24} />
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
                        <div className="mt-1 w-5 h-5 bg-sitm-maroon/40 rounded-full flex items-center justify-center shrink-0">
                           <div className="w-2 h-2 bg-sitm-gold rounded-full" />
                        </div>
                        <span className="text-lg leading-tight font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Traditional Colleges Card (Solid Mustard Tinted) */}
                <div className="bg-[#E1BD40] dark:bg-[#C1A130] border border-sitm-gold/30 rounded-3xl p-8 shadow-sm scale-95 opacity-90 transition-all duration-300 md:-ml-8 z-0">
                   <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-black/10 dark:bg-black/20 rounded-full flex items-center justify-center">
                      <X className="text-red-700" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-900">{activeData.traditional.title}</h3>
                  </div>
                  <ul className="space-y-5">
                    {activeData.traditional.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-800">
                        <div className="mt-1 w-5 h-5 bg-black/5 rounded-full flex items-center justify-center shrink-0">
                           <div className="w-2 h-2 bg-slate-600 rounded-full" />
                        </div>
                        <span className="text-md leading-tight font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
