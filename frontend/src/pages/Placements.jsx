import { PageHeader } from "../components/common/PageHeader";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export function Placements() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <PageHeader title="Training & Placements" subtitle="Bridging the gap between Campus and Corporate" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
                { label: "Highest Package", value: "12 LPA" },
                { label: "Average Package", value: "4.5 LPA" },
                { label: "Recruiters", value: "50+" },
                { label: "Placement Rate", value: "95%" },
            ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md text-center border-b-4 border-sitm-gold">
                    <div className="text-3xl font-bold font-serif text-sitm-navy dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wide text-gray-500">{stat.label}</div>
                </div>
            ))}
        </div>

        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-sitm-navy dark:text-white">Our Top Recruiters</h2>
        <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos styled as text placeholders for now */}
            {["TCS", "Wipro", "Infosys", "Capgemini", "HDFC Bank", "Amazon", "Tech Mahindra"].map((company) => (
                <div key={company} className="px-8 py-4 bg-gray-200 dark:bg-slate-800 rounded-lg font-bold text-xl text-gray-600 dark:text-gray-400">
                    {company}
                </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
