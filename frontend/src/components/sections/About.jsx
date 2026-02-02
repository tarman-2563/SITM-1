import { motion } from "framer-motion";

export function About() {
  return (
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
              src="https://sitmguwahati.ac.in/assets/Campus-Badc-v75.jpeg" 
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
              className="absolute top-1 right-2 w-24 h-24 flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-linear-to-br from-sitm-maroon via-[#5d1014] to-black/80 rounded-full border-2 border-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
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
                      className="block text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-200 to-amber-400 drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)] filter tracking-tighter"
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
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-serif leading-tight">
              Scholars Institute of Technology & Management
            </h2>
            
            <div className="space-y-3 text-gray-100 text-sm leading-relaxed">
              <p>
                Established on May 8, 2008, under the Indian Trust Act, 1882, <strong className="text-white">SITM</strong> is the flagship initiative of the Scholar's Academy Education Trust. Since its inception, SITM has been committed to nurturing minds and shaping the future of young technocrats and leaders.
              </p>
              
              <div className="pl-4 border-l-4 border-sitm-gold/70 my-4">
                <h4 className="text-base font-bold text-white mb-1 font-serif">A Campus that Inspires</h4>
                <p className="italic text-xs">
                  Set amidst a serene natural landscape of over 10 acres in Guwahati, the campus offers a rare blend of tranquility and modernity, merging lush greenery with state-of-the-art infrastructure.
                </p>
              </div>

              <p className="text-xs">
                 Academic Excellence Meets Visionary Leadership. At SITM, education is about transformation. Backed by a dynamic team of highly qualified faculty, the institute is dedicated to producing professionals ready to lead in the 21st century across engineering, innovation, and research.
              </p>
            </div>

            <div className="mt-6">
                <button className="px-6 py-3 bg-sitm-gold text-sitm-navy rounded-full hover:bg-amber-400 transition-colors shadow-lg hover:shadow-xl font-bold tracking-wide uppercase text-xs">
                    Read Chairman's Message
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
              src="https://sitmguwahati.ac.in/assets/Campus-Badc-v75.jpeg" 
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
                <div className="absolute inset-0 bg-linear-to-br from-sitm-maroon via-[#5d1014] to-black/80 rounded-full border-4 border-white dark:border-slate-800 shadow-[0_25px_50px_rgba(0,0,0,0.4),inset_0_-8px_15px_rgba(0,0,0,0.5),inset_0_8px_15px_rgba(255,255,255,0.2)] overflow-hidden">
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
            
            <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mb-8 font-serif leading-tight">
              Scholars Institute of Technology & Management
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Established on May 8, 2008, under the Indian Trust Act, 1882, <strong className="text-sitm-navy dark:text-white">SITM</strong> is the flagship initiative of the Scholar's Academy Education Trust. Since its inception, SITM has been committed to nurturing minds and shaping the future of young technocrats and leaders.
              </p>
              
              <div className="pl-6 border-l-4 border-sitm-gold/50 my-8">
                <h4 className="text-xl font-bold text-sitm-navy dark:text-white mb-2 font-serif">A Campus that Inspires</h4>
                <p className="italic">
                  Set amidst a serene natural landscape of over 10 acres in Guwahati, the campus offers a rare blend of tranquility and modernity, merging lush greenery with state-of-the-art infrastructure.
                </p>
              </div>

              <p>
                 Academic Excellence Meets Visionary Leadership. At SITM, education is about transformation. Backed by a dynamic team of highly qualified faculty, the institute is dedicated to producing professionals ready to lead in the 21st century across engineering, innovation, and research.
              </p>
            </div>

            <div className="mt-10 flex gap-6">
                <button className="px-8 py-4 bg-sitm-navy text-white rounded-full hover:bg-sitm-maroon transition-colors shadow-lg hover:shadow-xl font-bold tracking-wide uppercase text-sm">
                    Read Chairmans Message
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
