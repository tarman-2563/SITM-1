import { motion } from "framer-motion";
import { Button } from "../common/Button";
import { useLeadCapture } from "../../context/LeadCaptureContext";

import heroVideo from "../../assets/hero-bg.mp4";

export function Hero() {
  const { openApplyNowModal, openVirtualTourModal } = useLeadCapture();

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center -mt-30">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto pl-[10px] pr-4 md:pr-8 lg:pr-16 text-white">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-serif font-bold mb-6 leading-tight text-left">
              North East India's first college focused on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-amber-500">
                practical learning
              </span>
              , industry exposure, and real-world skills.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-gray-200 mb-10 font-bold italic text-left max-w-2xl">
              Where students{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-amber-500">
                learn by doing
              </span>
              , not just studying.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 mb-12"
          >
            <Button
              size="lg"
              className="shadow-sitm-navy/20"
              onClick={openApplyNowModal}
            >
              Apply for Admission
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-sitm-navy dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
              onClick={openVirtualTourModal}
            >
              Virtual Tour
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
