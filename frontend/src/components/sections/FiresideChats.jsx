import { useState, cloneElement } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Building2, Quote, LayoutGrid, Code2, Palette, BarChart3, Cloud, Terminal, Brain, Database, ShieldCheck, TestTube2, Settings2, Rocket, Globe, Zap, Target, Award, Briefcase, BookOpen, Utensils, Mic, Lightbulb } from "lucide-react";

// Mock Data - 36 items for 3 rows
const firesideChats = [
  // ROW 1
  { name: "Dr. Sandeep Singh", position: "Chief Executive Officer", company: "Tata Consultancy Services", domain: "tcs.com", photo: "https://randomuser.me/api/portraits/men/1.jpg", icon: <Building2 className="text-blue-600" /> },
  { name: "Priyanka Sharma", position: "Head of Talent Acquisition", company: "Google India", domain: "google.com", photo: "https://randomuser.me/api/portraits/women/2.jpg", icon: <Users className="text-red-500" /> },
  { name: "Rajesh Malhotra", position: "Senior Vice President", company: "HDFC Bank", domain: "hdfcbank.com", photo: "https://randomuser.me/api/portraits/men/3.jpg", icon: <Briefcase className="text-blue-800" /> },
  { name: "Anjali Gupta", position: "Director of Engineering", company: "Microsoft", domain: "microsoft.com", photo: "https://randomuser.me/api/portraits/women/4.jpg", icon: <Code2 className="text-blue-500" /> },
  { name: "Vikram Mehta", position: "CTO", company: "Flipkart", domain: "flipkart.com", photo: "https://randomuser.me/api/portraits/men/5.jpg", icon: <LayoutGrid className="text-yellow-500" /> },
  { name: "Sneha Reddy", position: "VP of Marketing", company: "Swiggy", domain: "swiggy.com", photo: "https://randomuser.me/api/portraits/women/6.jpg", icon: <Target className="text-orange-500" /> },
  { name: "Rahul Verma", position: "Product Lead", company: "Uber", domain: "uber.com", photo: "https://randomuser.me/api/portraits/men/7.jpg", icon: <Rocket className="text-black dark:text-white" /> },
  { name: "Kavita Iyer", position: "Chief Data Scientist", company: "IBM", domain: "ibm.com", photo: "https://randomuser.me/api/portraits/women/8.jpg", icon: <Database className="text-blue-700" /> },
  { name: "Arjun Das", position: "Founder & CEO", company: "Zomato", domain: "zomato.com", photo: "https://randomuser.me/api/portraits/men/9.jpg", icon: <Utensils className="text-red-600" /> },
  { name: "Meera Nair", position: "HR Director", company: "Infosys", domain: "infosys.com", photo: "https://randomuser.me/api/portraits/women/10.jpg", icon: <Users className="text-blue-400" /> },
  { name: "Sanjay Kapoor", position: "Managing Director", company: "Reliance", domain: "ril.com", photo: "https://randomuser.me/api/portraits/men/11.jpg", icon: <Building2 className="text-red-700" /> },
  { name: "Nisha Patel", position: "Design Head", company: "Adobe", domain: "adobe.com", photo: "https://randomuser.me/api/portraits/women/12.jpg", icon: <Palette className="text-red-500" /> },

  // ROW 2
  { name: "Amitabh Ray", position: "Global Head", company: "Ericsson", domain: "ericsson.com", photo: "https://randomuser.me/api/portraits/men/13.jpg", icon: <Globe className="text-blue-900" /> },
  { name: "Divya Khosla", position: "CFO", company: "Wipro", domain: "wipro.com", photo: "https://randomuser.me/api/portraits/women/14.jpg", icon: <BarChart3 className="text-indigo-600" /> },
  { name: "Karan Johar", position: "Creative Director", company: "Red Cullis", domain: "redchillies.com", photo: "https://randomuser.me/api/portraits/men/15.jpg", icon: <Zap className="text-yellow-600" /> },
  { name: "Zara Sheikh", position: "Principal Engineer", company: "Oracle", domain: "oracle.com", photo: "https://randomuser.me/api/portraits/women/16.jpg", icon: <Database className="text-red-600" /> },
  { name: "Rohan Joshi", position: "Strategy Lead", company: "Accenture", domain: "accenture.com", photo: "https://randomuser.me/api/portraits/men/17.jpg", icon: <Brain className="text-purple-600" /> },
  { name: "Isha Ambani", position: "Director", company: "Jio", domain: "jio.com", photo: "https://randomuser.me/api/portraits/women/18.jpg", icon: <Cloud className="text-blue-500" /> },
  { name: "Kabir Khan", position: "Security Chief", company: "Palo Alto Networks", domain: "paloaltonetworks.com", photo: "https://randomuser.me/api/portraits/men/19.jpg", icon: <ShieldCheck className="text-orange-500" /> },
  { name: "Sanya Malhotra", position: "Research Lead", company: "OpenAI", domain: "openai.com", photo: "https://randomuser.me/api/portraits/women/20.jpg", icon: <Brain className="text-green-600" /> },
  { name: "Aryan Khan", position: "Innovation Head", company: "Tesla", domain: "tesla.com", photo: "https://randomuser.me/api/portraits/men/21.jpg", icon: <Zap className="text-red-600" /> },
  { name: "Pooja Hegde", position: "Tech Evangelist", company: "Salesforce", domain: "salesforce.com", photo: "https://randomuser.me/api/portraits/women/22.jpg", icon: <Cloud className="text-blue-400" /> },
  { name: "Varun Dhawan", position: "Brand Manager", company: "Nike", domain: "nike.com", photo: "https://randomuser.me/api/portraits/men/23.jpg", icon: <Award className="text-black dark:text-white" /> },
  { name: "Kiara Advani", position: "Operations Head", company: "Amazon", domain: "amazon.com", photo: "https://randomuser.me/api/portraits/women/24.jpg", icon: <Briefcase className="text-yellow-600" /> },

  // ROW 3
  { name: "Ranveer Singh", position: "Media Consultant", company: "Sony", domain: "sony.com", photo: "https://randomuser.me/api/portraits/men/25.jpg", icon: <MessageSquare className="text-blue-400" /> },
  { name: "Deepika P", position: "Investments VP", company: "Goldman Sachs", domain: "goldmansachs.com", photo: "https://randomuser.me/api/portraits/women/26.jpg", icon: <BarChart3 className="text-blue-900" /> },
  { name: "Shahrukh K", position: "Chairman", company: "Red Cullis", domain: "redchillies.com", photo: "https://randomuser.me/api/portraits/men/27.jpg", icon: <Award className="text-red-700" /> },
  { name: "Alia Bhatt", position: "Sustainability Lead", company: "Unilever", domain: "unilever.com", photo: "https://randomuser.me/api/portraits/women/28.jpg", icon: <Globe className="text-blue-500" /> },
  { name: "Ranbir K", position: "Auto Specialist", company: "BMW", domain: "bmw.com", photo: "https://randomuser.me/api/portraits/men/29.jpg", icon: <Settings2 className="text-blue-700" /> },
  { name: "Katrina Kaif", position: "Beauty Founder", company: "Kay Beauty", domain: "nykaa.com", photo: "https://randomuser.me/api/portraits/women/30.jpg", icon: <Palette className="text-pink-500" /> },
  { name: "Vicky Kaushal", position: "Logistics Head", company: "Maersk", domain: "maersk.com", photo: "https://randomuser.me/api/portraits/men/31.jpg", icon: <Globe className="text-cyan-600" /> },
  { name: "Kriti Sanon", position: "Education Lead", company: "Byjus", domain: "byjus.com", photo: "https://randomuser.me/api/portraits/women/32.jpg", icon: <BookOpen className="text-purple-600" /> },
  { name: "Kartik A", position: "Sales Director", company: "Zoho", domain: "zoho.com", photo: "https://randomuser.me/api/portraits/men/33.jpg", icon: <Target className="text-green-500" /> },
  { name: "Sara Ali Khan", position: "Climate Researcher", company: "WWF", domain: "worldwildlife.org", photo: "https://randomuser.me/api/portraits/women/34.jpg", icon: <Globe className="text-green-700" /> },
  { name: "Ibrahim Ali", position: "Junior Architect", company: "DLF", domain: "dlf.in", photo: "https://randomuser.me/api/portraits/men/35.jpg", icon: <Building2 className="text-gray-600" /> },
  { name: "Janhvi K", position: "Fashion Consultant", company: "Myntra", domain: "myntra.com", photo: "https://randomuser.me/api/portraits/women/36.jpg", icon: <Palette className="text-pink-600" /> }
];

// Reused Component Logic
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
        {[...items, ...items].map((chat, i) => (
          <div key={i} className="flex-shrink-0 w-64">
            <motion.div 
              whileHover={{ scale: 1.1, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative p-5 rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-sitm-gold/50 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.2)] group/card hover:border-sitm-gold transition-all duration-500"
            >
              <div className="relative w-20 h-20 mx-auto mb-5 rounded-full overflow-hidden border-2 border-sitm-gold shadow-xl transform group-hover/card:rotate-2 transition-all duration-700">
                <img src={chat.photo} alt={chat.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-tr from-sitm-navy/30 to-transparent" />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-serif font-bold text-sitm-navy dark:text-white mb-2 leading-tight">
                  {chat.name}
                </h3>
                
                {/* Position with Colorful Icon */}
                <div className="flex items-center justify-center gap-2 text-xs font-bold mb-3">
                  <div className="p-1 bg-white/20 dark:bg-white/10 rounded-lg shadow-sm">
                    {cloneElement(chat.icon, { size: 14, strokeWidth: 2.5 })}
                  </div>
                  <span className="text-sitm-maroon dark:text-sitm-gold tracking-wide italic line-clamp-1">{chat.position}</span>
                </div>
                
                {/* Real Company Logo */}
                <CompanyLogo domain={chat.domain} company={chat.company} />
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

export default function FiresideChats() {
  const row1 = firesideChats.slice(0, 18);
  const row2 = firesideChats.slice(18, 36);

  return (
    <section id="fireside-chats" className="relative py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        ></div>

        <motion.div
          animate={{ rotate: [0, 10, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] opacity-[0.08] dark:opacity-[0.05]"
        >
          <Mic className="w-64 h-64 text-sitm-navy dark:text-sitm-gold" strokeWidth={1.5} />
        </motion.div>
        
        <motion.div
          animate={{ rotate: [0, -15, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[5%] opacity-[0.08] dark:opacity-[0.05]"
        >
          <Lightbulb className="w-72 h-72 text-sitm-navy dark:text-sitm-gold" strokeWidth={1.5} />
        </motion.div>

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
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
              <span className="font-serif font-bold text-2xl md:text-3xl uppercase tracking-[0.2em] drop-shadow-sm text-transparent bg-clip-text bg-linear-to-r from-sitm-gold to-sitm-maroon dark:from-cyan-400 dark:via-yellow-200 dark:to-amber-400">Fireside Chats</span>
          </div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Real insights from industry leaders and visionaries who visited SITM to share their journey and wisdom.
          </p>
        </motion.div>

        <div className="space-y-0 overflow-visible py-0">
          <MarqueeRow items={row1} direction="left" speed={45} />
          <div className="mt-0">
            <MarqueeRow items={row2} direction="right" speed={50} />
          </div>
        </div>
      </div>
    </section>
  );
}
