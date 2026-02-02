import { motion } from "framer-motion";
import { Button } from "../common/Button";
import { useLeadCapture } from "../../context/LeadCaptureContext";
import heroVideo from "../../assets/hero-bg.mp4";

export function Hero() {
  const { openApplyNowModal, openVirtualTourModal } = useLeadCapture();

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center mt-0 md:-mt-30">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:pl-2.5 md:pr-8 lg:pr-16 text-white pt-8 md:pt-0">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-serif font-bold mb-4 md:mb-6 leading-tight text-left">
              North East India's first college focused on{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-400 to-amber-500 relative z-10 px-2">
                  practical learning
                </span>
                <svg
                  className="absolute inset-0 w-[210%] h-[220%] -left-[55%] -top-[60%] pointer-events-none z-0"
                  viewBox="0 0 200 60"
                  fill="none"
                >
                  <motion.path
                    d="M1,30 C1,10 199,10 199,30 C199,50 1,50 12,32"
                    stroke="#facc15"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M12,28 C18,8 199,12 199,32 C199,52 12,48 22,35"
                    stroke="#facc15"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.8, delay: 1.2, ease: "easeInOut" }}
                  />
                </svg>
              </span>
              , industry exposure, and real-world skills.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-10 font-bold italic text-left max-w-2xl">
              Where students{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-400 to-amber-500">
                learn by doing
              </span>
              , not just studying.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-12"
          >
            <Button size="lg" className="shadow-sitm-navy/20" onClick={openApplyNowModal}>
              Apply for Admission
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
