import { motion } from "framer-motion";
import { Button } from "../common/Button";
import { SectionHeader } from "../common/SectionHeader";
import { useLeadCapture } from "../../context/LeadCaptureContext";
import { CheckCircle, Download, Phone, UserPlus, FileText, GraduationCap } from "lucide-react";

export function Admissions() {
  const { openDownloadBrochureModal, openEnquireNowModal } = useLeadCapture();

  const eligibilityCriteria = [
    "Passed 10+2 with Physics, Chemistry, and Mathematics",
    "Minimum 45% aggregate marks (40% for SC/ST categories)",
    "Valid score in JEE Main / CEE (Assam)",
    "Lateral Entry: 3-Year Diploma in Engineering with min 50%",
  ];

  return (
    <section
      id="admissions"
      className="scroll-mt-24 relative py-20 md:py-28 overflow-hidden transition-colors duration-300 bg-white dark:bg-slate-950"
    >
      {/* ===== GRADIENT BLOBS BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Maroon Blob */}
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[15%] w-[55%] h-[55%] bg-[#D56B6F]/20 rounded-full blur-[100px]"
        />
        
        {/* Gold Blob */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[20%] w-[65%] h-[65%] bg-[#F6E294]/20 rounded-full blur-[120px]"
        />
        
        {/* Bottom Maroon Blob */}
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%] bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />
      </div>

      {/* FLOATING DECORATIVE ICONS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[
          { Icon: UserPlus, top: "10%", left: "5%", size: 120, rotate: 15 },
          { Icon: FileText, top: "60%", left: "85%", size: 140, rotate: -15 },
          { Icon: GraduationCap, top: "80%", left: "10%", size: 130, rotate: 10 },
          { Icon: CheckCircle, top: "20%", left: "90%", size: 100, rotate: -10 },
          { Icon: FileText, top: "45%", left: "50%", size: 110, rotate: 20 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-sitm-maroon dark:text-sitm-gold opacity-[0.05] dark:opacity-[0.1]"
            style={{ top: item.top, left: item.left }}
            animate={{
              y: [0, -20, 0],
              rotate: [item.rotate, item.rotate + 10, item.rotate],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:20px_20px] z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sitm-maroon dark:text-sitm-gold font-bold uppercase tracking-widest text-sm block mb-4">
              Join Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-sitm-navy dark:text-white mb-4">
              Admission Process 2026
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Start your journey towards a successful career. Applications are now
              open for the academic year 2026-27.
            </p>

            {/* Eligibility */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-sitm-navy dark:text-white mb-4">
                Eligibility Criteria
              </h3>

              <ul className="space-y-3">
                {eligibilityCriteria.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-sitm-gold shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="md"
                variant="secondary"
                onClick={openDownloadBrochureModal}
              >
                <Download size={18} />
                Download Brochure
              </Button>

              <a 
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 border-2 border-sitm-gold/30 dark:border-sitm-gold/50 rounded-full px-6 py-3 text-sitm-navy dark:text-sitm-gold font-medium hover:bg-sitm-gold/10 transition-colors text-sm"
              >
                <Phone size={16} />
                +91 98765 43210
              </a>
            </div>
          </motion.div>

          {/* RIGHT FORM CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="bg-rose-50/80 dark:bg-slate-800 backdrop-blur-lg p-8 rounded-2xl border-2 border-sitm-maroon/40 dark:border-sitm-gold/30 shadow-[0_0_25px_rgba(213,107,111,0.4)] dark:shadow-[0_0_25px_rgba(246,226,148,0.3)]"
          >
            <h3 className="text-2xl font-serif font-bold text-sitm-navy dark:text-white mb-4 text-center">
              Enquire Now
            </h3>

            <p className="text-slate-600 dark:text-slate-400 text-center mb-6 text-sm">
              Get personalized guidance from our admission counselors
            </p>

            <Button
              onClick={openEnquireNowModal}
              className="w-full"
              size="lg"
            >
              Start Your Application
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
