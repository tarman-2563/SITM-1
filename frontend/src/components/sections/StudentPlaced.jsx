import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, Award, Cpu, Globe, Database, Code, Zap, Briefcase, GraduationCap } from "lucide-react";

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
      className="relative py-24 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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

        {/* Bold Thematic Background Icons */}
        <div className="absolute inset-0">
          {[
            { Icon: Building2, top: "10%", left: "5%", size: 140, rotate: 15 },
            { Icon: GraduationCap, top: "60%", left: "85%", size: 160, rotate: -15 },
            { Icon: Briefcase, top: "75%", left: "10%", size: 130, rotate: 10 },
            { Icon: Award, top: "15%", left: "80%", size: 120, rotate: -20 },
          ].map((item, i) => (
            <motion.div
              key={`bg-icon-${i}`}
              className="absolute text-sitm-navy dark:text-sitm-gold opacity-[0.06] dark:opacity-[0.12]"
              style={{ top: item.top, left: item.left }}
              animate={{ 
                y: [0, -30, 0],
                rotate: [item.rotate, item.rotate + 5, item.rotate - 5, item.rotate]
              }}
              transition={{ 
                duration: 10 + i * 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <item.Icon size={item.size} strokeWidth={2} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl mx-auto mb-14 px-4"
      >

        <h2 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-gray-900 dark:text-white">
            SITM
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sitm-navy to-indigo-600 dark:from-white dark:to-sitm-gold">
            Pride
          </span>
        </h2>
      </motion.div>

      {/* Marquee */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 overflow-hidden group py-12"
      >
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
      </motion.div>
    </section>
  );
}
