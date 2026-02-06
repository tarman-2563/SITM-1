import { Building2, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "../common/SectionHeader";
import { Counter } from "../common/Counter";

export function Placements() {
  return (
    <section id="placement" className="scroll-mt-24 relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-rose-50/30 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 3px, transparent 3px)`,
            backgroundSize: "40px 40px"
          }}
        />
        
        {/* Floating animated icons */}
        {[
          { Icon: Building2, top: "10%", left: "5%", size: 120, delay: 0 },
          { Icon: TrendingUp, top: "20%", right: "8%", size: 110, delay: 2 },
          { Icon: Award, top: "60%", left: "10%", size: 130, delay: 4 },
          { Icon: Users, top: "70%", right: "12%", size: 115, delay: 1 },
          { Icon: Building2, top: "40%", right: "5%", size: 100, delay: 3 },
          { Icon: TrendingUp, top: "80%", left: "15%", size: 95, delay: 5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-sitm-gold/20 dark:text-sitm-gold/10"
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right 
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.3, 0.2],
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
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sitm-gold/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-sitm-maroon/30 rounded-full blur-3xl"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <SectionHeader
          title={
            <>
              Training & <span className="text-sitm-gold">Placements</span>
            </>
          }
          description="Building bridges between academic excellence and industry success"
        />
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              label: "Highest Package",
              value: <Counter from={1} to={12} duration={2} suffix=" LPA" />,
              icon: TrendingUp,
            },
            {
              label: "Partner Companies",
              value: "1500+",
              icon: Building2,
            },
            {
              label: "Students Placed",
              value: "95%",
              icon: Users,
            },
            {
              label: "Industry Awards",
              value: "25+",
              icon: Award,
            },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02
              }}
              className="bg-rose-50/80 dark:bg-slate-900 p-8 rounded-2xl border-2 border-sitm-maroon/40 dark:border-sitm-gold/30 text-center hover:border-sitm-maroon dark:hover:border-sitm-gold hover:bg-rose-100 dark:hover:bg-slate-800 hover:shadow-2xl transition-all shadow-lg cursor-pointer shadow-[0_0_25px_rgba(213,107,111,0.4)] dark:shadow-[0_0_25px_rgba(246,226,148,0.3)] hover:shadow-[0_0_40px_rgba(213,107,111,0.6)] dark:hover:shadow-[0_0_40px_rgba(246,226,148,0.6)]"
            >
              <div className="w-14 h-14 mx-auto bg-sitm-gold/20 rounded-xl flex items-center justify-center text-sitm-maroon dark:text-sitm-gold mb-4 shadow-md">
                <stat.icon size={28} strokeWidth={2.5} />
              </div>
              <div className="text-4xl md:text-5xl font-serif font-black mb-3 text-sitm-navy dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-white">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="bg-rose-50 dark:bg-slate-900 rounded-2xl p-8 border-2 border-sitm-maroon/40 dark:border-sitm-gold/30 shadow-[0_0_30px_rgba(213,107,111,0.4)] dark:shadow-[0_0_30px_rgba(246,226,148,0.3)] relative before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-sitm-maroon/20 dark:before:border-sitm-gold/15 before:pointer-events-none before:-m-1"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-sitm-navy dark:text-white">
              <span className="text-sitm-navy dark:text-white">
                1500+
              </span> Placement Partners
            </h2>
          </div>
            
          {/* Marquee Row 1 */}
          <div className="relative flex overflow-x-hidden group mb-6 py-4">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
              {[
                { name: "TATA Consultancy Services", color: "text-[#3577BB]", logo: "tcs.com" },
                { name: "Wipro", color: "text-[#0070AD]", logo: "wipro.com" },
                { name: "Infosys", color: "text-[#007CC3]", logo: "infosys.com" },
                { name: "Capgemini", color: "text-[#0070AD]", logo: "capgemini.com" },
                { name: "HDFC Bank", color: "text-[#004C8F]", logo: "hdfcbank.com" },
                { name: "Amazon", color: "text-[#FF9900]", logo: "amazon.com" },
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
                { name: "Amazon", color: "text-[#FF9900]", logo: "amazon.com" },
                { name: "Tech Mahindra", color: "text-[#E51A2C]", logo: "techmahindra.com" },
                { name: "Cognizant", color: "text-[#0033A0]", logo: "cognizant.com" },
                { name: "Accenture", color: "text-[#A100FF]", logo: "accenture.com" },
                { name: "IBM", color: "text-[#052FAD]", logo: "ibm.com" },
              ].map((company, i) => (
                <div key={`r1-${i}`} className="inline-flex items-center gap-3 px-8 py-5 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 shrink-0 hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 shrink-0 bg-white dark:bg-slate-700 rounded-xl p-1 flex items-center justify-center border border-gray-100 dark:border-slate-600 overflow-hidden shadow-sm">
                    <img 
                      src={`https://unavatar.io/${company.logo}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`} 
                      alt={company.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className={`text-lg font-black ${company.color} dark:text-white transition-colors whitespace-nowrap`}>{company.name}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Marquee Row 2 (Reverse) */}
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
                <div key={`r2-${i}`} className="inline-flex items-center gap-3 px-8 py-5 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 shrink-0 hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 shrink-0 bg-white dark:bg-slate-700 rounded-xl p-1 flex items-center justify-center border border-gray-100 dark:border-slate-600 overflow-hidden shadow-sm">
                    <img 
                      src={`https://unavatar.io/${company.logo}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`} 
                      alt={company.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className={`text-lg font-black ${company.color} dark:text-white transition-colors whitespace-nowrap`}>{company.name}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Marquee Row 3 */}
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
                <div key={`r3-${i}`} className="inline-flex items-center gap-3 px-8 py-5 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 shrink-0 hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 shrink-0 bg-white dark:bg-slate-700 rounded-xl p-1 flex items-center justify-center border border-gray-100 dark:border-slate-600 overflow-hidden shadow-sm">
                    <img 
                      src={`https://unavatar.io/${company.logo}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`} 
                      alt={company.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className={`text-lg font-black ${company.color} dark:text-white transition-colors whitespace-nowrap`}>{company.name}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
