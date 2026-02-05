import { useState } from "react";
import { motion } from "framer-motion";
import { AboutSidebar } from "./AboutSidebar";
import HostelImg from "../../assets/gallery/Hostel.jpg";
import AboutImg from "../../assets/about.jpeg";

export function About() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <section id="about" className="relative py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
        {/* Background Aurora/Glow Graphics - Distinct from WhySITM */}
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
          {/* Mobile: Background Image with Overlay Text */}
          <div className="md:hidden relative rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={AboutImg} 
                alt="SITM Campus" 
                className="w-full h-full object-cover" 
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
            </div>

            {/* Content Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="relative z-10 p-6 min-h-[600px] flex flex-col justify-center"
            >
              {/* Badge */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-1 right-1 w-28 h-28 flex items-center justify-center"
              >
                  <div className="absolute inset-0 rounded-full border-2 border-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                      <img src={HostelImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none rounded-full"
                      />
                  </div>
                  
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      y: [0, -4, 0]
                    }}
                    transition={{ 
                      duration: 2.2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="text-center relative z-20 pointer-events-none"
                  >
                      <span 
                      className="block text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-200 to-amber-400 drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)] filter tracking-tighter"
                      >
                        31+
                      </span>
                      <span 
                      className="text-[8px] font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-200 to-amber-400 uppercase tracking-[0.15em] leading-tight block drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                      >
                        Years of<br/>Legacy
                      </span>
                  </motion.div>
              </motion.div>

              <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-1 bg-sitm-gold"></div>
                  <span className="text-sitm-gold font-serif italic font-bold text-lg">About Us</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-sitm-gold mb-4 font-serif leading-tight">
                From a Small Room to a Larger Responsibility
              </h2>
              
              <div className="space-y-3 text-gray-100 text-sm leading-relaxed">
                <p>
                  The story of Scholars Institute of Technology and Management does not begin with buildings, approvals, or degrees. It begins with a quiet resolve formed under financial constraint, shaped by self reliance, and tested repeatedly by uncertainty.
                </p>
                
                <p>
                  Dr. Sudip Lodh was born into a modest household in a small village. His father was a physics teacher in a government school, respected for his integrity but limited by his means. His mother was a homemaker, holding together a family of seven with patience and discipline. With five siblings to support, ambition had to coexist with responsibility, and education was never taken for granted.
                </p>

                <p>
                  From his early student years, Dr. Lodh supported himself through home tuitions. Teaching was not an afterthought. It was survival, training, and purpose rolled into one. There was no patron, no inherited network, no institutional backing. Every step forward was earned independently.
                </p>

                <p>
                  His academic journey took him from Gurucharan College, Silchar to Gauhati University, where he completed his MSc and MPhil. Later came an <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-200 to-amber-400 text-border-black">honorary doctorate from Ballbridge University</span>, but long before titles arrived, the identity of a teacher had already taken root.
                </p>
              </div>

              <div className="mt-6">
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="px-6 py-3 bg-sitm-gold text-sitm-navy rounded-full hover:bg-amber-400 transition-colors shadow-lg hover:shadow-xl font-bold tracking-wide uppercase text-xs"
                  >
                      Read More
                  </button>
              </div>
            </motion.div>
          </div>

          {/* Desktop: Side-by-side Layout */}
          <div className="hidden md:flex flex-row items-center gap-16">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 relative group"
            >
              <div className="absolute -inset-4 bg-linear-to-r from-sitm-maroon to-sitm-gold rounded-2xl opacity-20 group-hover:opacity-30 blur-lg transition duration-500"></div>
              <img 
                src={AboutImg} 
                alt="SITM Campus" 
                className="relative rounded-2xl shadow-2xl w-full object-cover h-125 border-4 border-white dark:border-slate-800 transition-transform duration-500 group-hover:scale-[1.01]" 
              />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-10 -right-12 w-44 h-44 flex items-center justify-center md:flex group/badge"
              >
                  {/* The Maroon Circle Backdrop (Clipped for shine) */}
                  <div className="absolute inset-0 rounded-full border-4 border-white dark:border-slate-800 shadow-[0_25px_50px_rgba(0,0,0,0.4),inset_0_-8px_15px_rgba(0,0,0,0.5),inset_0_8px_15px_rgba(255,255,255,0.2)] overflow-hidden">
                      <img src={HostelImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      {/* Shine Animation Overlay */}
                      <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                      />
                      {/* Internal Glow for depth */}
                      <div className="absolute inset-0 rounded-full bg-linear-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* Oversized 3D Text (Popping OUT of the circle) */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, -8, 0]
                    }}
                    transition={{ 
                      duration: 2.2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="text-center relative z-20 pointer-events-none"
                  >
                      <span 
                        className="block text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-200 to-amber-400 drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)] filter tracking-tighter"
                        style={{ 
                          transform: "perspective(1000px) translateZ(80px)",
                          WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                        }}
                      >
                        31+
                      </span>
                      <span 
                        className="text-[14px] font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-200 to-amber-400 uppercase tracking-[0.18em] leading-tight block drop-shadow-[0_6px_10px_rgba(0,0,0,0.4)]"
                        style={{ 
                          transform: "perspective(1000px) translateZ(50px)",
                        }}
                      >
                        Years of<br/>Legacy
                      </span>
                  </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-sitm-gold"></div>
                  <span className="text-sitm-maroon dark:text-sitm-gold font-serif italic font-bold text-xl">About Us</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sitm-navy to-sitm-gold dark:from-white dark:to-sitm-gold mb-8 font-serif leading-tight">
              From a Small Room to a Larger Responsibility
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                The story of Scholars Institute of Technology and Management does not begin with buildings, approvals, or degrees. It begins with a quiet resolve formed under financial constraint, shaped by self reliance, and tested repeatedly by uncertainty.
              </p>
              <p>
                Dr. Sudip Lodh was born into a modest household in a small village. His father was a physics teacher in a government school, respected for his integrity but limited by his means. His mother was a homemaker, holding together a family of seven with patience and discipline. With five siblings to support, ambition had to coexist with responsibility, and education was never taken for granted.
              </p>
              <p>
                From his early student years, Dr. Lodh supported himself through home tuitions. Teaching was not an afterthought. It was survival, training, and purpose rolled into one. There was no patron, no inherited network, no institutional backing. Every step forward was earned independently.
              </p>
              <p>
                His academic journey took him from Gurucharan College, Silchar to Gauhati University, where he completed his MSc and MPhil. Later came an <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-200 to-amber-400 text-border-black">honorary doctorate from Ballbridge University</span>, but long before titles arrived, the identity of a teacher had already taken root.
              </p>
            </div>

              <div className="mt-10 flex gap-6">
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="px-8 py-4 bg-sitm-navy text-white rounded-full hover:bg-sitm-maroon transition-colors shadow-lg hover:shadow-xl font-bold tracking-wide uppercase text-sm"
                  >
                      Read More
                  </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AboutSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
