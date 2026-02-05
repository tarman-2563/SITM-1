import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const initialImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786",
];

export default function SITMInMedia() {
  const [images, setImages] = useState(initialImages);

  const next = () => {
    setImages((prev) => [...prev.slice(1), prev[0]]);
  };

  const prev = () => {
    setImages((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  return (
    <section className="relative py-20 transition-colors duration-300 bg-white dark:bg-slate-950 overflow-hidden">

      {/* ===== GRADIENT BLOBS BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[15%] w-[55%] h-[55%] bg-[#D56B6F]/20 rounded-full blur-[100px]"
        />

        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 100, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[20%] w-[65%] h-[65%] bg-[#F6E294]/20 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%] bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />

      </div>

      {/* ===== SVG MEDIA ICON ===== */}
      <motion.svg
        viewBox="0 0 300 300"
        className="hidden md:block absolute top-0 right-0 z-10
                   md:-translate-x-8 lg:-translate-x-12
                   w-72 h-72 md:w-96 md:h-96
                   opacity-[0.10] dark:opacity-[0.20]
                   pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Camera Body */}
        <rect
          x="60"
          y="110"
          width="140"
          height="80"
          rx="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-sitm-navy dark:text-sitm-gold"
        />

        {/* Lens */}
        <circle
          cx="130"
          cy="150"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-sitm-navy dark:text-sitm-gold"
        />

        {/* Waves */}
        {[1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M ${200 + i * 8} ${130 - i * 10}
                Q ${240 + i * 10} 150
                ${200 + i * 8} ${170 + i * 10}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-indigo-600 dark:text-sitm-gold"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Moving Dot */}
        <motion.circle
          r="4"
          fill="currentColor"
          className="text-sitm-maroon"
          initial={{ cx: 210, cy: 150 }}
          animate={{ cx: [210, 250], opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.svg>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold pb-5">
          <span className="text-gray-900 dark:text-white">SITM In </span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sitm-navy to-indigo-600 dark:from-white dark:to-sitm-gold">
            Media
          </span>
        </h2>

        {/* ===== LAYOUT  ===== */}
        <div className="
          flex flex-row items-start gap-8
          overflow-x-auto lg:overflow-x-hidden
        ">


          {/* Featured Image */}
          <div className="
            w-[280px] h-[360px]        
            sm:w-[340px] sm:h-[420px] 
            md:w-[420px] md:h-[480px] 
            lg:w-[520px] lg:h-[520px] 
            rounded-3xl overflow-hidden shrink-0
          ">

            <img
              src={images[0]}
              alt="Featured media"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side */}
          <div className="
            flex flex-col w-[600px] shrink-0
            mt-6        
            sm:mt-10
            md:mt-16
            lg:mt-30   
          ">


            {/* Arrows */}
            <div className="flex gap-4 mb-5">
              <button
                onClick={prev}
                className="h-11 w-11 rounded-full bg-gray-600 backdrop-blur flex items-center justify-center hover:bg-gray-400 transition"
              >
                <ChevronLeft className="text-white" />
              </button>

              <button
                onClick={next}
                className="h-11 w-11 rounded-full bg-gray-600 backdrop-blur flex items-center justify-center hover:bg-gray-400 transition"
              >
                <ChevronRight className="text-white" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-6 pb-4">
              {images.slice(1).map((img, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setImages((prev) => {
                      const copy = [...prev];
                      [copy[0], copy[index + 1]] = [
                        copy[index + 1],
                        copy[0],
                      ];
                      return copy;
                    })
                  }
                  className="w-50 sm:w-55 h-70 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shrink-0"
                >
                  <img
                    src={img}
                    alt="Media thumbnail"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
