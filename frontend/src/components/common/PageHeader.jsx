import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function PageHeader({ title, subtitle, className }) {
  return (
    <div className={cn("relative pt-40 pb-16 px-4 bg-sitm-navy text-white text-center overflow-hidden -mt-20", className)}>
       <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop')] bg-cover bg-center"></div>
       <div className="absolute inset-0 z-0 bg-linear-to-b from-sitm-navy/80 to-sitm-navy"></div>
       
       <div className="relative z-10 container mx-auto">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white"
        >
            {title}
        </motion.h1>
        {subtitle && (
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
                {subtitle}
            </motion.p>
        )}
        <div className="w-24 h-1 bg-sitm-gold mx-auto mt-8"></div>
       </div>
    </div>
  );
}
