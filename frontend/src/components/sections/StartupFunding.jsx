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
      className="relative py-28 overflow-hidden
      bg-linear-to-b
      from-[#7b2d2d]/20
      via-white
      to-[#7b2d2d]/20
      dark:bg-slate-950
      transition-colors duration-300"
    >
      {/* Neon Glow Background */}
      <div
        className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)]
        dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_40%)]"
      />

     <svg
  className="absolute inset-0 w-full h-full pointer-events-none"
  viewBox="0 0 1200 1200"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="flowGradient1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#6366f1" />
      <stop offset="100%" stopColor="#22d3ee" />
    </linearGradient>

    <linearGradient id="flowGradient2" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#22c55e" />
      <stop offset="100%" stopColor="#6366f1" />
    </linearGradient>
  </defs>

  {/* ================= TOP RIGHT → BOTTOM LEFT ================= */}
  <motion.path
    d="
      M1200 -100
      C 900 300, 600 600, 0 1300
    "
    stroke="url(#flowGradient1)"
    strokeWidth="22"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0.15 }}
    animate={{ pathLength: 1, opacity: [0.15, 0.35, 0.15] }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      filter: 'blur(6px)',
    }}
  />

  <motion.path
    d="
      M1200 -100
      C 900 300, 600 600, 0 1300
    "
    stroke="url(#flowGradient1)"
    strokeWidth="8"
    strokeDasharray="14 18"
    strokeLinecap="round"
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />

  {/* ================= TOP LEFT → BOTTOM RIGHT ================= */}
  <motion.path
    d="
      M0 -100
      C 300 300, 600 600, 1200 1300
    "
    stroke="url(#flowGradient2)"
    strokeWidth="22"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0.15 }}
    animate={{ pathLength: 1, opacity: [0.15, 0.35, 0.15] }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      filter: 'blur(6px)',
    }}
  />

  <motion.path
    d="
      M0 -100
      C 300 300, 600 600, 1200 1300
    "
    stroke="url(#flowGradient2)"
    strokeWidth="8"
    strokeDasharray="14 18"
    strokeLinecap="round"
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
</svg>




      {/* Floating Accent */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 
        w-150 h-150 rounded-full blur-3xl
        bg-indigo-400/20 dark:bg-indigo-600/20"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Cards Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* ================= CARD 1 ================= */}
          <div
            className="relative rounded-3xl p-10 md:p-14
            bg-white/70 dark:bg-slate-950/70
            backdrop-blur-xl
            border border-indigo-500/20
            shadow-[0_0_60px_rgba(99,102,241,0.25)]"
          >
            <span className="inline-block mb-6 px-5 py-2 rounded-full text-sm font-semibold
              bg-indigo-100 text-indigo-700
              dark:bg-indigo-500/10 dark:text-indigo-400">
              🚀 Startup Ecosystem @ SITM
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="text-gray-900 dark:text-white">
                From Ideas to Startups —
              </span>{" "}
              <span className="bg-clip-text text-transparent 
                bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
                Backed by ₹10L Seed Funding
              </span>
            </h2>

            <p className="mt-6 text-lg text-blue-700 dark:text-gray-300">
              At <span className="font-semibold">SITM</span>, student founders receive
              expert mentorship and early-stage funding to transform innovative
              ideas into real, scalable startups.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: "₹10L+", label: "Seed Funding", color: "indigo" },
                { value: "1-to-1", label: "Founder Mentorship", color: "emerald" },
                { value: "0 → 1", label: "Startup Journey", color: "rose" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 text-center
                    bg-white/80 dark:bg-slate-900/60
                    ${colorMap[item.color].border}
                  `}
                >
                  <h3
                    className={`text-2xl font-bold ${colorMap[item.color].text}`}
                  >
                    {item.value}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ================= CARD 2 ================= */}
          <div
            className="relative rounded-3xl p-10 md:p-14
            bg-white/70 dark:bg-slate-950/70
            backdrop-blur-xl
            border border-emerald-500/20
            shadow-[0_0_60px_rgba(16,185,129,0.25)]"
          >
            <span className="inline-block mb-6 px-5 py-2 rounded-full text-sm font-semibold
              bg-emerald-100 text-emerald-700
              dark:bg-emerald-500/10 dark:text-emerald-400">
              🌍 Global Exposure @ SITM
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="text-gray-900 dark:text-white">
                Students Went International —
              </span>{" "}
              <span className="bg-clip-text text-transparent 
                bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500">
                Thailand Competition
              </span>
            </h2>

            <p className="mt-6 text-lg text-blue-700 dark:text-gray-300">
              SITM students proudly represented India at an international-level
              competition in <span className="font-semibold">Thailand</span>.
              This global exposure helped students gain international
              experience, cultural insight, and confidence while competing
              alongside teams from different countries.
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
