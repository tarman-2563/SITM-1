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
    <section id="campus" className="py-20 bg-sitm-navy text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sitm-gold font-serif italic text-lg">Life at SITM</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 font-serif">Campus Infrastructure</h2>
          <div className="w-24 h-1 bg-sitm-gold mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              A vibrant campus designed to foster creativity, collaboration, and holistic development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
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
