import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, X, ChevronLeft, ChevronRight, Image, Camera, Film, PictureInPicture } from "lucide-react";

// Import all gallery images
import Award from "../../assets/gallery/Award.jpg";
import Campus from "../../assets/gallery/Campus.jpeg";
import TimesAward1 from "../../assets/gallery/alu.jpg";
import TimesAward2 from "../../assets/gallery/alu2.jpg";
import Library from "../../assets/gallery/alu3.jpg";
import Classroom from "../../assets/gallery/alu4.jpeg";
import Lab from "../../assets/gallery/Banner1.jpeg";
import Hostel from "../../assets/gallery/Hostel.jpg";
import Graduation from "../../assets/gallery/graduation.jpg";
import Cricket1 from "../../assets/gallery/1Cricket1.jpeg";
import Cricket2 from "../../assets/gallery/1Cricket2.jpeg";
import Cricket3 from "../../assets/gallery/1Cricket3.jpeg";
import Cricket4 from "../../assets/gallery/1Cricket4.jpeg";
import Cricket5 from "../../assets/gallery/1Cricket5.jpeg";
import Cricket6 from "../../assets/gallery/1Cricket6.jpeg";
import Cricket7 from "../../assets/gallery/1Cricket7.jpeg";
import Cricket8 from "../../assets/gallery/1Cricket8.jpeg";
import Cricket9 from "../../assets/gallery/1Cricket9.jpeg";
import Cricket10 from "../../assets/gallery/1Cricket10.jpeg";
import Cricket11 from "../../assets/gallery/1Cricket11.jpeg";
import Cricket12 from "../../assets/gallery/1Cricket12.jpeg";
import Hgt2022_1 from "../../assets/gallery/2022hgt1.jpeg";
import Hgt2022_4 from "../../assets/gallery/2022hgt4.jpeg";
import Hgt2023_1 from "../../assets/gallery/2023hgt1.jpeg";
import Hgt2023_5 from "../../assets/gallery/2023hgt5.jpeg";
import Hgt2024_1 from "../../assets/gallery/2024hgt1.jpeg";
import GD2025 from "../../assets/gallery/2025GD1.jpg";
import Gra2025_1 from "../../assets/gallery/2025gra1.png";
import Gra2025_2 from "../../assets/gallery/2025gra2.jpg";
import Gra2025_3 from "../../assets/gallery/2025gra3.jpg";
import Gra2025_4 from "../../assets/gallery/2025gra4.jpg";
import Gra2025_5 from "../../assets/gallery/2025gra5.jpg";
import Gra2025_6 from "../../assets/gallery/2025gra6.jpg";

export function Gallery() {
  const [showGalleryOverlay, setShowGalleryOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Featured images for initial display (matching your screenshot layout)
  const featuredImages = [
    {
      src: Award,
      alt: "Times Business Awards - North East",
      isHighlighted: true,
      category: "Awards"
    },
    {
      src: Campus,
      alt: "SITM Campus View",
      category: "Campus"
    },
    {
      src: Library,
      alt: "Students in Library",
      category: "Academic"
    },
    {
      src: Classroom,
      alt: "Interactive Learning Session",
      category: "Academic"
    },
    {
      src: Lab,
      alt: "Modern Laboratory",
      category: "Facilities"
    },
    {
      src: TimesAward1,
      alt: "Achievement Recognition",
      isHighlighted: true,
      category: "Awards"
    },
    {
      src: Hostel,
      alt: "Hostel Facilities",
      category: "Facilities"
    },
    {
      src: Graduation,
      alt: "Graduation Ceremony",
      category: "Events"
    },
    {
      src: Cricket1,
      alt: "Cricket Tournament",
      category: "Sports"
    }
  ];

  // All gallery images
  const allImages = [
    ...featuredImages,
    { src: TimesAward2, alt: "Alumni Achievement", category: "Alumni" },
    { src: Hostel, alt: "Hostel Facilities", category: "Facilities" },
    { src: Graduation, alt: "Graduation Ceremony", category: "Events" },
    { src: Cricket1, alt: "Cricket Tournament", category: "Sports" },
    { src: Cricket2, alt: "Cricket Match", category: "Sports" },
    { src: Cricket3, alt: "Sports Activity", category: "Sports" },
    { src: Cricket4, alt: "Athletic Event", category: "Sports" },
    { src: Cricket5, alt: "Team Sports", category: "Sports" },
    { src: Cricket6, alt: "Cricket Championship", category: "Sports" },
    { src: Cricket7, alt: "Sports Competition", category: "Sports" },
    { src: Cricket8, alt: "Athletic Meet", category: "Sports" },
    { src: Cricket9, alt: "Sports Festival", category: "Sports" },
    { src: Cricket10, alt: "Cricket Tournament Final", category: "Sports" },
    { src: Cricket11, alt: "Inter-College Sports", category: "Sports" },
    { src: Cricket12, alt: "Annual Sports Day", category: "Sports" },
    { src: Hgt2022_1, alt: "Convocation 2022", category: "Events" },
    { src: Hgt2022_4, alt: "Academic Excellence 2022", category: "Events" },
    { src: Hgt2023_1, alt: "Graduation Day 2023", category: "Events" },
    { src: Hgt2023_5, alt: "Achievement Ceremony 2023", category: "Events" },
    { src: Hgt2024_1, alt: "Annual Function 2024", category: "Events" },
    { src: GD2025, alt: "Group Discussion Session", category: "Academic" },
    { src: Gra2025_1, alt: "Recent Graduation", category: "Events" },
    { src: Gra2025_2, alt: "Academic Success", category: "Events" },
    { src: Gra2025_3, alt: "Student Achievement", category: "Events" },
    { src: Gra2025_4, alt: "Excellence Recognition", category: "Events" },
    { src: Gra2025_5, alt: "Graduation Celebration", category: "Events" },
    { src: Gra2025_6, alt: "Academic Milestone", category: "Events" }
  ];

  const openGalleryOverlay = () => {
    setShowGalleryOverlay(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGalleryOverlay = () => {
    setShowGalleryOverlay(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <section id="gallery" className="relative overflow-hidden py-16 bg-linear-to-br from-white via-gray-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-300">
      {/* Background Aurora/Glow Graphics - Distinct from About Section */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle Geometric Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ 
            backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        ></div>

        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#D56B6F]/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 70, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -left-[15%] w-[60%] h-[60%] bg-[#F6E294]/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 0],
            y: [0, 80, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[20%] w-[55%] h-[55%] bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />
      </div>

      {/* FLOATING DECORATIVE ICONS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[
          { Icon: Camera, top: "5%", left: "10%", size: 130, rotate: -12 },
          { Icon: Image, top: "75%", left: "5%", size: 140, rotate: 15 },
          { Icon: Film, top: "15%", left: "85%", size: 120, rotate: 20 },
          { Icon: PictureInPicture, top: "80%", left: "88%", size: 110, rotate: -10 },
          { Icon: Camera, top: "45%", left: "92%", size: 100, rotate: 5 },
          { Icon: Image, top: "40%", left: "3%", size: 115, rotate: -15 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-sitm-maroon dark:text-sitm-gold opacity-[0.05] dark:opacity-[0.12]"
            style={{ top: item.top, left: item.left }}
            animate={{
              y: [0, -25, 0],
              rotate: [item.rotate, item.rotate + 10, item.rotate],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto px-5 max-w-7xl relative z-10">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-serif font-bold mb-4 md:mb-6 leading-tight text-left mx-auto w-fit ">
          <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-400 to-amber-500 relative z-10 px-2">
                Photo Gallery
                </span>
                <svg
                  className="absolute inset-0 w-[210%] h-[220%] -left-[55%] -top-[60%] pointer-events-none z-0"
                  viewBox="0 0 200 60"
                  fill="none"
                >
                  <motion.path
                    d="M1,30 C1,10 199,10 199,30 C199,50 1,50 12,32"
                    stroke="#facc15"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M12,28 C18,8 199,12 199,32 C199,52 12,48 22,35"
                    stroke="#facc15"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.8, delay: 1.2, ease: "easeInOut" }}
                  />
                </svg>
              </span>
        </div>


        {/* Mobile: Horizontal Scroll with 2x2 Grid */}
        <div className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
          <div className="flex gap-4 px-1">
            {/* First screen: 4 images in 2x2 grid */}
            <div className="grid grid-cols-2 gap-3 snap-center flex-shrink-0 w-[90vw]">
              {featuredImages.slice(0, 4).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer aspect-square"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <span className="inline-block px-2 py-1 bg-sitm-maroon text-white text-[10px] rounded-full mb-1">
                        {image.category}
                      </span>
                      <p className="text-white font-semibold text-xs line-clamp-1">{image.alt}</p>
                    </div>
                  </div>
                  {image.isHighlighted && (
                    <div className="absolute top-2 right-2 bg-sitm-gold text-white px-2 py-1 rounded-full text-[10px] font-bold">
                      Featured
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Second screen: 3 new images + View More */}
            <div className="grid grid-cols-2 gap-3 snap-center flex-shrink-0 w-[90vw]">
              {featuredImages.slice(4, 7).map((image, index) => (
                <motion.div
                  key={index + 4}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer aspect-square"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <span className="inline-block px-2 py-1 bg-sitm-maroon text-white text-[10px] rounded-full mb-1">
                        {image.category}
                      </span>
                      <p className="text-white font-semibold text-xs line-clamp-1">{image.alt}</p>
                    </div>
                  </div>
                  {image.isHighlighted && (
                    <div className="absolute top-2 right-2 bg-sitm-gold text-white px-2 py-1 rounded-full text-[10px] font-bold">
                      Featured
                    </div>
                  )}
                </motion.div>
              ))}

              {/* View More Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-linear-to-br from-sitm-navy to-sitm-maroon flex items-center justify-center aspect-square"
                onClick={openGalleryOverlay}
              >
                <div className="text-center text-white">
                  <Plus size={32} className="mx-auto mb-2 group-hover:rotate-90 transition-transform duration-300" />
                  <p className="font-bold text-sm">View More</p>
                  <p className="text-xs opacity-80">{allImages.length - 7}+ Images</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {featuredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative rounded-xl overflow-hidden shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${image.isHighlighted
                ? "md:col-span-2 md:row-span-2 ring-4 ring-sitm-gold ring-opacity-60"
                : ""
                }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-1 bg-sitm-maroon text-white text-xs rounded-full mb-2">
                    {image.category}
                  </span>
                  <p className="text-white font-semibold text-sm">{image.alt}</p>
                </div>
              </div>
              {image.isHighlighted && (
                <div className="absolute top-3 right-3 bg-sitm-gold text-white px-2 py-1 rounded-full text-xs font-bold">
                  Featured
                </div>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-linear-to-br from-sitm-navy to-sitm-maroon flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={openGalleryOverlay}
          >
            <div className="text-center text-white">
              <Plus size={48} className="mx-auto mb-2 group-hover:rotate-90 transition-transform duration-300" />
              <p className="font-bold text-lg">View More</p>
              <p className="text-sm opacity-80">{allImages.length - featuredImages.length}+ Images</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Individual Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-sitm-gold transition-colors z-10"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <span className="inline-block px-3 py-1 bg-sitm-maroon text-white text-sm rounded-full mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-xl font-bold">{selectedImage.alt}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Gallery Sliding Overlay */}
      <AnimatePresence>
        {showGalleryOverlay && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white dark:bg-slate-900 z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 p-4 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-bold text-sitm-navy dark:text-white">Complete Gallery</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{allImages.length} Images</p>
              </div>
              <button
                onClick={closeGalleryOverlay}
                className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={24} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {allImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer aspect-square"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setSelectedImage(image);
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="inline-block px-2 py-1 bg-sitm-maroon text-white text-xs rounded-full mb-1">
                          {image.category}
                        </span>
                        <p className="text-white font-medium text-xs line-clamp-2">{image.alt}</p>
                      </div>
                    </div>
                    {image.isHighlighted && (
                      <div className="absolute top-2 right-2 bg-sitm-gold text-white px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
