import { Button } from "../common/Button";
import { CheckCircle, Download } from "lucide-react";

export function Admissions() {
  return (
    <section id="admissions" className="py-20 bg-sitm-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
                <span className="text-sitm-gold font-serif italic text-lg">Join Us</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6 font-serif">Admission Process 2026</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Start your journey towards a successful career. Applications are now open for the academic year 2026-27. Secure your seat today!
                </p>

                <div className="space-y-6 mb-10">
                    <h3 className="text-2xl font-bold font-serif text-sitm-gold">Eligibility Criteria</h3>
                    <ul className="space-y-4">
                        {[
                            "Passed 10+2 with Physics, Chemistry, and Mathematics.",
                            "Minimum 45% aggregate marks (40% for SC/ST categories).",
                            "Valid score in JEE Main / CEE (Assam).",
                            "Lateral Entry: 3-Year Diploma in Engineering with min 50%."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="text-sitm-gold shrink-0 mt-1" size={20} />
                                <span className="text-gray-200 text-lg">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                     <Button size="lg" variant="secondary" className="shadow-xl">
                        Download Brochure <Download size={18} className="ml-2"/>
                     </Button>
                     <div className="border border-sitm-gold/30 rounded-full px-6 py-3 flex items-center justify-center text-sitm-gold font-medium">
                        Hepline: +91 98765 43210
                     </div>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-bold font-serif text-white mb-6 text-center">Enquire Now</h3>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="w-full p-4 rounded-lg border border-white/20 bg-sitm-navy-light text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-gold" />
                        <input type="text" placeholder="Last Name" className="w-full p-4 rounded-lg border border-white/20 bg-sitm-navy-light text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-gold" />
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full p-4 rounded-lg border border-white/20 bg-sitm-navy-light text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-gold" />
                    <input type="tel" placeholder="Phone Number" className="w-full p-4 rounded-lg border border-white/20 bg-sitm-navy-light text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sitm-gold" />
                    <select className="w-full p-4 rounded-lg border border-white/20 bg-sitm-navy-light text-white focus:outline-none focus:ring-2 focus:ring-sitm-gold">
                        <option className="bg-sitm-navy text-white">Select Program of Interest</option>
                        <option className="bg-sitm-navy text-white">B.Tech CSE</option>
                        <option className="bg-sitm-navy text-white">B.Tech ECE</option>
                        <option className="bg-sitm-navy text-white">B.Tech Mechanical</option>
                        <option className="bg-sitm-navy text-white">B.Tech Civil</option>
                        <option className="bg-sitm-navy text-white">BCA</option>
                    </select>
                    <Button variant="primary" className="w-full py-4 mt-2 bg-sitm-maroon hover:bg-sitm-gold hover:text-sitm-navy border border-transparent">
                        Submit Enquiry
                    </Button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
}
