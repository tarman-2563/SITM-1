import { cloneElement, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Building2, LayoutGrid, Code2, Palette, BarChart3, Cloud, Terminal, Brain, Database, ShieldCheck, TestTube2, Settings2, Rocket, Users } from "lucide-react";

const mentors = [
  { name: "Amit Sharma", role: "Product Manager", company: "Google", domain: "google.com", photo: "https://randomuser.me/api/portraits/men/32.jpg", icon: <LayoutGrid className="text-indigo-500" /> },
  { name: "Bhavya Singh", role: "Software Engineer", company: "Microsoft", domain: "microsoft.com", photo: "https://randomuser.me/api/portraits/women/45.jpg", icon: <Code2 className="text-blue-500" /> },
  { name: "Chetan Das", role: "UX Designer", company: "Amazon", domain: "amazon.com", photo: "https://randomuser.me/api/portraits/men/76.jpg", icon: <Palette className="text-pink-500" /> },
  { name: "Divya Patel", role: "Data Scientist", company: "Meta", domain: "meta.com", photo: "https://randomuser.me/api/portraits/women/65.jpg", icon: <BarChart3 className="text-emerald-500" /> },
  { name: "Eshan Roy", role: "Cloud Architect", company: "AWS", domain: "aws.amazon.com", photo: "https://randomuser.me/api/portraits/men/54.jpg", icon: <Cloud className="text-sky-500" /> },
  { name: "Farhan Khan", role: "Tech Lead", company: "Netflix", domain: "netflix.com", photo: "https://randomuser.me/api/portraits/men/81.jpg", icon: <Terminal className="text-red-500" /> },
  { name: "Ishita Gupta", role: "AI Researcher", company: "DeepMind", domain: "deepmind.com", photo: "https://randomuser.me/api/portraits/women/12.jpg", icon: <Brain className="text-purple-500" /> },
  { name: "Kabir Verma", role: "Frontend Dev", company: "Vercel", domain: "vercel.com", photo: "https://randomuser.me/api/portraits/men/22.jpg", icon: <Code2 className="text-cyan-400" /> },
  { name: "Meera Kaur", role: "General Manager", company: "Apple", domain: "apple.com", photo: "https://randomuser.me/api/portraits/women/33.jpg", icon: <Settings2 className="text-orange-500" /> },
  { name: "Nitin Jain", role: "VP Engineering", company: "Salesforce", domain: "salesforce.com", photo: "https://randomuser.me/api/portraits/men/44.jpg", icon: <Database className="text-blue-600" /> },
  { name: "Prisha Rao", role: "Lead Designer", company: "Adobe", domain: "adobe.com", photo: "https://randomuser.me/api/portraits/women/55.jpg", icon: <Palette className="text-rose-500" /> },
  { name: "Rohan Malhotra", role: "Senior Dev", company: "IBM", domain: "ibm.com", photo: "https://randomuser.me/api/portraits/men/66.jpg", icon: <Code2 className="text-blue-700" /> },
  { name: "Sanya Bose", role: "Product Owner", company: "Uber", domain: "uber.com", photo: "https://randomuser.me/api/portraits/women/77.jpg", icon: <LayoutGrid className="text-gray-900 dark:text-white" /> },
  { name: "Tushar Gupta", role: "Growth Lead", company: "LinkedIn", domain: "linkedin.com", photo: "https://randomuser.me/api/portraits/men/88.jpg", icon: <BarChart3 className="text-blue-500" /> },
  { name: "Ulfat Ali", role: "DevOps Eng", company: "Github", domain: "github.com", photo: "https://randomuser.me/api/portraits/women/99.jpg", icon: <Rocket className="text-orange-600" /> },
  { name: "Vikrant Sahni", role: "Security Eng", company: "Palantir", domain: "palantir.com", photo: "https://randomuser.me/api/portraits/men/1.jpg", icon: <ShieldCheck className="text-red-700" /> },
  { name: "Zara Sheikh", role: "Backend Eng", company: "Stripe", domain: "stripe.com", photo: "https://randomuser.me/api/portraits/women/2.jpg", icon: <Database className="text-indigo-400" /> },
  { name: "Aarav Pillai", role: "Mobile Dev", company: "Spotify", domain: "spotify.com", photo: "https://randomuser.me/api/portraits/men/3.jpg", icon: <Code2 className="text-green-500" /> },
  { name: "Ishani Das", role: "QA Lead", company: "Oracle", domain: "oracle.com", photo: "https://randomuser.me/api/portraits/women/4.jpg", icon: <TestTube2 className="text-red-400" /> },
  { name: "Lalit Mehra", role: "Architect", company: "Tesla", domain: "tesla.com", photo: "https://randomuser.me/api/portraits/men/5.jpg", icon: <Building2 className="text-red-600" /> },
];

const row1 = mentors.slice(0, 10);
const row2 = mentors.slice(10, 20);

const CompanyLogo = ({ domain, company }) => {
  const [logoUrl, setLogoUrl] = useState(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
  const [errorCount, setErrorCount] = useState(0);
  
  const handleLogoError = () => {
    if (errorCount === 0) {
      setLogoUrl(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
      setErrorCount(1);
    } else if (errorCount === 1) {
      setLogoUrl(`https://logo.clearbit.com/${domain}`);
      setErrorCount(2);
    } else {
      setErrorCount(3);
    }
  };

  return (
    <div className="mt-3 flex items-center justify-center gap-2 py-1 px-3 bg-white/30 dark:bg-white/10 rounded-full border border-sitm-gold/30 dark:border-white/10 backdrop-blur-sm w-fit mx-auto shadow-sm group-hover/card:border-sitm-gold/50 transition-colors duration-500">
      {errorCount < 3 ? (
        <img 
          src={logoUrl} 
          alt={company} 
          className="w-4 h-4 object-contain filter drop-shadow-sm transition-transform duration-300 group-hover/card:scale-110"
          onError={handleLogoError}
        />
      ) : (
        <Building2 className="w-3.5 h-3.5 text-gray-500" />
      )}
      <span className="text-[9px] text-sitm-navy dark:text-gray-200 font-black uppercase tracking-widest">
        {company}
      </span>
    </div>
  );
};

const MarqueeRow = ({ items, direction = "left", speed = 40 }) => {
  return (
    <div className="flex overflow-hidden group select-none py-4 w-screen relative -left-[max(0px,calc((100vw-100%)/2))] bg-transparent">
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-nowrap min-w-[200%] gap-10 pr-10"
      >
        {[...items, ...items].map((mentor, i) => (
          <div key={i} className="flex-shrink-0 w-64">
            <motion.div 
              whileHover={{ scale: 1.1, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative p-5 rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-sitm-gold/50 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.2)] group/card hover:border-sitm-gold transition-all duration-500"
            >
              <div className="relative w-20 h-20 mx-auto mb-5 rounded-full overflow-hidden border-2 border-sitm-gold shadow-xl transform group-hover/card:rotate-2 transition-all duration-700">
                <img src={mentor.photo} alt={mentor.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-tr from-sitm-navy/30 to-transparent" />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-serif font-bold text-sitm-navy dark:text-white mb-2 leading-tight">
                  {mentor.name}
                </h3>
                
                {/* Role with Colorful Icon */}
                <div className="flex items-center justify-center gap-2 text-xs font-bold mb-3">
                  <div className="p-1 bg-white/20 dark:bg-white/10 rounded-lg shadow-sm">
                    {cloneElement(mentor.icon, { size: 14, strokeWidth: 2.5 })}
                  </div>
                  <span className="text-sitm-maroon dark:text-sitm-gold tracking-wide italic">{mentor.role}</span>
                </div>
                
                {/* Real Company Logo */}
                <CompanyLogo domain={mentor.domain} company={mentor.company} />
              </div>
              
              {/* Decorative Corner Highlight */}
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-linear-to-br from-sitm-gold/40 to-transparent blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Mentors() {
  return (
    <section id="mentors" className="relative py-16 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Background Aurora/Glow Graphics - Mirroring About but different directions */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle Geometric Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        ></div>

        {/* Large Decorative Background Icons - Similar to Programs */}
        <motion.div
          animate={{ rotate: [0, 10, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] opacity-[0.12] dark:opacity-[0.08]"
        >
          <Users className="w-64 h-64 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
        </motion.div>
        
        <motion.div
          animate={{ rotate: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] opacity-[0.12] dark:opacity-[0.08]"
        >
          <Briefcase className="w-72 h-72 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[5%] opacity-[0.1] dark:opacity-[0.06]"
        >
          <Brain className="w-56 h-56 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
        </motion.div>

        <motion.div 
          animate={{ 
            x: [0, 150, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] right-[10%] w-[55%] h-[55%] bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 120, 0],
            scale: [1.3, 1, 1.3]
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[5%] w-[60%] h-[60%] bg-[#F6E294]/20 rounded-full blur-[130px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 120, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] bg-[#D56B6F]/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 overflow-visible">
        <motion.div 
          initial={{ y: -150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-2"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-1 bg-sitm-gold shadow-sm"></div>
              <span className="text-sitm-maroon dark:text-sitm-gold font-serif italic font-bold text-2xl md:text-3xl uppercase tracking-[0.2em] drop-shadow-sm">Meet our mentors</span>
              <div className="w-16 h-1 bg-sitm-gold shadow-sm"></div>
          </div>
          <p className="mt-8 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            100+ mentors from top corporates delivering masterclasses, expert
            sessions, 1-to-1 resume preparation and more.
          </p>
        </motion.div>

        {/* Marquee Rows */}
        <div className="space-y-0 overflow-visible py-0">
          <MarqueeRow items={row1} direction="left" speed={40} />
          <div className="mt-0">
            <MarqueeRow items={row2} direction="right" speed={45} />
          </div>
        </div>
      </div>
    </section>
  );
}
