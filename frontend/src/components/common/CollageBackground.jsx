import { motion } from "framer-motion";

export function CollageBackground({ images }) {
  if (!images || images.length === 0) return null;

  // Define positions for "one right, one left, one down/random"
  // We'll use up to 3 images.
  const positions = [
    "top-10 -right-10 md:right-0 md:top-20",       // Top Right
    "bottom-10 -left-10 md:left-0 md:bottom-20",   // Bottom Left
    "bottom-0 right-10 md:right-1/3",              // Bottom Center-ish
  ];

  const rotations = [6, -6, 3];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {images.slice(0, 3).map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`absolute hidden md:block w-64 h-48 rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800 overflow-hidden ${positions[index] || ""}`}
          style={{ transform: `rotate(${rotations[index]}deg)` }}
        >
          <img 
            src={src} 
            alt="Decoration" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      {/* Fallback/Overlay for readability if images end up behind text on some screens, strictly decorative */}
      <div className="absolute inset-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-[1px]"></div>
    </div>
  );
}
