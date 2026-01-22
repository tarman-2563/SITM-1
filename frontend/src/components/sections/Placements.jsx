import { Building2, TrendingUp, Users, Award } from "lucide-react";

export function Placements() {
  return (
    <section id="placement" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sitm-maroon font-serif italic text-lg dark:text-sitm-gold">Corporate Relations</span>
          <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">Training & Placements</h2>
          <div className="w-24 h-1 bg-sitm-gold mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
                { label: "Highest Package", value: "12 LPA", icon: TrendingUp },
                { label: "Partner Companies", value: "150+", icon: Building2 },
                { label: "Students Placed", value: "95%", icon: Users },
                { label: "Industry Awards", value: "25+", icon: Award },
            ].map((stat, i) => (
                <div key={i} className="bg-gray-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 text-center hover:-translate-y-2 transition-transform duration-300 group">
                    <div className="w-16 h-16 mx-auto bg-sitm-gold/10 rounded-full flex items-center justify-center text-sitm-maroon dark:text-sitm-gold mb-4 group-hover:bg-sitm-maroon group-hover:text-white transition-colors duration-300">
                        <stat.icon size={32} />
                    </div>
                    <div className="text-3xl font-bold font-serif text-sitm-navy dark:text-white mb-2">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wide text-gray-500">{stat.label}</div>
                </div>
            ))}
        </div>

        <div className="bg-sitm-navy/5 dark:bg-white/5 rounded-3xl p-10">
            <h3 className="text-2xl font-bold font-serif text-center mb-10 text-sitm-navy dark:text-white">Our Proud Recruiters</h3>
            
            {/* Infinite Scroll Marquee */}
            {/* Infinite Scroll Marquee */}
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                    {/* First Set */}
                    {[
                        { name: "TATA Consultancy Services", color: "text-[#3577BB]" }, // Official Tata Blue
                        { name: "Wipro", color: "text-[#000000]" }, // Often stylized in black or the colorful sunflower (using bold black for text)
                        { name: "Infosys", color: "text-[#007CC3]" }, // Infosys Blue
                        { name: "Capgemini", color: "text-[#0070AD]" }, // Capgemini Blue
                        { name: "HDFC Bank", color: "text-[#004C8F]" }, // HDFC Blue
                        { name: "Amazon", color: "text-[#232F3E]" }, // Amazon Squid Ink (Dark Blue) - more readable than orange on white
                        { name: "Tech Mahindra", color: "text-[#E51A2C]" }, // TechM Red
                        { name: "Cognizant", color: "text-[#0033A0]" }, // Cognizant Blue
                        { name: "Accenture", color: "text-[#A100FF]" }, // Accenture Purple
                        { name: "IBM", color: "text-[#052FAD]" }, // IBM Blue
                        { name: "Microsoft", color: "text-[#00A4EF]" }, // Microsoft Blue (common for text representation)
                        { name: "Google", color: "text-[#4285F4]" }, // Google Blue
                        { name: "Deloitte", color: "text-[#86BC25]" } // Deloitte Green
                    ].map((company, i) => (
                        <div key={i} className="inline-flex items-center justify-center px-8 py-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800 min-w-[240px] hover:scale-105 transition-transform duration-300">
                            <span className={`text-2xl font-black ${company.color} transition-colors`}>{company.name}</span>
                        </div>
                    ))}
                    {/* Duplicate Set for Seamless Loop */}
                   {[
                        { name: "TATA Consultancy Services", color: "text-[#3577BB]" }, 
                        { name: "Wipro", color: "text-[#000000]" }, 
                        { name: "Infosys", color: "text-[#007CC3]" }, 
                        { name: "Capgemini", color: "text-[#0070AD]" }, 
                        { name: "HDFC Bank", color: "text-[#004C8F]" }, 
                        { name: "Amazon", color: "text-[#232F3E]" }, 
                        { name: "Tech Mahindra", color: "text-[#E51A2C]" }, 
                        { name: "Cognizant", color: "text-[#0033A0]" }, 
                        { name: "Accenture", color: "text-[#A100FF]" }, 
                        { name: "IBM", color: "text-[#052FAD]" }, 
                        { name: "Microsoft", color: "text-[#00A4EF]" }, 
                        { name: "Google", color: "text-[#4285F4]" }, 
                        { name: "Deloitte", color: "text-[#86BC25]" }
                    ].map((company, i) => (
                        <div key={`dup-${i}`} className="inline-flex items-center justify-center px-8 py-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800 min-w-[240px] hover:scale-105 transition-transform duration-300">
                            <span className={`text-2xl font-black ${company.color} transition-colors`}>{company.name}</span>
                        </div>
                    ))}
                </div>
                
                {/* Fade Edges */}
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent z-10"></div>
            </div>
            <div className="text-center mt-12">
                 <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto italic">
                    "SITM students have consistently demonstrated strong technical fundamentals and professional ethics. We are delighted to recruit from here."
                 </p>
                 <p className="mt-4 font-bold text-sitm-navy dark:text-white">- HR Manager, Infosys</p>
            </div>
        </div>
      </div>
    </section>
  );
}
