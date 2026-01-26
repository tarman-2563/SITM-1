import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-sitm-maroon to-sitm-gold rounded-2xl opacity-20 group-hover:opacity-30 blur-lg transition duration-500"></div>
            <img 
              src="https://sitmguwahati.ac.in/assets/Campus-Badc-v75.jpeg" 
              alt="SITM Campus" 
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px] border-4 border-white dark:border-slate-800 transition-transform duration-500 group-hover:scale-[1.01]" 
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sitm-gold rounded-full flex items-center justify-center shadow-xl hidden md:flex animate-bounce-slow border-4 border-white dark:border-slate-800">
                <div className="text-center">
                    <span className="block text-3xl font-bold text-sitm-navy">15+</span>
                    <span className="text-xs font-bold text-sitm-navy uppercase tracking-wider">Years of<br/>Legacy</span>
                </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-sitm-gold"></div>
                <span className="text-sitm-maroon dark:text-sitm-gold font-serif italic text-xl">About Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mb-8 font-serif leading-tight">
              Scholars Institute of Technology & Management
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Established on May 8, 2008, under the Indian Trust Act, 1882, <strong className="text-sitm-navy dark:text-white">SITM</strong> is the flagship initiative of the Scholar's Academy Education Trust. Since its inception, SITM has been committed to nurturing minds and shaping the future of young technocrats and leaders.
              </p>
              
              <div className="pl-6 border-l-4 border-sitm-gold/50 my-8">
                <h4 className="text-xl font-bold text-sitm-navy dark:text-white mb-2 font-serif">A Campus that Inspires</h4>
                <p className="italic">
                  Set amidst a serene natural landscape of over 10 acres in Guwahati, the campus offers a rare blend of tranquility and modernity, merging lush greenery with state-of-the-art infrastructure.
                </p>
              </div>

              <p>
                 Academic Excellence Meets Visionary Leadership. At SITM, education is about transformation. Backed by a dynamic team of highly qualified faculty, the institute is dedicated to producing professionals ready to lead in the 21st century across engineering, innovation, and research.
              </p>
            </div>

            <div className="mt-10 flex gap-6">
                <button className="px-8 py-4 bg-sitm-navy text-white rounded-full hover:bg-sitm-maroon transition-colors shadow-lg hover:shadow-xl font-bold tracking-wide uppercase text-sm">
                    Read Chairmans Message
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
