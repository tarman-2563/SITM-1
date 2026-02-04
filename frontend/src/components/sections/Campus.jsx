import { motion } from "framer-motion";

export function Campus() {
  const facilities = [
    {
      title: "Advanced Computer Labs",
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop",
      size: "col-span-1 md:col-span-2 row-span-2"
    },
    {
      title: "Central Library",
      img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
      size: "col-span-1"
    },
    {
      title: "Seminar halls & Auditoriums",
      img: "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "col-span-1"
    },
    {
      title: "Sports Complex",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      size: "col-span-1"
    },
    {
      title: "Smart Classrooms",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
      size: "col-span-1"
    },
    {
      title: "Cafeteria & Hangouts",
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
      size: "col-span-1"
    }
  ];

  return (
    <section id="campus" className=" py-20
    relative
    transition-colors duration-300

    /* Light mode */
    bg-linear-to-b
    from-[#7b2d2d]/20
    via-white
    to-[#7b2d2d]/20

    /* Dark mode (unchanged) */
    dark:bg-slate-950">
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          

            {/* <span className="relative inline-block">
                <span className="text-4xl bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-400 to-amber-500 relative z-10 px-2">
                  Life
                </span>
                <svg
                  className="absolute inset-0 w-[190%] h-[280%] -left-[70%] -top-[75%] pointer-events-none z-0"
                  viewBox="0 0 200 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
              </span> */}
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-serif font-bold mb-4 md:mb-6 leading-tight text-left mx-auto w-fit ">
          <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-400 to-amber-500 relative z-10 px-2">
                Life at SITM
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
              
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 font-serif">Campus Infrastructure</h2>
          <div className="w-24 h-1 bg-sitm-gold mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-white max-w-2xl mx-auto">
              A vibrant campus designed to foster creativity, collaboration, and holistic development.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {facilities.map((fac, i) => (
            <div 
              key={i} 
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${fac.size}`}
            >
              <img 
                src={fac.img} 
                alt={fac.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                 <h3 className="text-xl font-bold font-serif text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {fac.title}
                 </h3>
                 <div className="h-1 w-0 bg-sitm-gold mt-2 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
  {facilities.slice(0, 6).map((fac, i) => (
    <div 
      key={i} 
      className="relative rounded-xl overflow-hidden group cursor-pointer"
    >
      <img 
        src={fac.img} 
        alt={fac.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold font-serif text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {fac.title}
        </h3>

        <div className="h-1 w-0 bg-sitm-gold mt-2 group-hover:w-full transition-all duration-500"></div>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
