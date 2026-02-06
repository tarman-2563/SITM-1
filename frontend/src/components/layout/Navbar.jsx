import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "../common/Button";
import { ThemeToggle } from "./ThemeToggle";
import logo from "../../assets/logo_new-removebg-preview.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ["about", "programs", "campus", "admissions", "placement", "awards", "gallery", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "About", href: "/#about", id: "about" },
    { name: "Programs", href: "/#programs", id: "programs" },
    { name: "Campus", href: "/#campus", id: "campus" },
    { name: "Admissions", href: "/#admissions", id: "admissions" },
    { name: "Placement", href: "/#placement", id: "placement" },
    { name: "Awards", href: "/#awards", id: "awards" },
    { name: "Gallery", href: "/#gallery", id: "gallery" },
    { name: "Contact", href: "/#contact", id: "contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Marquee Bar */}
      <div className={cn(
        "bg-sitm-gold/60 text-white overflow-hidden relative transition-all duration-500",
        isScrolled ? "h-0 py-0 opacity-0" : "h-auto py-1.5 opacity-100"
      )}>
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-sitm-gold/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-sitm-gold/60 to-transparent z-10 pointer-events-none" />
        
        <div className="flex whitespace-nowrap animate-marquee gap-8 items-center">
          {/* AICTE */}
          <div className="flex items-center gap-2">
            <img src="/logos/Aictelogo.png" alt="AICTE Approved" className="h-4 w-auto" />
            <span className="text-xs font-medium">
              Approved by AICTE, New Delhi
            </span>
          </div>

          {/* GU */}
          <div className="flex items-center gap-2">
            <img src="/logos/gulogo.jpg" alt="Guwahati University Affiliated" className="h-4 w-auto" />
            <span className="text-xs font-medium">
              Affiliated to Guwahati University
            </span>
          </div>

          {/* ASTU */}
          <div className="flex items-center gap-2">
            <img src="/logos/Astulogo.png" alt="ASTU Affiliated" className="h-4 w-auto" />
            <span className="text-xs font-medium">
              Affiliated to Assam Science and Technology University
            </span>
          </div>

          {/* Duplicate for smooth loop */}
          <div className="flex items-center gap-2">
            <img src="/logos/Aictelogo.png" alt="AICTE Approved" className="h-4 w-auto" />
            <span className="text-xs font-medium">
              Approved by AICTE, New Delhi
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src="/logos/gulogo.jpg" alt="Guwahati University Affiliated" className="h-4 w-auto" />
            <span className="text-xs font-medium">
              Affiliated to Guwahati University
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src="/logos/Astulogo.png" alt="ASTU Affiliated" className="h-4 w-auto" />
            <span className="text-xs font-medium">
              Affiliated to Assam Science and Technology University
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-black/5 dark:border-white/10 shadow-md py-2"
            : "bg-white/10 dark:bg-black/20 backdrop-blur-md border-white/10 dark:border-white/5 py-3"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="SITM Logo" 
              className="h-14 w-auto object-contain block transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className={cn(
                "text-2xl font-bold font-serif leading-none",
                isScrolled ? "text-sitm-navy dark:text-white" : "text-white"
              )}>
                SITM
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors relative py-2",
                  isScrolled 
                    ? "text-sitm-navy dark:text-white hover:text-sitm-maroon dark:hover:text-sitm-gold" 
                    : "text-white/90 hover:text-white",
                  activeSection === link.id && "text-sitm-gold"
                )}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sitm-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <ThemeToggle className={cn(
              isScrolled ? "text-sitm-navy dark:text-white" : "text-white"
            )} />
            <a href="#admissions">
              <Button size="sm">
                Apply Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle className={cn(
              isScrolled ? "text-sitm-navy dark:text-white" : "text-white"
            )} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isScrolled 
                  ? "text-sitm-navy dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800" 
                  : "text-white hover:bg-white/10"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-slate-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-sitm-navy dark:text-white">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} className="text-sitm-navy dark:text-white" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2 mb-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sitm-navy dark:text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                {/* CTA Button */}
                <a href="#admissions" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
