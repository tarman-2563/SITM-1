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

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-14 px-4">
        <span className="text-sitm-maroon font-serif italic text-lg dark:text-sitm-gold">Student Placements</span>

        <h2 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-gray-900 dark:text-white">
            Our Students,
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sitm-navy to-indigo-600 dark:from-white dark:to-sitm-gold">
            Our Pride
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
