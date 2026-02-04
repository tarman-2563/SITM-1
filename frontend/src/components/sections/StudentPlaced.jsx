import { motion } from "framer-motion";

const students = [
  {
    name: "Rahul Verma",
    company: "Amazon",
    package: "₹10 LPA",
    photo: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    name: "Ananya Singh",
    company: "Microsoft",
    package: "₹12 LPA",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohit Sharma",
    company: "Infosys",
    package: "₹6 LPA",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Pooja Patel",
    company: "TCS",
    package: "₹5.5 LPA",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Arjun Das",
    company: "Google",
    package: "₹12 LPA",
    photo: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    name: "Neha Roy",
    company: "Accenture",
    package: "₹7 LPA",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

// Duplicate for seamless loop
const loopStudents = [...students, ...students];

export default function StudentPlaced() {
  return (
    <section
      className="relative py-24 transition-colors duration-300

      bg-linear-to-b
      from-[#7b2d2d]/20
      via-white
      to-[#7b2d2d]/20

      dark:bg-slate-950 
      overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0
        bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_65%)]
        dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_65%)]"
      />
       {/* background SVG */}
       
        <svg
            className="absolute top-0 right-0 w-1/2 h-full opacity-30 dark:opacity-80 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMaxYMid meet"
          >

          <defs>
            <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-sitm-navy)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-sitm-navy)" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow-red">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Circuit Paths (Navy Blue - 20%) */}
          <path d="M 0 100 Q 200 150 400 100 T 800 150" fill="none" stroke="url(#navyGrad)" strokeWidth="2" />
          <path d="M 1000 800 Q 800 750 600 800 T 200 750" fill="none" stroke="url(#navyGrad)" strokeWidth="2" />
          <path d="M 100 0 L 300 300 L 0 600" fill="none" stroke="var(--color-sitm-navy)" strokeWidth="1" opacity="1" />
          <path d="M 900 0 L 700 300 L 1000 600" fill="none" stroke="var(--color-sitm-navy)" strokeWidth="1" opacity="1" />

          {/* Pulsing Data Packets (Red & Gold - 12% / 8%) */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={`pulse-red-${i}`}
              r="4"
              fill="var(--color-sitm-maroon)"
              filter="url(#glow-red)"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ 
                duration: 9 + i, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 1 
              }}
              style={{ offsetPath: "path('M 0 100 Q 200 150 400 100 T 800 150')" }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={`pulse-gold-${i}`}
              r="3"
              fill="var(--color-sitm-gold)"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ 
                duration: 9 + i, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 2 
              }}
              style={{ offsetPath: "path('M 1000 800 Q 800 750 600 800 T 200 750')" }}
            />
          ))}
        </svg>

        <svg
            className="absolute top-0 left-0 w-1/2 h-full opacity-30 dark:opacity-80 pointer-events-none scale-x-[-1]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMaxYMid meet"
          >
            <defs>
              <linearGradient id="navyGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-sitm-navy)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--color-sitm-navy)" stopOpacity="0.8" />
              </linearGradient>

              <filter id="glowRedLeft">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d="M 0 100 Q 200 150 400 100 T 800 150" fill="none" stroke="url(#navyGradLeft)" strokeWidth="2" />
            <path d="M 1000 800 Q 800 750 600 800 T 200 750" fill="none" stroke="url(#navyGradLeft)" strokeWidth="2" />

            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={`left-red-${i}`}
                r="4"
                fill="var(--color-sitm-maroon)"
                filter="url(#glowRedLeft)"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 9 + i, repeat: Infinity, ease: "linear", delay: i }}
                style={{ offsetPath: "path('M 0 100 Q 200 150 400 100 T 800 150')" }}
              />
            ))}
          </svg>


      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-14 px-4">
        <span className="text-sitm-maroon font-serif italic text-lg dark:text-sitm-gold">Student Placements</span>

        <h2 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-gray-900 dark:text-white">
            SITM
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sitm-navy to-indigo-600 dark:from-white dark:to-sitm-gold">
            Pride
          </span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden group">
        <div
          className="flex gap-8 w-max
          animate-marquee
          group-hover:[animation-play-state:paused]"
        >
          {loopStudents.map((student, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative w-72 rounded-3xl overflow-hidden
                bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-px"
            >
              <div className="relative rounded-3xl overflow-hidden
                bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t
                    from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 w-full p-5 text-white">
                  <h3 className="text-lg font-semibold">{student.name}</h3>
                  <p className="text-sm opacity-90">{student.company}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full
                    text-xs font-semibold bg-indigo-500/80">
                    {student.package}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
