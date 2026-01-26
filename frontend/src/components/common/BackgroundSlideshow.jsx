import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BackgroundSlideshow({ images, overlayClassName = "bg-white/80 dark:bg-slate-950/80", duration = 5 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, duration * 1000);

    return () => clearInterval(timer);
  }, [images.length, duration]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${images[index]}')` }}
        />
      </AnimatePresence>
      <div className={`absolute inset-0 z-10 backdrop-blur-[1px] ${overlayClassName}`}></div>
    </div>
  );
}
