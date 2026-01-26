import { motion } from "framer-motion";

export function Gallery() {
  const images = [
    {
      src: "/assets/gallery/award.png",
      alt: "Times Business Awards - North East",
      isLarge: true 
    },
    { src: "https://sitmguwahati.ac.in/assets/Campus-Badc-v75.jpeg", alt: "SITM Campus" },
    { src: "https://sitmguwahati.ac.in/Library.webp", alt: "Central Library" },
    { src: "https://sitmguwahati.ac.in/Classroom.webp", alt: "Smart Classroom" },
    { src: "https://sitmguwahati.ac.in/lab.webp", alt: "Engineering Lab" },
    { src: "https://sitmguwahati.ac.in/assets/Banner6-BbfDqmQ2.jpeg", alt: "Aerial View" }
  ];

  return (
    <section id="gallery" className="py-24 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">Campus Gallery</h2>
          <div className="w-24 h-1 bg-sitm-maroon mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800 group ${
                image.isLarge ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-bold text-lg font-serif">{image.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
