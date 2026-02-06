import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function SectionHeader({ 
  eyebrow, 
  title, 
  description, 
  className,
  centered = true,
  showDivider = true 
}) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
      className={cn(
        "mb-16",
        centered && "text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-sitm-maroon dark:text-sitm-gold font-bold uppercase tracking-widest text-sm block mb-4">
          {eyebrow}
        </span>
      )}
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-sitm-navy dark:text-white mb-4">
        {title}
      </h2>
      
      {description && (
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
      
      {showDivider && (
        <div className={cn(
          "w-24 h-1 bg-gradient-to-r from-sitm-gold via-sitm-gold-light to-sitm-gold mt-6",
          centered && "mx-auto"
        )} />
      )}
    </motion.div>
  );
}
