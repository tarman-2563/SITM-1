import { PageHeader } from "../components/common/PageHeader";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <PageHeader title="About SITM" subtitle="A Legacy of Excellence in Technical & Management Education" />
      
      <div className="container mx-auto px-4 py-16 space-y-16">
        <section className="grid md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-3xl font-serif font-bold text-sitm-maroon dark:text-sitm-gold mb-6">Our Story</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Founded with a vision to bridge the gap between industry requirements and academic delivery, SITM has established itself as a premier institution in the North East region. 
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our campus provides a serene environment conducive to learning, equipped with modern infrastructure and led by a dedicated faculty team.
                </p>
             </div>
             <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Campus Life" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
             </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border-t-4 border-sitm-maroon">
                <h3 className="text-xl font-bold mb-4 text-sitm-navy dark:text-white">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400">To be a center of excellence in technical and management education, fostering innovation and ethical leadership.</p>
            </div>
             <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border-t-4 border-sitm-gold">
                <h3 className="text-xl font-bold mb-4 text-sitm-navy dark:text-white">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400">To provide industry-relevant education, promote research, and empower students to contribute to society.</p>
            </div>
             <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border-t-4 border-sitm-navy">
                <h3 className="text-xl font-bold mb-4 text-sitm-navy dark:text-white">Core Values</h3>
                <p className="text-gray-600 dark:text-gray-400">Integrity, Excellence, Innovation, and Social Responsibility remain at the heart of everything we do.</p>
            </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
