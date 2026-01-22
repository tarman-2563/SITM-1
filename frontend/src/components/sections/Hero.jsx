import { motion } from "framer-motion";
import { Button } from "../common/Button";

import heroVideo from "../../assets/hero-bg.mp4";

export function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center -mt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src={heroVideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-sitm-navy/60 dark:bg-black/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-sitm-navy via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-light tracking-widest uppercase mb-4 text-sitm-gold">
            Welcome to SITM
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
            Shape Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sitm-gold to-yellow-200">Career</span> <br />
            With Excellence
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-10 font-light">
            Empowering the next generation of leaders with world-class education, innovation, and ethical values using AICTE guidelines.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="bg-sitm-maroon hover:bg-red-900 border-none text-white shadow-sitm-gold/20 shadow-2xl">
            Apply for Admission
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-sitm-navy dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
            Virtual Tour
          </Button>
        </motion.div>
        
        {/* Floating Stats or Badges (Gen-Z touch) */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex justify-center gap-6 md:gap-12 mt-10"
        >
            <div className="flex flex-col items-center">
                <span className="text-3xl font-bold font-serif text-sitm-gold">A+</span>
                <span className="text-xs uppercase tracking-wide opacity-80">Accredited</span>
            </div>
             <div className="flex flex-col items-center">
                <span className="text-3xl font-bold font-serif text-sitm-gold">95%</span>
                <span className="text-xs uppercase tracking-wide opacity-80">Placements</span>
            </div>
             <div className="flex flex-col items-center">
                <span className="text-3xl font-bold font-serif text-sitm-gold">50+</span>
                <span className="text-xs uppercase tracking-wide opacity-80">Awards</span>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
