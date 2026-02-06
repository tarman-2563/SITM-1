import { motion } from "framer-motion";
import { Check, X, BookOpen, Rocket, Shield, Target, GraduationCap } from "lucide-react";

const comparisonData = [
  {
    id: "learning-style",
    category: "Learning Style",
    icon: <BookOpen className="w-4 h-4" />,
    sitm: "Practical learning from Day One for tomorrow's jobs",
    traditional: "Learn mostly through lectures and textbooks"
  },
  {
    id: "curriculum",
    category: "Curriculum",
    icon: <BookOpen className="w-4 h-4" />,
    sitm: "Regularly updated, industry-aligned curriculum shaped by practitioners and experts",
    traditional: "Outdated curriculum"
  },
  {
    id: "industry",
    category: "Industry Exposure",
    icon: <Rocket className="w-4 h-4" />,
    sitm: "Regular interactions with industry professionals, domain experts, entrepreneurs, and senior leaders",
    traditional: "Zero to low industry leaders interaction"
  },
  {
    id: "internships",
    category: "Internships",
    icon: <Target className="w-4 h-4" />,
    sitm: "3-4 paid, offline internships with real industry exposure starting after the first year",
    traditional: "No internships"
  },
  {
    id: "entrepreneurship",
    category: "Entrepreneurship",
    icon: <Rocket className="w-4 h-4" />,
    sitm: "Turn ideas into startups with mentorship & up to ₹50L seed funding",
    traditional: "Little to no startup or incubation support"
  },
  {
    id: "global",
    category: "Global Exposure",
    icon: <Shield className="w-4 h-4" />,
    sitm: "Built for global platforms - from classrooms to corporate competitions",
    traditional: "No such exposure"
  },
  {
    id: "outcome",
    category: "End Outcome",
    icon: <GraduationCap className="w-4 h-4" />,
    sitm: "Industry-ready graduates equipped with practical skills, exposure, and confidence",
    traditional: "Degree holders with limited real-world exposure"
  }
];

export function WhySITM() {
  return (
    <section id="why-sitm" className="scroll-mt-24 relative py-12 md:py-16 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-sitm-gold drop-shadow-md">
              SITM Curated
            </span>
            <span className="text-slate-400 dark:text-slate-500 mx-4 text-2xl sm:text-3xl lg:text-4xl">vs</span>
            <span className="text-slate-500 dark:text-slate-400 text-2xl sm:text-3xl lg:text-4xl">Traditional Colleges</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Your journey deserves more than just a degree. It deserves a <span className="text-sitm-gold font-bold">destination</span>.
          </p>
          
          {/* Decorative underline */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-sitm-gold rounded-full"></div>
            <div className="h-1.5 w-1.5 bg-sitm-gold rounded-full"></div>
            <div className="h-1 w-32 bg-sitm-gold rounded-full"></div>
            <div className="h-1.5 w-1.5 bg-sitm-gold rounded-full"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-sitm-gold rounded-full"></div>
          </div>
        </motion.div>

        {/* Desktop Table */}
        <div className="hidden md:block relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-[1fr_2fr_1.5fr] gap-0 relative"
          >
            {/* Left Column - What Matters + Traditional */}
            <div className="bg-white dark:bg-slate-900 rounded-l-2xl shadow-md border border-black/5 dark:border-white/10 overflow-hidden">
              {/* Header */}
              <div className="py-3 px-4 text-center border-b-2 border-black/10 dark:border-white/20 bg-gray-50 dark:bg-slate-800">
                <span className="text-xl font-bold text-slate-800 dark:text-white">What Matters</span>
              </div>
              {/* Rows */}
              {comparisonData.map((item, idx) => (
                <div 
                  key={item.id}
                  className="py-3 px-4 bg-gray-50 dark:bg-slate-800 border-b border-black/5 dark:border-white/10 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white dark:bg-slate-700 rounded-xl text-sitm-maroon dark:text-sitm-gold shadow-sm">
                      {item.icon}
                    </div>
                    <span className="font-bold text-base text-sitm-navy dark:text-white">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Column - SITM Advantage (Elevated) */}
            <div className="relative z-10 -my-4">
              <motion.div
                initial={{ y: 0 }}
                whileInView={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-sitm-gold rounded-2xl shadow-2xl border-2 border-sitm-gold-light overflow-hidden h-full"
              >
                {/* Header */}
                <div className="py-4 px-4 text-center border-b-2 border-sitm-navy/20">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-sitm-navy rounded-xl flex items-center justify-center shadow-lg">
                      <Check className="text-sitm-gold" size={24} strokeWidth={3} />
                    </div>
                    <span className="text-2xl font-bold text-sitm-navy">SITM Advantage</span>
                  </div>
                </div>
                {/* Rows */}
                {comparisonData.map((item, idx) => (
                  <div 
                    key={item.id}
                    className="py-3 px-4 border-b border-sitm-navy/10 last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <Check className="text-sitm-navy flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                      <p className="text-sm leading-relaxed text-sitm-navy font-semibold">
                        {item.sitm}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Traditional Colleges */}
            <div className="bg-white dark:bg-slate-900 rounded-r-2xl shadow-md border border-black/5 dark:border-white/10 overflow-hidden">
              {/* Header */}
              <div className="py-3 px-4 text-center border-b-2 border-black/10 dark:border-white/20 bg-gray-50 dark:bg-slate-800">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center shadow-lg">
                    <X className="text-red-600 dark:text-red-500" size={22} strokeWidth={3} />
                  </div>
                  <span className="text-xl font-bold text-slate-800 dark:text-white">Traditional Colleges</span>
                </div>
              </div>
              {/* Rows */}
              {comparisonData.map((item, idx) => (
                <div 
                  key={item.id}
                  className="py-3 px-4 bg-gray-50 dark:bg-slate-800 border-b border-black/5 dark:border-white/10 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <X className="text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                      {item.traditional}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Stacked Cards */}
        <div className="md:hidden space-y-4">
          {comparisonData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-black/5 dark:border-white/10 overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gray-50 dark:bg-slate-800 px-4 py-3 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-sitm-maroon dark:text-sitm-gold">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-sm text-sitm-navy dark:text-white">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* SITM */}
              <div className="px-4 py-4 bg-sitm-gold border-b border-black/5 dark:border-white/10 relative shadow-[0_0_15px_rgba(246,226,148,0.3)]">
                <div className="flex items-start gap-2 mb-2">
                  <Check className="text-sitm-navy flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                  <span className="text-xs font-bold uppercase tracking-wider text-sitm-navy">SITM</span>
                </div>
                <p className="text-sm leading-relaxed text-sitm-navy font-semibold">
                  {item.sitm}
                </p>
              </div>

              {/* Traditional */}
              <div className="px-4 py-4">
                <div className="flex items-start gap-2 mb-2">
                  <X className="text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Traditional</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                  {item.traditional}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
