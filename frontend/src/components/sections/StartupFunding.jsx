import { motion } from "framer-motion";

export default function StartupFunding() {
  const colorMap = {
  indigo: {
    border: "border-indigo-500/30",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  emerald: {
    border: "border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  rose: {
    border: "border-rose-500/30",
    text: "text-rose-600 dark:text-rose-400",
  },
};

  return (
    <section
      id="startup-funding"
      className="relative py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Aurora/Glow Graphics - Mirroring About style but different directions */}
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
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[15%] w-[55%] h-[55%] bg-[#D56B6F]/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 80, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[20%] w-[65%] h-[65%] bg-[#F6E294]/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 0],
            y: [0, 80, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%] bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
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
            className="relative rounded-4xl p-10
            bg-white/80 dark:bg-white/5
            backdrop-blur-2xl
            border border-sitm-gold/40
            shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_60px_rgba(255,255,255,0.02)]"
          >
            <span className="inline-block mb-6 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest
              bg-sitm-gold/10 text-sitm-maroon dark:text-sitm-gold">
              🚀 Startup Ecosystem @ SITM
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-sitm-navy dark:text-white">
              From Ideas to Startups —
              <span className="block mt-2 text-3xl md:text-4xl text-sitm-navy dark:text-sitm-gold font-serif italic font-black drop-shadow-sm">
                Backed by <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-sitm-gold">₹10L</span> Seed Funding
              </span>
            </h2>

            <p className="mt-8 text-lg text-sitm-navy/70 dark:text-gray-300 leading-relaxed font-medium">
              At <span className="font-bold text-sitm-navy dark:text-white">SITM</span>, student founders receive
              expert mentorship and early-stage funding to transform innovative
              ideas into real, scalable startups.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: "₹10L+", label: "Seed Funding" },
                { value: "1-to-1", label: "Founder Mentorship" },
                { value: "0 → 1", label: "Startup Journey" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 text-center
                    bg-sitm-gold/10 dark:bg-white/5 backdrop-blur-xl
                    border border-sitm-gold/20
                  "
                >
                  <motion.h3 
                    animate={item.value === "₹10L+" ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`${item.value === "₹10L+" ? "text-4xl" : "text-2xl"} font-serif italic font-black text-transparent bg-clip-text bg-linear-to-r from-sitm-maroon to-sitm-navy dark:from-sitm-gold dark:to-white`}
                  >
                    {item.value}
                  </motion.h3>
                  <p className="mt-1 text-xs font-bold uppercase text-sitm-maroon/60 dark:text-gray-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= DESKTOP CARD 2 (RIGHT) ================= */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-4xl p-10
            bg-white/80 dark:bg-white/5
            backdrop-blur-2xl
            border border-sitm-gold/40
            shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_60px_rgba(255,255,255,0.02)]"
          >
            <span className="inline-block mb-6 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest
              bg-sitm-gold/10 text-sitm-maroon dark:text-sitm-gold">
              🌍 Global Exposure @ SITM
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-sitm-navy dark:text-white">
              Students Went International —
              <span className="block mt-2 text-3xl md:text-4xl text-sitm-navy dark:text-sitm-gold font-serif italic font-black drop-shadow-sm">
                <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-sitm-gold">Thailand</span> Competition
              </span>
            </h2>

            <p className="mt-8 text-lg text-sitm-navy/70 dark:text-gray-300 leading-relaxed font-medium">
              SITM students proudly represented India at an international-level
              competition in <span className="font-bold italic ">Thailand</span>.
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
