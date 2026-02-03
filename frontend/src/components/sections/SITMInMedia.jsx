import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <section className="py-20 transition-colors duration-300

      bg-linear-to-b
      from-[#7b2d2d]/20
      via-white
      to-[#7b2d2d]/20

      dark:bg-slate-950 
      overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6">
        
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
