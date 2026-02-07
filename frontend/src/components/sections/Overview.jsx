import { motion } from "framer-motion";
import { Sparkles, Target, Zap, Rocket } from "lucide-react";

export function Overview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const leftTextVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const bottomTextVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#D56B6F]/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -70, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[15%] w-[60%] h-[60%] bg-[#F6E294]/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 120, 0],
            y: [0, -80, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[20%] w-[55%] h-[55%] bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={headingVariants} className="text-left mb-2 md:mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-sitm-navy dark:text-white mb-1 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-500 bg-300% animate-gradient">
                Overview
              </span>
            </h2>
            <div className="w-24 h-[3px] bg-gradient-to-r from-sitm-gold via-amber-400 to-transparent rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-0">
            {/* Left Column: Main Content */}
            <motion.div variants={leftTextVariants} className="space-y-4">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-500 to-cyan-400 bg-300% animate-gradient font-black text-2xl">
                  Scholars Institute of Technology & Management (SITM)
                </span>
                , Guwahati is a cutting-edge, multi-disciplinary college in Assam offering industry-driven undergraduate programs in Engineering, Management, Computing, and Data Science.
              </p>
              
              <p className="text-base md:text-lg text-gray-600 dark:text-white leading-relaxed">
                Designed as a new-age technology and management institute, SITM bridges the gap between academic excellence and real-world industry demands through a state-of-the-art campus, expert faculty, and future-focused curriculum. Learning at SITM goes beyond classrooms, combining AI Technology & Data Science with industry practices, and experiential learning to develop adaptable, future-ready professionals across all programs.
              </p>
            </motion.div>

            {/* Right Column: Concluding Text */}
            <motion.div variants={bottomTextVariants} className="space-y-4">
               <p className="text-lg text-gray-600 dark:text-white leading-relaxed">
                SITM offers flagship undergraduate programs including <span className="font-bold text-sitm-gold">B.Tech Engineering, BBA, BCA, and B.Sc in Data Science</span>, each designed to deliver hands-on learning from Day One, strong industry exposure through live projects and internships, and job-ready, globally relevant skills.
               </p>
               <p className="text-lg text-gray-600 dark:text-white leading-relaxed">
                With a curriculum focused on <span className="text-sitm-gold font-bold">innovation, entrepreneurship, high-paying careers, startups, and real-world roles</span>, SITM empowers students not just to earn a degree—but to{" "}
                <motion.span 
                  variants={bottomTextVariants}
                  className="font-black cursor-default text-sitm-gold"
                >
                  build successful careers and lead the future.
                </motion.span>
               </p>
            </motion.div>
          </div>

          {/* Bottom Row: Key Features */}
          <motion.div variants={rightColumnVariants} className="relative z-10 mt-[20px] mb-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
                {[
                  { 
                    icon: Rocket, 
                    title: "Future-Ready", 
                    desc: "Curriculum focused on Innovation & Entrepreneurship", 
                    color: "text-blue-500",
                    bg: "bg-blue-50/80 dark:bg-blue-950/60",
                    border: "border-blue-200/50 dark:border-blue-800/30"
                  },
                  { 
                    icon: Zap, 
                    title: "Hands-on Learning", 
                    desc: "Live projects & internships from Day One", 
                    color: "text-amber-500",
                    bg: "bg-amber-50/80 dark:bg-amber-950/60",
                    border: "border-amber-200/50 dark:border-amber-800/30"
                  },
                  { 
                    icon: Target, 
                    title: "Industry Focused", 
                    desc: "High-paying careers & real-world roles", 
                    color: "text-red-500",
                    bg: "bg-red-50/80 dark:bg-red-950/60",
                    border: "border-red-200/50 dark:border-red-800/30"
                  },
                  { 
                    icon: Sparkles, 
                    title: "Global Skills", 
                    desc: "B.Tech, BBA, BCA & Data Science programs", 
                    color: "text-purple-500",
                    bg: "bg-purple-50/80 dark:bg-purple-950/60",
                    border: "border-purple-200/50 dark:border-purple-800/30"
                  },
                ].map((feature, idx) => {
                  const themeColors = [
                    { 
                      border: "border-blue-500", 
                      shadow: "shadow-blue-500/20 dark:shadow-blue-500/40", 
                      bg: "bg-blue-50/60 dark:bg-blue-950/40",
                      glow: "group-hover:shadow-blue-500/40 dark:group-hover:shadow-blue-500/60"
                    },
                    { 
                      border: "border-amber-500", 
                      shadow: "shadow-amber-500/20 dark:shadow-amber-500/40", 
                      bg: "bg-amber-50/60 dark:bg-amber-950/40",
                      glow: "group-hover:shadow-amber-500/40 dark:group-hover:shadow-amber-500/60"
                    },
                    { 
                      border: "border-red-500", 
                      shadow: "shadow-red-500/20 dark:shadow-red-500/40", 
                      bg: "bg-red-50/60 dark:bg-red-950/40",
                      glow: "group-hover:shadow-red-500/40 dark:group-hover:shadow-red-500/60"
                    },
                    { 
                      border: "border-purple-500", 
                      shadow: "shadow-purple-500/20 dark:shadow-purple-500/40", 
                      bg: "bg-purple-50/60 dark:bg-purple-950/40",
                      glow: "group-hover:shadow-purple-500/40 dark:group-hover:shadow-purple-500/60"
                    },
                  ];
                  
                  const theme = themeColors[idx % themeColors.length];

                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`relative group h-full`}
                    >
                      <div className={`
                        h-full p-6 rounded-[2rem] border-2 ${theme.border} ${theme.bg} 
                        shadow-[0_4px_20px_rgba(0,0,0,0.05)] ${theme.shadow} 
                        transition-all duration-300 backdrop-blur-md flex flex-col items-center text-center
                        ${theme.glow}
                      `}>
                        <div className={`p-3 rounded-2xl bg-white/80 dark:bg-white/10 shadow-sm mb-3`}>
                          <feature.icon className={`w-8 h-8 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-black text-sitm-navy dark:text-sitm-gold mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-700 dark:text-white/90 font-medium leading-tight">{feature.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
