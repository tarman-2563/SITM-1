import { motion } from "framer-motion";
import { Trophy, Award, Star, Medal, Users, BookOpen } from "lucide-react";

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
    <section id="awards" className="py-24 bg-linear-to-b
      from-purple-300
      via-white
      to-[#7b2d2d]/20

      dark:bg-slate-950
      transition-colors duration-300 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-sitm-gold/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-sitm-maroon/5 rounded-full blur-3xl"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-6 font-serif"
          >
            <p className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-yellow-400 to-green-600 relative z-10 px-2">
              Awards & Achievements
            </p>
            
          </motion.h2>
        </div>

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-gray-50 dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:shadow-sitm-navy/5 transition-all duration-300 hover:-translate-y-2"
        >
            <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-xl ${award.color} bg-opacity-10 text-sitm-navy dark:text-white group-hover:bg-opacity-20 transition-all`}>
                    <div className={`${award.color.replace('bg-', 'text-')} dark:text-white`}>
                        {award.icon}
                    </div>
                </div>
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white dark:bg-slate-900 rounded-full border border-gray-200 dark:border-slate-700 text-gray-500">
                    {award.year}
                </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-sitm-navy dark:text-white mb-3 group-hover:text-sitm-maroon dark:group-hover:text-sitm-gold transition-colors">
                {award.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {award.desc}
            </p>

             <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sitm-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </motion.div>
    );
}
