import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sitm-maroon font-serif italic text-lg dark:text-sitm-gold">Our Legacy</span>
          <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">Empowering Dreams, Building Futures</h2>
          <div className="w-24 h-1 bg-sitm-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
           <div className="space-y-6">
              <h3 className="text-3xl font-serif font-bold text-sitm-maroon dark:text-sitm-gold">
                  A Center of Excellence Since 2005
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  Scholar's Institute of Technology & Management (SITM) stands as a beacon of technical education in North East India. Approved by AICTE, New Delhi and affiliated to Gauhati University (GU) & ASTU, we are dedicated to nurturing the next generation of engineers and managers.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  Our campus, sprawling over lush greenery in Guwahati, provides the perfect ecosystem for innovation, research, and holistic development. With state-of-the-art laboratories and a focus on industry-academic symbiosis, we ensure our students are industry-ready from day one.
              </p>
           </div>
           <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-sitm-navy/20 group-hover:bg-transparent transition-colors duration-500"></div>
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Campus Life" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"/>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border-t-4 border-sitm-maroon hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-4 text-sitm-navy dark:text-white font-serif">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400">To be a globally recognized center of excellence in technical and management education, fostering innovation, leadership, and ethical values.</p>
            </div>
             <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border-t-4 border-sitm-gold hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-4 text-sitm-navy dark:text-white font-serif">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400">Providing industry-relevant education, promoting cutting-edge research, and empowering students to become responsible citizens contributing to societal growth.</p>
            </div>
             <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border-t-4 border-sitm-navy hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-4 text-sitm-navy dark:text-white font-serif">Core Values</h3>
                <p className="text-gray-600 dark:text-gray-400">We uphold Integrity, Excellence, Innovation, Inclusivity, and Social Responsibility as the pillars of our institutional character.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
