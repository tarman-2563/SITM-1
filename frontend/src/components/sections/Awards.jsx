import { motion } from "framer-motion";
import { Trophy, Award, Star, Medal, Users, BookOpen, Crown } from "lucide-react";

export function Awards() {
  const awards = [
    {
      title: "IET India Scholarship",
      desc: "Recognizing outstanding engineering talent. Multiple SITM students have been recipients of this prestigious national scholarship.",
      year: "2024-25",
      icon: <Award className="w-6 h-6" />,
      color: "bg-sitm-maroon"
    },
    {
      title: "Smart India Hackathon",
      desc: "SITM-IQAC successfully organized and participated in the national-level innovation competition recognized by the Ministry of Education.",
      year: "2023",
      icon: <Users className="w-6 h-6" />,
      color: "bg-sitm-navy"
    },
    {
      title: "NAAC Accredited",
      desc: "Recognized for maintaining high quality standards in education, infrastructure, and student support services.",
      year: "Since 2016",
      icon: <Star className="w-6 h-6" />,
      color: "bg-sitm-gold"
    },
    {
      title: "Inter-College Cricket",
      desc: "Champions of the Regional Inter-College Cricket Tournament season 4, showcasing sporting excellence alongside academics.",
      year: "2024",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-sitm-maroon"
    },
    {
      title: "Tata Imagination Challenge",
      desc: "Active participation and recognition in one of India's largest student-industry collaborative challenges.",
      year: "2024",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-sitm-navy"
    },
    {
      title: "Academic Excellence",
      desc: "Zubeen Garg Memorial Gold Medal awarded to branch toppers for exceptional academic performance.",
      year: "Annual",
      icon: <Medal className="w-6 h-6" />,
      color: "bg-sitm-maroon"
    }
  ];

  return (
    <section
      id="awards"
      className="
        relative py-24 overflow-hidden
        bg-white dark:bg-slate-950
        transition-colors duration-300
      "
    >
      {/* ===== GRADIENT BLOBS ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* FLOATING DECORATIVE ICONS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[
          { Icon: Trophy, top: "10%", left: "5%", size: 130, rotate: 12 },
          { Icon: Award, top: "70%", left: "8%", size: 120, rotate: -10 },
          { Icon: Medal, top: "20%", left: "88%", size: 140, rotate: -15 },
          { Icon: Star, top: "78%", left: "85%", size: 130, rotate: 10 },
          { Icon: Crown, top: "45%", left: "2%", size: 110, rotate: -8 },
          { Icon: Award, top: "40%", left: "95%", size: 100, rotate: 15 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-sitm-navy dark:text-sitm-gold opacity-[0.06] dark:opacity-[0.1]"
            style={{ top: item.top, left: item.left }}
            animate={{
              y: [0, -25, 0],
              rotate: [item.rotate, item.rotate + 10, item.rotate],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

        <motion.div
          animate={{ x: [0, -120, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[15%] w-[55%] h-[55%]
                     bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />

        <motion.div
          animate={{ x: [0, 90, 0], y: [0, 110, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] -left-[20%] w-[65%] h-[65%]
                     bg-[#F6E294]/20 rounded-full blur-[130px]"
        />

        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%]
                     bg-[#D56B6F]/20 rounded-full blur-[120px]"
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sitm-gold font-serif italic text-lg"
          >
            Hall of Fame
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mt-2 mb-6 font-serif"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-yellow-400 to-green-600 px-2">
              Awards & Achievements
            </span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <AwardCard key={index} award={award} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardCard({ award, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index < 3 ? -200 : 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="
        group relative
        bg-gray-50 dark:bg-slate-800
        p-8 rounded-2xl
        border border-gray-100 dark:border-slate-700
        hover:shadow-xl hover:shadow-sitm-navy/5
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between mb-6">

        {/* Icon Box */}
        <div
          className={`p-4 rounded-xl ${award.color} bg-opacity-10 text-sitm-navy dark:text-white group-hover:bg-opacity-20 transition-all`}
        >
          {/* ✅ ICON FIX ONLY */}
          <div className="text-slate-900 dark:text-white">
            {award.icon}
          </div>
        </div>

        {/* Year */}
        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white dark:bg-slate-900 rounded-full border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-300">
          {award.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-serif font-bold text-sitm-navy dark:text-white mb-3 group-hover:text-sitm-maroon dark:group-hover:text-sitm-gold transition-colors">
        {award.title}
      </h3>

      {/* Desc */}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {award.desc}
      </p>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-sitm-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </motion.div>
  );
}
