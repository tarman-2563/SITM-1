import { Building2, TrendingUp, Users, Award, Cpu, Globe, Database, Code, Zap, Briefcase, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Counter } from "../common/Counter";

export function Placements() {

  return (
    <section id="placement" className="relative py-28 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background Aurora/Glow Graphics - About Style with Bold Icons */}
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
            { Icon: Briefcase, top: "10%", left: "5%", size: 140, rotate: 15 },
            { Icon: GraduationCap, top: "60%", left: "85%", size: 160, rotate: -15 },
            { Icon: Building2, top: "75%", left: "10%", size: 130, rotate: 10 },
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

      <div className="container relative mx-auto px-4 z-10">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-6 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-sitm-gold/10 text-sitm-maroon dark:text-sitm-gold">
            Corporate Relations @ SITM
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-sitm-navy dark:text-white mt-2">
            Training & <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-sitm-gold">Placements</span>
          </h2>
        </motion.div>
        
        {/* Stats Section: Mobile Scrollable Row / Desktop Grid */}
        <div className="flex md:grid md:grid-cols-4 gap-6 mb-20 overflow-x-auto scrollbar-hide snap-x snap-mandatory pt-4 pb-6 md:pb-0 px-2 md:px-0">
            {[
                    {
                      label: "Highest Package",
                      value: (
                          <motion.span
                            animate={{
                              scale: [1, 1.10, 1],
                              opacity: [1, 0.85, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="inline-block"
                          >
                            <Counter from={1} to={12} duration={2} suffix=" LPA" />
                          </motion.span>
                        ),
                      icon: TrendingUp,
                      side: "left"
                    },
                    {
                      label: "Partner Companies",
                      value: "1500+",
                      icon: Building2,
                      side: "left"
                    },
                    {
                      label: "Students Placed",
                      value: "95%",
                      icon: Users,
                      side: "right"
                    },
                    {
                      label: "Industry Awards",
                      value: "25+",
                      icon: Award,
                      side: "right"
                    },
                  ]
                  .map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: stat.side === "left" ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="min-w-[260px] md:min-w-0 flex-shrink-0 snap-center bg-sitm-gold/10 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-sitm-gold/20 text-center hover:-translate-y-2 transition-transform duration-300 group"
                >
                    <div className="w-16 h-16 mx-auto bg-sitm-gold/10 rounded-full flex items-center justify-center text-sitm-maroon dark:text-sitm-gold mb-4 group-hover:bg-sitm-maroon group-hover:text-white transition-colors duration-300">
                        <stat.icon size={32} />
                    </div>
                      <div className="text-3xl md:text-4xl font-serif font-black mb-2 text-transparent bg-clip-text bg-linear-to-r from-sitm-maroon to-sitm-navy dark:from-sitm-gold dark:to-white">
                        {stat.value}
                      </div>

                    <div className="text-[10px] font-black uppercase tracking-widest text-sitm-navy/50 dark:text-gray-400">{stat.label}</div>
                </motion.div>
            ))}
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-sitm-gold/5 dark:bg-white/5 backdrop-blur-2xl rounded-4xl p-10 border border-sitm-gold/20"
        >
        <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-serif font-black leading-tight text-sitm-navy dark:text-white">
                <span className="bg-clip-text text-transparent bg-linear-to-r from-sitm-maroon to-sitm-navy dark:from-sitm-gold dark:to-white">
                  1500+
                </span> Placement Partners
            </h2>
        </div>
            
            {/* Infinite Scroll Marquee */}
            {/* Infinite Scroll Marquee */}
            {/* Infinite Scroll Marquee - Row 1 */}
            <div className="relative flex overflow-x-hidden group mb-6 py-4">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
                    {[
                        { name: "TATA Consultancy Services", color: "text-[#3577BB]", logo: "tcs.com" },
                        { name: "Wipro", color: "text-[#0070AD]", logo: "wipro.com" },
                        { name: "Infosys", color: "text-[#007CC3]", logo: "infosys.com" },
                        { name: "Capgemini", color: "text-[#0070AD]", logo: "capgemini.com" },
                        { name: "HDFC Bank", color: "text-[#004C8F]", logo: "hdfcbank.com" },
                        { name: "Amazon", color: "text-[#0070AD]", logo: "amazon.com" },
                        { name: "Tech Mahindra", color: "text-[#E51A2C]", logo: "techmahindra.com" },
                        { name: "Cognizant", color: "text-[#0033A0]", logo: "cognizant.com" },
                        { name: "Accenture", color: "text-[#A100FF]", logo: "accenture.com" },
                        { name: "IBM", color: "text-[#052FAD]", logo: "ibm.com" },
                        // Duplicates for loop
                        { name: "TATA Consultancy Services", color: "text-[#3577BB]", logo: "tcs.com" },
                        { name: "Wipro", color: "text-[#0070AD]", logo: "wipro.com" },
                        { name: "Infosys", color: "text-[#007CC3]", logo: "infosys.com" },
                        { name: "Capgemini", color: "text-[#0070AD]", logo: "capgemini.com" },
                        { name: "HDFC Bank", color: "text-[#004C8F]", logo: "hdfcbank.com" },
                        { name: "Amazon", color: "text-[#0070AD]", logo: "amazon.com" },
                        { name: "Tech Mahindra", color: "text-[#E51A2C]", logo: "techmahindra.com" },
                        { name: "Cognizant", color: "text-[#0033A0]", logo: "cognizant.com" },
                        { name: "Accenture", color: "text-[#A100FF]", logo: "accenture.com" },
                        { name: "IBM", color: "text-[#052FAD]", logo: "ibm.com" },
                    ].map((company, i) => (
                        <div key={`r1-${i}`} className="inline-flex items-center gap-0 px-10 py-6 bg-white rounded-2xl shadow-md border border-gray-100 dark:border-slate-200 w-auto shrink-0 hover:scale-105 transition-transform duration-300">
                             <div className="w-10 h-10 shrink-0 bg-white rounded-xl p-1 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                                <img 
                                    src={`https://unavatar.io/${company.logo}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`} 
                                    alt={company.name} 
                                    className="w-full h-full object-contain"
                                />
                             </div>
                            <span className={`text-1xl font-black ${company.color} transition-colors whitespace-nowrap`}>{company.name}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 left-0 w-20 h-full bg-linear-to-r from-gray-50  to-transparent z-2"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-linear-to-l from-gray-50 to-transparent z-2"></div>
            </div>

            {/* Infinite Scroll Marquee - Row 2 (Reverse) */}
            <div className="relative flex overflow-x-hidden group mb-6 py-4">
                <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-4">
                    {[
                        { name: "Microsoft", color: "text-[#00A4EF]", logo: "microsoft.com" },
                        { name: "Google", color: "text-[#4285F4]", logo: "google.com" },
                        { name: "Deloitte", color: "text-[#86BC25]", logo: "deloitte.com" },
                        { name: "Genus", color: "text-[#F58220]", logo: "genuspower.com" },
                        { name: "ITC Limited", color: "text-[#0070AD]", logo: "itcportal.com" },
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
                        { name: "ITC Limited", color: "text-[#0070AD]", logo: "itcportal.com" },
                        { name: "Emami", color: "text-[#00964D]", logo: "emamiltd.in" },
                        { name: "Britannia", color: "text-[#ED1C24]", logo: "britannia.co.in" },
                        { name: "Sutherland", color: "text-[#C8102E]", logo: "sutherlandglobal.com" },
                        { name: "Mahindra", color: "text-[#E31837]", logo: "mahindra.com" },
                        { name: "JCB", color: "text-[#FDB913]", logo: "jcb.com" },
                    ].map((company, i) => (
                        <div key={`r2-${i}`} className="inline-flex items-center gap-0 px-10 py-6 bg-white rounded-2xl shadow-md border border-gray-100 dark:border-slate-200 w-auto shrink-0 hover:scale-105 transition-transform duration-300">
                             <div className="w-10 h-10 shrink-0 bg-white rounded-xl p-1 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
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
                 <div className="absolute top-0 left-0 w-20 h-full bg-linear-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-linear-to-l from-gray-50 to-transparent z-10"></div>
            </div>

            {/* Infinite Scroll Marquee - Row 3 */}
            <div className="relative flex overflow-x-hidden group py-4">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
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
                        <div key={`r3-${i}`} className="inline-flex items-center gap-0 px-10 py-6 bg-white  rounded-2xl shadow-md border border-gray-100 dark:border-slate-200 w-auto shrink-0 hover:scale-105 transition-transform duration-300">
                             <div className="w-10 h-10 shrink-0 bg-white rounded-xl p-1 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
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
                 <div className="absolute top-0 left-0 w-20 h-full bg-linear-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-linear-to-l from-gray-50 to-transparent z-10"></div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}

