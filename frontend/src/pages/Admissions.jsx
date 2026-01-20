import { PageHeader } from "../components/common/PageHeader";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/common/Button";
import { CheckCircle } from "lucide-react";

export function Admissions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <PageHeader title="Admissions" subtitle="Join the Next Generation of Innovators" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16">
            <div>
                <h2 className="text-3xl font-serif font-bold text-sitm-navy dark:text-white mb-8">Eligibility Criteria</h2>
                <ul className="space-y-4">
                    {[
                        "Passed 10+2 with Physics, Chemistry, and Math",
                        "Minimum 45% aggregate marks (40% for reserved categories)",
                        "Valid score in JEE Main / CEE",
                        "For Lateral Entry: Diploma in Engineering with 50%"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="text-sitm-maroon dark:text-sitm-gold shrink-0 mt-1" size={20} />
                            <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                        </li>
                    ))}
                </ul>
                
                <div className="mt-12 bg-sitm-gold/10 p-6 rounded-xl border border-sitm-gold/30">
                    <h3 className="text-xl font-bold font-serif mb-2 text-sitm-navy dark:text-sitm-gold">Admission Helpline</h3>
                    <p className="text-gray-700 dark:text-gray-200">+91 98765 43210  |  admissions@sitm.ac.in</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold font-serif text-sitm-navy dark:text-white mb-6">Apply Now</h3>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon" />
                        <input type="text" placeholder="Last Name" className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon" />
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon" />
                    <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon" />
                    <select className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon">
                        <option>Select Program</option>
                        <option>B.Tech CSE</option>
                        <option>B.Tech ECE</option>
                        <option>B.Tech ME</option>
                        <option>B.Tech CE</option>
                    </select>
                    <Button className="w-full py-4 mt-4">Submit Application</Button>
                </form>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
