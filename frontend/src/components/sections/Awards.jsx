import { motion } from "framer-motion";
import { SectionHeader } from "../common/SectionHeader";
import { Trophy, Award, Star, Medal, Users, BookOpen } from "lucide-react";

export function Awards() {
  const awards = [
    {
      title: "IET India Scholarship",
      desc: "Recognizing outstanding engineering talent. Multiple SITM students have been recipients of this prestigious national scholarship.",
      year: "2024-25",
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: "Smart India Hackathon",
      desc: "SITM-IQAC successfully organized and participated in the national-level innovation competition recognized by the Ministry of Education.",
      year: "2023",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "NAAC Accredited",
      desc: "Recognized for maintaining high quality standards in education, infrastructure, and student support services.",
      year: "Since 2016",
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "Inter-College Cricket",
      desc: "Champions of the Regional Inter-College Cricket Tournament season 4, showcasing sporting excellence alongside academics.",
      year: "2024",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      title: "Tata Imagination Challenge",
      desc: "Active participation and recognition in one of India's largest student-industry collaborative challenges.",
      year: "2024",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      title: "Academic Excellence",
      desc: "Zubeen Garg Memorial Gold Medal awarded to branch toppers for exceptional academic performance.",
      year: "Annual",
      icon: <Medal className="w-5 h-5" />,
    }
  ];

  return (
    <section
      id="awards"
      className="scroll-mt-24 relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-rose-50/30 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 2px, transparent 2px)`,
            backgroundSize: "40px 40px"
          }}
        />
        
        {/* Floating trophy icons */}
        {[
          { Icon: Trophy, top: "15%", left: "8%", size: 100, delay: 0 },
          { Icon: Award, top: "25%", right: "10%", size: 90, delay: 1 },
          { Icon: Medal, top: "65%", left: "12%", size: 110, delay: 2 },
          { Icon: Star, top: "75%", right: "15%", size: 95, delay: 3 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-sitm-gold/15 dark:text-sitm-gold/10"
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right 
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 8, -8, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <item.Icon size={item.size} strokeWidth={1.5} />
          </motion.div>
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-sitm-gold/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-sitm-maroon/25 rounded-full blur-3xl"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Hall of Fame"
          title="Awards & Achievements"
          description="Recognition of excellence in academics, innovation, and holistic development"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                rotateY: 5,
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="group relative bg-rose-50/80 dark:bg-slate-900 p-6 rounded-2xl border-2 border-sitm-maroon/40 dark:border-sitm-gold/30 hover:border-sitm-maroon dark:hover:border-sitm-gold shadow-lg hover:shadow-2xl transition-all cursor-pointer shadow-[0_0_20px_rgba(213,107,111,0.3)] dark:shadow-[0_0_20px_rgba(246,226,148,0.2)] hover:shadow-[0_0_35px_rgba(213,107,111,0.5)] dark:hover:shadow-[0_0_35px_rgba(246,226,148,0.4)]"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Icon with pulse animation */}
              <motion.div 
                className="w-14 h-14 bg-sitm-gold/20 rounded-xl flex items-center justify-center text-sitm-maroon dark:text-sitm-gold mb-4 group-hover:bg-sitm-gold group-hover:text-sitm-navy transition-all shadow-md group-hover:shadow-lg"
                whileHover={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                {award.icon}
              </motion.div>

              {/* Year Badge with animation */}
              <motion.span 
                className="absolute top-6 right-6 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-sitm-maroon/10 dark:bg-sitm-gold/10 rounded-full text-sitm-maroon dark:text-sitm-gold border border-sitm-maroon/20 dark:border-sitm-gold/20 group-hover:bg-sitm-maroon group-hover:text-white dark:group-hover:bg-sitm-gold dark:group-hover:text-sitm-navy transition-all"
                whileHover={{ scale: 1.1 }}
              >
                {award.year}
              </motion.span>

              {/* Title */}
              <h3 className="text-lg font-bold text-sitm-navy dark:text-white mb-2 group-hover:text-sitm-maroon dark:group-hover:text-sitm-gold transition-colors">
                {award.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {award.desc}
              </p>
              
              {/* Bottom accent line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-sitm-maroon to-sitm-gold rounded-b-2xl"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
