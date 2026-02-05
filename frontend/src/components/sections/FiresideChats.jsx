import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Building2, Quote } from "lucide-react";

const firesideChats = [
  {
    name: "Dr. Sandeep Singh",
    position: "Chief Executive Officer",
    company: "Tata Consultancy Services",
    domain: "tcs.com",
    designation: "Keynote Speaker",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Priyanka Sharma",
    position: "Head of Talent Acquisition",
    company: "Google India",
    domain: "google.com",
    designation: "Industry Expert",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Rajesh Malhotra",
    position: "Senior Vice President",
    company: "HDFC Bank",
    domain: "hdfcbank.com",
    designation: "Guest Lecturer",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Anjali Gupta",
    position: "Director of Engineering",
    company: "Microsoft",
    domain: "microsoft.com",
    designation: "Tech Visionary",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
  }
];

const CompanyLogo = ({ domain, company }) => {
  const [logoUrl, setLogoUrl] = useState(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
  const [errorCount, setErrorCount] = useState(0);
  
  const handleLogoError = () => {
    if (errorCount === 0) {
      // Try DuckDuckGo as second option
      setLogoUrl(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
      setErrorCount(1);
    } else if (errorCount === 1) {
      // Try Clearbit as third option
      setLogoUrl(`https://logo.clearbit.com/${domain}`);
      setErrorCount(2);
    } else {
      // Final fallback to building icon
      setErrorCount(3);
    }
  };

  return (
    <div className="flex items-center justify-center p-2.5 bg-white/60 dark:bg-white/10 rounded-xl border border-sitm-gold/30 dark:border-white/20 backdrop-blur-md shadow-lg min-w-[140px] h-12 transition-all duration-300 group-hover:border-sitm-gold group-hover:bg-white/80 dark:group-hover:bg-white/20">
      {errorCount < 3 ? (
        <img 
          src={logoUrl} 
          alt={company} 
          className="w-7 h-7 object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-110"
          onError={handleLogoError}
        />
      ) : (
        <Building2 className="w-6 h-6 text-sitm-maroon dark:text-sitm-gold" />
      )}
      <span className="ml-3 text-[11px] text-sitm-navy dark:text-gray-100 font-extrabold uppercase tracking-widest whitespace-nowrap">
        {company}
      </span>
    </div>
  );
};

export default function FiresideChats() {
  return (
    <section id="fireside-chats" className="relative py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Background Decorations - Matching Mentors and Programs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle Geometric Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        ></div>

        {/* Large Decorative Icons */}
        <motion.div
          animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] opacity-[0.1] dark:opacity-[0.08]"
        >
          <MessageSquare className="w-64 h-64 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
        </motion.div>
        
        <motion.div
          animate={{ rotate: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[10%] opacity-[0.1] dark:opacity-[0.08]"
        >
          <Quote className="w-72 h-72 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
        </motion.div>

        {/* Aurora Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] left-[10%] w-[50%] h-[50%] bg-[#F6E294]/20 rounded-full blur-[110px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] right-[0%] w-[55%] h-[55%] bg-[#D56B6F]/20 rounded-full blur-[130px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-1 bg-sitm-gold shadow-sm"></div>
              <span className="text-sitm-maroon dark:text-sitm-gold font-serif italic font-bold text-2xl md:text-3xl uppercase tracking-[0.2em] drop-shadow-sm">Fireside Chats</span>
              <div className="w-16 h-1 bg-sitm-gold shadow-sm"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sitm-navy dark:text-white mt-4">
            Inspiring Conversations
          </h2>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Real insights from industry leaders and visionaries who visited SITM to share their journey and wisdom.
          </p>
        </motion.div>

        {/* Chats Grid - Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {firesideChats.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-sitm-gold/30 dark:border-white/10 shadow-xl hover:border-sitm-gold transition-all duration-500 min-w-[280px] md:min-w-0 snap-center"
            >
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-sitm-gold shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <img src={chat.photo} alt={chat.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-sitm-navy/40 to-transparent" />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-serif font-bold text-sitm-navy dark:text-white mb-1">
                  {chat.name}
                </h3>
                <p className="text-sitm-maroon dark:text-sitm-gold font-bold text-sm mb-4 italic">
                  {chat.position}
                </p>

                {/* Company Logo and Name */}
                <div className="flex justify-center">
                  <CompanyLogo domain={chat.domain} company={chat.company} />
                </div>

                <div className="mt-4 pt-4 border-t border-sitm-gold/20 dark:border-white/10">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-sitm-maroon dark:text-sitm-gold/90">
                    {chat.designation}
                  </span>
                </div>
              </div>

              {/* Decorative Corner Highlight */}
              <div className="absolute -top-1 -right-1 w-10 h-10 bg-linear-to-br from-sitm-gold/30 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
