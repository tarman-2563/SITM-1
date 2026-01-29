import { Building2, TrendingUp, Users, Award, Cpu, Globe, Database, Code, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Counter } from "../common/Counter";

export function Placements() {
  return (
    <section id="placement" className="relative py-20 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Advanced "Neural Circuit" Background - 60/20/12/8 Re-design */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Subtle Navy Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-sitm-navy) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}>
        </div>

        {/* Layer 2: Animated Neural Circuit SVG (Navy Paths) */}
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-sitm-navy)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--color-sitm-navy)" stopOpacity="0.4" />
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
          <path d="M 0 100 Q 200 150 400 100 T 800 150" fill="none" stroke="url(#navyGrad)" strokeWidth="1.5" />
          <path d="M 1000 800 Q 800 750 600 800 T 200 750" fill="none" stroke="url(#navyGrad)" strokeWidth="1.5" />
          <path d="M 100 0 L 300 300 L 0 600" fill="none" stroke="var(--color-sitm-navy)" strokeWidth="0.5" opacity="0.2" />
          <path d="M 900 0 L 700 300 L 1000 600" fill="none" stroke="var(--color-sitm-navy)" strokeWidth="0.5" opacity="0.2" />

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
                duration: 6 + i, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 1.5 
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

        {/* Layer 3: Floating Tech Icons (Maroon/Navy) */}
        <div className="absolute inset-0">
          {[
            { Icon: Cpu, top: "15%", left: "10%", size: 40, color: "var(--color-sitm-navy)" },
            { Icon: Globe, top: "70%", left: "5%", size: 30, color: "var(--color-sitm-maroon)" },
            { Icon: Database, top: "20%", left: "85%", size: 35, color: "var(--color-sitm-navy)" },
            { Icon: Code, top: "80%", left: "90%", size: 25, color: "var(--color-sitm-maroon)" },
            { Icon: Zap, top: "45%", left: "92%", size: 20, color: "var(--color-sitm-gold)" },
          ].map((item, i) => (
            <motion.div
              key={`tech-${i}`}
              className="absolute opacity-[0.08] dark:opacity-20"
              style={{ top: item.top, left: item.left, color: item.color }}
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 15, -15, 0],
              }}
              transition={{ 
                duration: 7 + i, 
                repeat: Infinity, 
                ease: "easeInOut",
              }}
            >
              <item.Icon size={item.size} />
            </motion.div>
          ))}
        </div>

        {/* Layer 4: Subtle Navy Glows */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-sitm-navy/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-sitm-maroon/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="text-center mb-16">
          <span className="text-sitm-maroon font-serif italic text-lg dark:text-sitm-gold">Corporate Relations</span>
          <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">Training & Placements</h2>
          <div className="w-24 h-1 bg-sitm-gold mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
                { label: "Highest Package", value: <Counter from={1} to={12} duration={3} suffix=" LPA" />, icon: TrendingUp },
                { label: "Partner Companies", value: "150+", icon: Building2 },
                { label: "Students Placed", value: "95%", icon: Users },
                { label: "Industry Awards", value: "25+", icon: Award },
            ].map((stat, i) => (
                <div key={i} className="bg-gray-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 text-center hover:-translate-y-2 transition-transform duration-300 group">
                    <div className="w-16 h-16 mx-auto bg-sitm-gold/10 rounded-full flex items-center justify-center text-sitm-maroon dark:text-sitm-gold mb-4 group-hover:bg-sitm-maroon group-hover:text-white transition-colors duration-300">
                        <stat.icon size={32} />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold font-serif text-sitm-navy dark:text-white mb-2">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wide text-gray-500">{stat.label}</div>
                </div>
            ))}
        </div>

        <div className="bg-sitm-navy/5 dark:bg-white/5 rounded-3xl p-10">
            <h3 className="text-2xl font-bold font-serif text-center mb-10 text-sitm-navy dark:text-white">Our Placement Companies</h3>
            
            {/* Infinite Scroll Marquee */}
            {/* Infinite Scroll Marquee */}
            {/* Infinite Scroll Marquee - Row 1 */}
            <div className="relative flex overflow-x-hidden group mb-6">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                    {[
                        { name: "TATA Consultancy Services", color: "text-[#3577BB]", logo: "tcs.com" },
                        { name: "Wipro", color: "text-[#000000]", logo: "wipro.com" },
                        { name: "Infosys", color: "text-[#007CC3]", logo: "infosys.com" },
                        { name: "Capgemini", color: "text-[#0070AD]", logo: "capgemini.com" },
                        { name: "HDFC Bank", color: "text-[#004C8F]", logo: "hdfcbank.com" },
                        { name: "Amazon", color: "text-[#232F3E]", logo: "amazon.com" },
                        { name: "Tech Mahindra", color: "text-[#E51A2C]", logo: "techmahindra.com" },
                        { name: "Cognizant", color: "text-[#0033A0]", logo: "cognizant.com" },
                        { name: "Accenture", color: "text-[#A100FF]", logo: "accenture.com" },
                        { name: "IBM", color: "text-[#052FAD]", logo: "ibm.com" },
                        // Duplicates for loop
                        { name: "TATA Consultancy Services", color: "text-[#3577BB]", logo: "tcs.com" },
                        { name: "Wipro", color: "text-[#000000]", logo: "wipro.com" },
                        { name: "Infosys", color: "text-[#007CC3]", logo: "infosys.com" },
                        { name: "Capgemini", color: "text-[#0070AD]", logo: "capgemini.com" },
                        { name: "HDFC Bank", color: "text-[#004C8F]", logo: "hdfcbank.com" },
                        { name: "Amazon", color: "text-[#232F3E]", logo: "amazon.com" },
                        { name: "Tech Mahindra", color: "text-[#E51A2C]", logo: "techmahindra.com" },
                        { name: "Cognizant", color: "text-[#0033A0]", logo: "cognizant.com" },
                        { name: "Accenture", color: "text-[#A100FF]", logo: "accenture.com" },
                        { name: "IBM", color: "text-[#052FAD]", logo: "ibm.com" },
                    ].map((company, i) => (
                        <div key={`r1-${i}`} className="inline-flex items-center gap-6 px-10 py-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800 min-w-[380px] hover:scale-105 transition-transform duration-300">
                             <div className="w-20 h-20 flex-shrink-0 bg-white rounded-xl p-3 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                                <img 
                                    src={`https://unavatar.io/${company.logo}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`} 
                                    alt={company.name} 
                                    className="w-full h-full object-contain"
                                />
                             </div>
                            <span className={`text-2xl font-black ${company.color} transition-colors whitespace-nowrap`}>{company.name}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent z-10"></div>
            </div>

            {/* Infinite Scroll Marquee - Row 2 (Reverse) */}
            <div className="relative flex overflow-x-hidden group mb-6">
                <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-8">
                    {[
                        { name: "Microsoft", color: "text-[#00A4EF]", logo: "microsoft.com" },
                        { name: "Google", color: "text-[#4285F4]", logo: "google.com" },
                        { name: "Deloitte", color: "text-[#86BC25]", logo: "deloitte.com" },
                        { name: "Genus", color: "text-[#F58220]", logo: "genuspower.com" },
                        { name: "ITC Limited", color: "text-[#000000]", logo: "itcportal.com" },
                        { name: "Emami", color: "text-[#00964D]", logo: "emamiltd.in" },
                        { name: "Britannia", color: "text-[#ED1C24]", logo: "britannia.co.in" },
                        { name: "Sutherland", color: "text-[#C8102E]", logo: "sutherlandglobal.com" },
                        { name: "Mahindra", color: "text-[#E31837]", logo: "mahindra.com" },
                        { name: "JCB", color: "text-[#FDB913]", logo: "jcb.com" },
                         // Duplicates for loop
                        { name: "Microsoft", color: "text-[#00A4EF]", logo: "microsoft.com" },
                        { name: "Google", color: "text-[#4285F4]", logo: "google.com" },
                        { name: "Deloitte", color: "text-[#86BC25]", logo: "deloitte.com" },
                        { name: "Genus", color: "text-[#F58220]", logo: "genuspower.com" },
                        { name: "ITC Limited", color: "text-[#000000]", logo: "itcportal.com" },
                        { name: "Emami", color: "text-[#00964D]", logo: "emamiltd.in" },
                        { name: "Britannia", color: "text-[#ED1C24]", logo: "britannia.co.in" },
                        { name: "Sutherland", color: "text-[#C8102E]", logo: "sutherlandglobal.com" },
                        { name: "Mahindra", color: "text-[#E31837]", logo: "mahindra.com" },
                        { name: "JCB", color: "text-[#FDB913]", logo: "jcb.com" },
                    ].map((company, i) => (
                        <div key={`r2-${i}`} className="inline-flex items-center gap-6 px-10 py-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800 min-w-[380px] hover:scale-105 transition-transform duration-300">
                             <div className="w-20 h-20 flex-shrink-0 bg-white rounded-xl p-3 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                                <img 
                                    src={`https://unavatar.io/${company.logo}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`} 
                                    alt={company.name} 
                                    className="w-full h-full object-contain"
                                />
                             </div>
                            <span className={`text-2xl font-black ${company.color} transition-colors whitespace-nowrap`}>{company.name}</span>
                        </div>
                    ))}
                </div>
                 <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent z-10"></div>
            </div>

            {/* Infinite Scroll Marquee - Row 3 */}
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                    {[
                        { name: "BSNL", color: "text-[#005CA9]", logo: "bsnl.co.in" },
                        { name: "Oil India", color: "text-[#D71920]", logo: "oil-india.com" },
                        { name: "PWD", color: "text-[#FFD200]", logo: "assam.gov.in" },
                        { name: "NRL", color: "text-[#0054A6]", logo: "nrl.co.in" },
                        { name: "Ava Intern", color: "text-[#F9A825]", logo: "ava.it" },
                        { name: "Jindal Steel", color: "text-[#C41230]", logo: "jindalsteelpower.com" },
                        { name: "APDCL", color: "text-[#2E3192]", logo: "apdcl.org" },
                        { name: "L&T", color: "text-[#0075C2]", logo: "larsentoubro.com" },
                        { name: "Indian Oil", color: "text-[#F47920]", logo: "iocl.com" },
                        { name: "Quality Austria", color: "text-[#E30613]", logo: "qualityaustria.com" },
                        // Duplicates for loop
                        { name: "BSNL", color: "text-[#005CA9]", logo: "bsnl.co.in" },
                        { name: "Oil India", color: "text-[#D71920]", logo: "oil-india.com" },
                        { name: "PWD", color: "text-[#FFD200]", logo: "assam.gov.in" },
                        { name: "NRL", color: "text-[#0054A6]", logo: "nrl.co.in" },
                        { name: "Ava Intern", color: "text-[#F9A825]", logo: "ava.it" },
                        { name: "Jindal Steel", color: "text-[#C41230]", logo: "jindalsteelpower.com" },
                        { name: "APDCL", color: "text-[#2E3192]", logo: "apdcl.org" },
                        { name: "L&T", color: "text-[#0075C2]", logo: "larsentoubro.com" },
                        { name: "Indian Oil", color: "text-[#F47920]", logo: "iocl.com" },
                        { name: "Quality Austria", color: "text-[#E30613]", logo: "qualityaustria.com" },
                    ].map((company, i) => (
                        <div key={`r3-${i}`} className="inline-flex items-center gap-6 px-10 py-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800 min-w-[380px] hover:scale-105 transition-transform duration-300">
                             <div className="w-20 h-20 flex-shrink-0 bg-white rounded-xl p-3 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                                <img 
                                    src={`https://unavatar.io/${company.logo}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`} 
                                    alt={company.name} 
                                    className="w-full h-full object-contain"
                                />
                             </div>
                            <span className={`text-2xl font-black ${company.color} transition-colors whitespace-nowrap`}>{company.name}</span>
                        </div>
                    ))}
                </div>
                 <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent z-10"></div>
            </div>
        </div>
      </div>
    </section>
  );
}
