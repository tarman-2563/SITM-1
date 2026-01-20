import { ArrowRight } from "lucide-react";

export function Programs() {
  const programs = [
    { 
        title: "Computer Science & Engineering", 
        desc: "Focuses on AI, ML, Data Science, and Software Development. Our labs are equipped with high-performance computing clusters.",
        intake: 60,
        duration: "4 Years"
    },
    { 
        title: "Electronics & Communication", 
        desc: "Covers VLSI, IOT, Embedded Systems, and Telecommunication. Partners with leading telecom giants for internships.",
        intake: 60,
        duration: "4 Years"
    },
    { 
        title: "Mechanical Engineering", 
        desc: "Deals with Robotics, Autos, Thermodynamics, and Manufacturing. Includes workshops on CNC and 3D Printing.",
        intake: 60,
        duration: "4 Years"
    },
    { 
        title: "Civil Engineering", 
        desc: "Studies Structural Engineering, Geotech, and Infrastructure Development. Field visits to major construction projects.",
        intake: 60,
        duration: "4 Years"
    },
    { 
        title: "Bachelor of Computer Application", 
        desc: "A foundational course in computer applications, software development, and modern programming languages.",
        intake: 40,
        duration: "3 Years"
    },
    { 
        title: "Business Administration (BBA)", 
        desc: "Developing future managers with skills in finance, marketing, and human resource management.",
        intake: 40,
        duration: "3 Years"
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sitm-gold font-serif italic text-lg dark:text-sitm-gold">Academic Excellence</span>
          <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">Our Programs</h2>
          <div className="w-24 h-1 bg-sitm-maroon mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We offer a diverse range of AICTE approved undergraduate and postgraduate programs designed to meet the evolving demands of the industry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((dept, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-950 shadow-xl border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-8xl font-serif font-bold text-sitm-navy dark:text-white">{i+1}</span>
                    </div>
                    <div className="p-8 relative z-10">
                        <h3 className="text-2xl font-serif font-bold text-sitm-navy dark:text-white mb-3 group-hover:text-sitm-maroon dark:group-hover:text-sitm-gold transition-colors">{dept.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">{dept.desc}</p>
                        
                        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6 border-t border-gray-100 dark:border-slate-800 pt-4">
                            <span>Intake: {dept.intake}</span>
                            <span>Duration: {dept.duration}</span>
                        </div>

                        <a href="#" className="inline-flex items-center font-medium text-sitm-maroon dark:text-sitm-gold hover:underline group-hover:translate-x-2 transition-transform">
                            View Syllabus <ArrowRight size={16} className="ml-2" />
                        </a>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
