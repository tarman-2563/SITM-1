import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, X, BookOpen, Rocket, Shield, Target, GraduationCap, Building2 } from "lucide-react";

const comparisonData = [
  {
    id: "learning-style",
    category: "Learning Style",
    icon: <BookOpen className="w-5 h-5" />,
    sitm: "Practical learning from Day One for tomorrow's jobs",
    traditional: "Learn mostly through lectures and textbooks"
  },
  {
    id: "curriculum",
    category: "Curriculum",
    icon: <BookOpen className="w-5 h-5" />,
    sitm: "Regularly updated, industry-aligned curriculum shaped by practitioners and experts",
    traditional: "Outdated curriculum"
  },
  {
    id: "industry",
    category: "Industry Exposure",
    icon: <Rocket className="w-5 h-5" />,
    sitm: "Regular interactions with industry professionals, domain experts, entrepreneurs, and senior leaders across engineering, technology, and management sectors.",
    traditional: "Zero to low industry leaders interaction"
  },
  {
    id: "internships",
    category: "Internships",
    icon: <Target className="w-5 h-5" />,
    sitm: "3-4 paid, offline internships with real industry exposure starting after the first year and integrated across the academic journey.",
    traditional: "No internships"
  },
  {
    id: "entrepreneurship",
    category: "Entrepreneurship",
    icon: <Rocket className="w-5 h-5" />,
    sitm: "Turn ideas into startups with mentorship & up to ₹50L seed funding",
    traditional: "Little to no startup or incubation support"
  },
  {
    id: "global",
    category: "Global Exposure",
    icon: <Shield className="w-5 h-5" />,
    sitm: "Built for global platforms - from classrooms to corporate competitions.",
    traditional: "No such exposure"
  },
  {
    id: "outcome",
    category: "End Outcome",
    icon: <GraduationCap className="w-5 h-5" />,
    sitm: "Industry-ready graduates equipped with practical skills, exposure, and confidence",
    traditional: "Degree holders with limited real-world exposure"
  }
];

export function WhySITM() {
  const [activeTab, setActiveTab] = useState(comparisonData[0].id);

  return (
    <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-500">
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        ></div>

        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#D56B6F]/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ x: [0, 80, 0], y: [0, -100, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[5%] w-[60%] h-[60%] bg-[#F6E294]/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-8 relative">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-sitm-navy dark:text-white mt-2 leading-tight">
            <span className="bg-gradient-to-r from-sitm-navy via-sitm-maroon to-sitm-navy dark:from-sitm-gold dark:via-white dark:to-sitm-gold bg-clip-text text-transparent">
              SITM Curated
            </span>
            <span className="text-slate-400 mx-3">vs</span>
            <span className="text-slate-700 dark:text-slate-300">Traditional College Experience</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto italic">
            "Your journey deserves more than just a degree. It deserves a destination."
          </p>
        </div>

        {/* Premium Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full px-[20px] overflow-x-auto pb-8 scrollbar-hide"
        >
          <div className="min-w-[800px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-widest text-white/60 border-b border-white/10 w-1/4 bg-sitm-navy">
                    What Matters Today
                  </th>
                  <th className="py-3 px-4 text-left border-b border-yellow-200 w-2/5 bg-sitm-gold">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                        <Check className="text-sitm-navy" size={16} />
                      </div>
                      <span className="text-lg font-serif font-bold text-sitm-navy">SITM Advantage</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-slate-200 w-1/3 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <X className="text-red-500" size={16} />
                      </div>
                      <span className="text-lg font-serif font-bold text-slate-900">Traditional Colleges</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, idx) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Category Column */}
                    <td 
                      className={`py-3 px-4 border-b border-white/10 bg-sitm-navy cursor-pointer transition-all duration-300 ${activeTab === item.id ? 'py-6 px-6' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-white/10 rounded-lg transition-colors ${activeTab === item.id ? 'text-sitm-gold bg-white/20' : 'text-white/60'}`}>
                          {/* Scale icon down slightly */}
                          <div className="scale-90">{item.icon}</div>
                        </div>
                        <span className={`font-bold text-sm transition-colors ${activeTab === item.id ? 'text-white' : 'text-white/60'}`}>
                          {item.category}
                        </span>
                      </div>
                    </td>

                    {/* SITM Column (Highlighted) */}
                    <td className={`py-3 px-4 bg-sitm-gold border-b border-yellow-200 relative transition-all duration-300 ${activeTab === item.id ? 'py-6 px-6 scale-[1.02] shadow-2xl z-20' : 'opacity-80'}`}>
                      {/* Premium Accent Line for SITM Column */}
                      <div className="absolute inset-y-0 left-0 w-1 bg-white/30 group-hover:bg-white/60 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                      
                      <p className="text-sm leading-relaxed font-bold text-sitm-navy">
                        {item.sitm}
                      </p>
                    </td>

                    {/* Traditional Column */}
                    <td className={`py-3 px-4 border-b border-slate-200 bg-white transition-all duration-300 ${activeTab === item.id ? 'py-6 px-6 scale-[1.02] shadow-xl z-20' : 'opacity-60'}`}>
                      <p className="text-sm leading-relaxed text-slate-800 font-medium">
                        {item.traditional}
                      </p>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Subtle Mobile Hint */}
          <div className="lg:hidden flex items-center justify-center gap-2 mt-6 text-slate-400 text-sm animate-pulse">
            <div className="w-12 h-1 bg-slate-200 rounded-full" />
            <span>Swipe horizontally to see full comparison</span>
            <div className="w-12 h-1 bg-slate-200 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
