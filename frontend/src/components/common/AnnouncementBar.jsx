import { useState, useEffect } from 'react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const announcements = [
    {
      logo: "/logos/Aictelogo.png",
      alt: "AICTE Approved",
      text: "Approved by AICTE, New Delhi"
    },
    {
      logo: "/logos/gulogo.jpg",
      alt: "Guwahati University Affiliated",
      text: "Affiliated to Guwahati University"
    },
    {
      logo: "/logos/Astulogo.png",
      alt: "ASTU Affiliated",
      text: "Affiliated to Assam Science and Technology University"
    }
  ];

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 bg-sitm-gold/60 text-white overflow-hidden transition-all duration-300 ${
        isVisible ? 'h-auto py-1.5 opacity-100' : 'h-0 py-0 opacity-0'
      }`}
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-sitm-gold/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-sitm-gold/60 to-transparent z-10 pointer-events-none" />
      
      <div className="flex whitespace-nowrap animate-marquee gap-6 items-center">
        {/* First set */}
        {announcements.map((item, index) => (
          <div key={`first-${index}`} className="flex items-center gap-2">
            <img src={item.logo} alt={item.alt} className="h-4 w-auto" />
            <span className="text-xs font-medium">{item.text}</span>
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {announcements.map((item, index) => (
          <div key={`second-${index}`} className="flex items-center gap-2">
            <img src={item.logo} alt={item.alt} className="h-4 w-auto" />
            <span className="text-xs font-medium">{item.text}</span>
          </div>
        ))}
        
        {/* Third set for extra smooth loop */}
        {announcements.map((item, index) => (
          <div key={`third-${index}`} className="flex items-center gap-2">
            <img src={item.logo} alt={item.alt} className="h-4 w-auto" />
            <span className="text-xs font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
