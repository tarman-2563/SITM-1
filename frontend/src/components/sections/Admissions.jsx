import { motion } from "framer-motion";
import { Button } from "../common/Button";
import { useLeadCapture } from "../../context/LeadCaptureContext";
import { CheckCircle, Download, UserPlus, FileText, GraduationCap } from "lucide-react";

export function Admissions() {
  const { openDownloadBrochureModal, openEnquireNowModal } = useLeadCapture();

  return (
    <section
      id="admissions"
      className="relative py-20 overflow-hidden transition-colors duration-300 bg-white dark:bg-slate-950"
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
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* ===== CONTENT ===== */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-sitm-maroon dark:text-sitm-gold font-serif italic text-2xl">
              Join Us
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-6 font-serif">
              Admission Process 2026
            </h2>

            <p className="text-gray-700 dark:text-blue-100 text-lg mb-8">
              Start your journey towards a successful career. Applications are now
              open for the academic year 2026-27. Secure your seat today!
            </p>

            {/* Eligibility */}
            <div className="space-y-6 mb-10">
              <h3 className="text-2xl font-bold font-serif text-sitm-maroon dark:text-sitm-gold">
                Eligibility Criteria
              </h3>

              <ul className="space-y-4">
                {[
                  "Passed 10+2 with Physics, Chemistry, and Mathematics.",
                  "Minimum 45% aggregate marks (40% for SC/ST categories).",
                  "Valid score in JEE Main / CEE (Assam).",
                  "Lateral Entry: 3-Year Diploma in Engineering with min 50%.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-sitm-gold shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-gray-700 dark:text-blue-100 text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="shadow-xl"
                onClick={openDownloadBrochureModal}
              >
                Download Brochure
                <Download size={18} className="ml-2" />
              </Button>

              <div className="border border-sitm-gold/30 rounded-full px-6 py-3 flex items-center justify-center text-sitm-gold font-medium">
                Helpline: +91 98765 43210
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white dark:bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl"
          >

            <h3 className="text-2xl font-bold font-serif text-sitm-navy dark:text-white mb-6 text-center">
              Enquire Now
            </h3>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Get personalized guidance from our admission counselors
              </p>

              <Button
                variant="primary"
                className="w-full py-4 mt-2 bg-sitm-maroon hover:bg-sitm-gold hover:text-sitm-navy border border-transparent"
                onClick={openEnquireNowModal}
              >
                Start Your Application
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Quick form • No login required • Instant response
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
