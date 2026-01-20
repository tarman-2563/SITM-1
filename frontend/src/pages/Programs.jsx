import { PageHeader } from "../components/common/PageHeader";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export function Programs() {
  const departments = [
    { title: "Computer Science & Engineering", desc: "Focuses on AI, ML, Data Science, and Software Development." },
    { title: "Electronics & Communication", desc: "Covers VLSI, IOT, Embedded Systems, and Telecommunication." },
    { title: "Mechanical Engineering", desc: "Deals with Robotics, Autos, Thermodynamics, and Manufacturing." },
    { title: "Civil Engineering", desc: "Studies Structural Engineering, Geotech, and Infrastructure Development." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <PageHeader title="Academic Programs" subtitle="Diverse Disciplines, One Goal: Excellence" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {departments.map((dept, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300">
                    <div className="h-48 bg-sitm-navy/10 dark:bg-sitm-navy/30 flex items-center justify-center">
                        {/* Placeholder for dept icon/image */}
                        <span className="text-6xl font-serif font-bold text-sitm-maroon/20 dark:text-sitm-gold/20">0{i+1}</span>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-serif font-bold text-sitm-navy dark:text-white mb-3 group-hover:text-sitm-maroon dark:group-hover:text-sitm-gold transition-colors">{dept.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{dept.desc}</p>
                        <a href="#" className="font-medium text-sitm-maroon dark:text-sitm-gold hover:underline">View Syllabus &rarr;</a>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
