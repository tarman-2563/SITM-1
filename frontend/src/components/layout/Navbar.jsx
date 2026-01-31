import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "../common/Button";
import { ThemeToggle } from "./ThemeToggle";
import logo from "../../assets/logo_new-removebg-preview.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Awards", href: "/#awards" },
    { name: "About", href: "/#about" },
    { name: "Programs", href: "/#programs" },
    { name: "Campus", href: "/#campus" },
    { name: "Admissions", href: "/#admissions" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Placement", href: "/#placement" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* <div className="bg-sitm-navy text-white py-2 px-4 text-xs md:text-sm hidden md:flex justify-between items-center z-50 relative">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Phone size={14} className="text-sitm-gold" /> +91 98765 43210
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-sitm-gold" /> Guwahati, Assam
          </span>
        </div>
        <div className="flex gap-4">
           <a href="#" className="hover:text-sitm-gold transition-colors">Alumni</a>
           <a href="#" className="hover:text-sitm-gold transition-colors">Careers</a>
        </div>
      </div> */}
      <div className="bg-sitm-gold/90 dark:bg-sitm-gold/80 backdrop-blur-md text-white py-2 overflow-hidden relative border-b border-sitm-gold/20">
  <div className="flex whitespace-nowrap animate-marquee gap-12 items-center">
    
    {/* AICTE */}
    <div className="flex items-center gap-2">
      <img src="/logos/Aictelogo.png" alt="AICTE" className="h-5 w-auto" />
      <span className="text-xs md:text-sm">
        Approved by AICTE, New Delhi
      </span>
    </div>

    {/* GU */}
    <div className="flex items-center gap-2">
      <img src="/logos/gulogo.jpg" alt="Guwahati University" className="h-5 w-auto" />
      <span className="text-xs md:text-sm">
        Affiliated to Guwahati University
      </span>
    </div>

    {/* ASTU */}
    <div className="flex items-center gap-2">
      <img src="/logos/Astulogo.png" alt="ASTU" className="h-5 w-auto" />
      <span className="text-xs md:text-sm">
        Affiliated to Assam Science and Technology University (ASTU)
      </span>
    </div>

    {/* Duplicate content for smooth loop */}
    <div className="flex items-center gap-2">
      <img src="/logos/Aictelogo.png" className="h-5 w-auto" />
      <span className="text-xs md:text-sm">
        Approved by AICTE, New Delhi
      </span>
    </div>

    <div className="flex items-center gap-2">
      <img src="/logos/gulogo.jpg" className="h-5 w-auto" />
      <span className="text-xs md:text-sm">
        Affiliated to Guwahati University
      </span>
    </div>

    <div className="flex items-center gap-2">
      <img src="/logos/Astulogo.png" className="h-5 w-auto" />
      <span className="text-xs md:text-sm">
        Affiliated to Assam Science and Technology University (ASTU)
      </span>
    </div>
    
    <div className="flex items-center gap-2">
      <img src="/logos/Aictelogo.png" className="h-5 w-auto" />
      <span className="text-xs md:text-sm">
        Approved by AICTE, New Delhi
      </span>
    </div>

    <div className="flex items-center gap-2">
      <img src="/logos/gulogo.jpg" className="h-5 w-auto" />
      <span className="text-xs md:text-sm">
        Affiliated to Guwahati University
      </span>
    </div>

  </div>
</div>


      <nav
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl border-white/20 dark:border-white/10 py-0"
            : "bg-white/5 dark:bg-black/10 backdrop-blur-md border-white/10 dark:border-white/5 py-1"
        )}
      >
        {/* Animated Background Blobs - Dark Mode Only - Wrapped in overflow hidden container to keep blobs contained */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500">
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#D56B6F]/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              x: [0, 80, 0],
              y: [0, -100, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] left-[5%] w-[60%] h-[60%] bg-[#F6E294]/20 rounded-full blur-[120px]"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-1 group">
            <img 
              src={logo} 
              alt="SITM Logo" 
              // Using block to ensure line-height doesn't add space
              className="h-16 md:h-20 w-auto object-contain block transition-transform duration-300 group-hover:scale-105" 
            />
            
            <span className={cn("text-3xl font-bold font-serif leading-none mt-1", isScrolled ? "text-sitm-navy dark:text-white" : "text-sitm-navy dark:text-white")}>
              SITM
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-semibold hover:text-sitm-maroon dark:hover:text-sitm-gold transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-sitm-maroon dark:after:bg-sitm-gold after:transition-all hover:after:w-full",
                   isScrolled ? "text-sitm-navy dark:text-gray-200" : "text-sitm-navy dark:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle className={isScrolled ? "text-gray-700 dark:text-gray-200" : "text-sitm-navy dark:text-white hover:bg-sitm-navy/10"} />
            <a href="#admissions">
                <Button size="sm" variant={isScrolled ? "primary" : "primary"}>
                Apply Now
                </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle className={isScrolled ? "text-gray-700 dark:text-gray-200" : "text-sitm-navy dark:text-white hover:bg-sitm-navy/10"} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn("p-2", isScrolled ? "text-gray-800 dark:text-white" : "text-sitm-navy dark:text-white")}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sitm-navy dark:text-gray-200 font-semibold py-2 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:text-sitm-maroon dark:hover:text-sitm-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#admissions" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">Apply Now</Button>
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
