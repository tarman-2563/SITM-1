import { motion } from "framer-motion";

export default function StartupFunding() {
  return (
    <section
      id="startup-funding"
      className="scroll-mt-24 relative py-20 md:py-28 bg-gradient-to-b from-white via-sitm-gold/5 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Enhanced Background with more dynamic elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Geometric Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{ 
            backgroundImage: `radial-gradient(#F6E294 2px, transparent 2px)`,
            backgroundSize: "40px 40px"
          }}
        ></div>

        {/* Animated gradient orbs - more vibrant */}
        <motion.div 
          animate={{ 
            x: [0, -120, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[15%] w-[60%] h-[60%] bg-sitm-gold/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 120, 0],
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -left-[20%] w-[70%] h-[70%] bg-sitm-maroon/25 rounded-full blur-[130px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -140, 0],
            y: [0, 90, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[0%] right-[10%] w-[65%] h-[65%] bg-sitm-gold/25 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile View: Vertical Stacked Rows */}
        <div className="md:hidden grid grid-cols-1 gap-8 px-2">
            
          {/* ================= MOBILE CARD 1 ================= */}
          <div
            className="min-h-[450px] flex flex-col justify-between relative rounded-3xl p-6
            bg-white/90 dark:bg-white/5
            backdrop-blur-xl
            border border-sitm-gold/30
            shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
          >
            <div>
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider
                bg-sitm-gold/10 text-sitm-maroon dark:text-sitm-gold">
                🚀 Startup Ecosystem
              </span>

              <h2 className="text-xl font-serif font-black leading-tight mb-4 text-sitm-navy dark:text-white">
                From Ideas to Startups —
                <span className="block mt-1 text-lg text-sitm-navy dark:text-sitm-gold font-serif italic font-black">
                  Backed by <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-sitm-gold">₹10L</span> Seed Funding
                </span>
              </h2>

              <p className="text-sm text-sitm-navy/70 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                Expert mentorship and early-stage funding to transform innovative
                ideas into real, scalable startups.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: "₹10L+", label: "Seed Funding" },
                { value: "1-to-1", label: "Mentorship" },
                { value: "0 → 1", label: "Journey" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-3 text-center bg-sitm-gold/10 dark:bg-white/5 backdrop-blur-xl border border-sitm-gold/20">
                  <motion.h3 
                    animate={item.value === "₹10L+" ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`${item.value === "₹10L+" ? "text-2xl" : "text-lg"} font-serif italic font-black text-transparent bg-clip-text bg-linear-to-r from-sitm-maroon to-sitm-navy dark:from-sitm-gold dark:to-white`}
                  >
                    {item.value}
                  </motion.h3>
                  <p className="text-[9px] font-bold uppercase text-sitm-maroon/60 dark:text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= MOBILE CARD 2 ================= */}
          <div
            className="min-h-[300px] flex flex-col justify-center relative rounded-3xl p-6
            bg-white/90 dark:bg-white/5
            backdrop-blur-xl
            border border-sitm-gold/30
            shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider
              bg-sitm-gold/10 text-sitm-maroon dark:text-sitm-gold">
              🌍 Global Exposure
            </span>

            <h2 className="text-xl font-serif font-black leading-tight mb-4 text-sitm-navy dark:text-white">
              Students Went International —
              <span className="block mt-1 text-lg text-sitm-navy dark:text-sitm-gold font-serif italic font-black">
                <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-sitm-gold">Thailand</span> Competition
              </span>
            </h2>

            <p className="text-sm text-sitm-navy/70 dark:text-gray-300 leading-relaxed font-medium">
              SITM students proudly represented India at an international-level
              competition in <span className="font-bold italic text-sitm-navy dark:text-sitm-gold">Thailand</span>, gaining confidence and cultural insight on a global stage.
            </p>
          </div>
        </div>

        {/* Desktop View: Grid with Split-Side Sliding Animations */}
        <div className="hidden md:grid grid-cols-2 gap-10">

          {/* ================= DESKTOP CARD 1 (LEFT) ================= */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-3xl p-10
            bg-gradient-to-br from-white via-sitm-gold/10 to-white dark:from-slate-900 dark:via-sitm-gold/5 dark:to-slate-900
            backdrop-blur-2xl
            border-2 border-sitm-gold/50 hover:border-sitm-gold
            shadow-[0_20px_60px_rgba(246,226,148,0.3)] hover:shadow-[0_25px_70px_rgba(246,226,148,0.4)]
            transition-all duration-300 cursor-pointer group"
          >
            {/* Glowing corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sitm-gold/20 rounded-full blur-3xl group-hover:bg-sitm-gold/30 transition-all"></div>
            
            <span className="inline-block mb-6 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest
              bg-sitm-gold/20 text-sitm-maroon dark:text-sitm-gold border border-sitm-gold/30
              shadow-lg group-hover:scale-105 transition-transform">
              Startup Ecosystem @ SITM
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-sitm-navy dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
              From Ideas to Startups
              <span className="block mt-3 text-3xl md:text-4xl font-serif italic font-black">
                Backed by <motion.span 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sitm-gold drop-shadow-[0_0_10px_rgba(246,226,148,0.5)]"
                >₹10L</motion.span> Seed Funding
              </span>
            </h2>

            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-sitm-gold to-transparent rounded-full"></div>

            <p className="mt-8 text-lg text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
              At <span className="font-bold text-sitm-navy dark:text-sitm-gold">SITM</span>, student founders receive
              expert mentorship and early-stage funding to transform innovative
              ideas into real, scalable startups.
            </p>

            <div className="mt-12 flex gap-6">
              {/* First box - ₹10L+ takes more width */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-[2] rounded-2xl p-8 text-center
                  bg-white dark:bg-slate-800 backdrop-blur-xl
                  border-2 border-sitm-gold bg-sitm-gold/5 hover:border-sitm-gold
                  shadow-lg hover:shadow-xl transition-all
                  ring-2 ring-sitm-gold/30 ring-offset-2
                  flex flex-col justify-center
                "
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    textShadow: [
                      "0 0 15px rgba(246,226,148,0.6)",
                      "0 0 25px rgba(246,226,148,0.9)",
                      "0 0 15px rgba(246,226,148,0.6)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-sitm-gold font-serif italic font-black drop-shadow-[0_0_10px_rgba(246,226,148,0.5)]"
                >
                  <span className="inline-block align-middle text-5xl">₹</span>
                  <span className="inline-block align-middle text-6xl">10</span>
                  <span className="inline-block align-middle text-4xl">L+</span>
                </motion.div>
                <p className="mt-3 text-xs font-bold uppercase text-sitm-gold">
                  Seed Funding
                </p>
              </motion.div>

              {/* Second box - normal width */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-1 rounded-2xl p-6 text-center
                  bg-white dark:bg-slate-800 backdrop-blur-xl
                  border-2 border-sitm-gold/30 hover:border-sitm-gold
                  shadow-lg hover:shadow-xl transition-all
                  flex flex-col justify-center
                "
              >
                <h3 className="text-2xl text-sitm-gold font-serif italic font-black drop-shadow-lg">
                  1-to-1
                </h3>
                <p className="mt-3 text-xs font-bold uppercase text-slate-600 dark:text-gray-300">
                  Founder Mentorship
                </p>
              </motion.div>

              {/* Third box - normal width */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-1 rounded-2xl p-6 text-center
                  bg-white dark:bg-slate-800 backdrop-blur-xl
                  border-2 border-sitm-gold/30 hover:border-sitm-gold
                  shadow-lg hover:shadow-xl transition-all
                  flex flex-col justify-center
                "
              >
                <h3 className="text-2xl text-sitm-gold font-serif italic font-black drop-shadow-lg">
                  0 → 1
                </h3>
                <p className="mt-3 text-xs font-bold uppercase text-slate-600 dark:text-gray-300">
                  Startup Journey
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ================= DESKTOP CARD 2 (RIGHT) ================= */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-3xl p-10
            bg-gradient-to-br from-white via-sitm-maroon/10 to-white dark:from-slate-900 dark:via-sitm-maroon/5 dark:to-slate-900
            backdrop-blur-2xl
            border-2 border-sitm-maroon/40 hover:border-sitm-maroon/70
            shadow-[0_20px_60px_rgba(213,107,111,0.25)] hover:shadow-[0_25px_70px_rgba(213,107,111,0.35)]
            transition-all duration-300 cursor-pointer group"
          >
            {/* Glowing corner accent */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-sitm-maroon/20 rounded-full blur-3xl group-hover:bg-sitm-maroon/30 transition-all"></div>
            
            <span className="inline-block mb-6 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest
              bg-sitm-maroon/15 text-sitm-maroon dark:text-sitm-gold border border-sitm-maroon/30
              shadow-lg group-hover:scale-105 transition-transform">
              Global Exposure @ SITM
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-sitm-navy dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
              Students Went International
              <span className="block mt-3 text-3xl md:text-4xl font-serif italic font-black">
                <motion.span 
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-sitm-maroon dark:text-sitm-gold drop-shadow-[0_0_10px_rgba(213,107,111,0.4)]"
                >Thailand</motion.span> Competition
              </span>
            </h2>

            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-sitm-maroon to-transparent rounded-full"></div>

            <p className="mt-8 text-lg text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
              SITM students proudly represented <span className="font-bold text-sitm-navy dark:text-sitm-gold">India</span> at an international-level
              competition in <span className="font-bold italic text-sitm-maroon dark:text-sitm-gold">Thailand</span>.
              This global exposure helped students gain international
              experience, cultural insight, and confidence while competing
              alongside teams from different countries.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
