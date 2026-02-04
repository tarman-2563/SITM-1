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
    <section className="relative py-20 transition-colors duration-300

      bg-linear-to-b
      from-[#7b2d2d]/20
      via-white
      to-[#7b2d2d]/20

      dark:bg-slate-950 
      overflow-hidden ">

      {/* MEDIA SVG BACKGROUND */}
<motion.svg
  viewBox="0 0 300 300"
  className="hidden md:block absolute top-0 right-0 z-0
           md:-translate-x-8 lg:-translate-x-12
           w-72 h-72 md:w-96 md:h-96
           opacity-[0.08] dark:opacity-[0.18]
           pointer-events-none"



  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
>
  {/* CAMERA BODY */}
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

  {/* CAMERA LENS */}
  <circle
    cx="130"
    cy="150"
    r="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    className="text-sitm-navy dark:text-sitm-gold"
  />

  {/* BROADCAST WAVES */}
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

  {/* MOVING MEDIA DOT */}
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


      <div className="relative z-10 max-w-7xl mx-auto px-6">  
        <h2 className="text-4xl md:text-5xl font-extrabold pb-5">
          <span className="text-gray-900 dark:text-white">
            SITM In
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sitm-navy to-indigo-600 dark:from-white dark:to-sitm-gold">
            Media
          </span>
        </h2>
      

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-8">
          
          {/* FEATURED IMAGE */}
          <div className="w-full lg:w-130 h-80 sm:h-105 lg:h-130 rounded-3xl overflow-hidden shrink-0">
            <img
              src={images[0]}
              alt="Featured media"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col w-full mt-30">

            {/* ARROWS */}
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

            {/* SMALL MEDIA CARDS */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
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
