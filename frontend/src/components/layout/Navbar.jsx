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
      {/* Main Navbar */}
      <nav
        className={cn(
          "w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-black/5 dark:border-white/10 shadow-md py-2"
            : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-black/5 dark:border-white/10 shadow-md py-3"
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
              <span className="text-2xl font-bold font-serif leading-none text-sitm-navy dark:text-white">
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
                  "text-sm font-semibold transition-colors relative py-2 text-sitm-navy dark:text-white hover:text-sitm-maroon dark:hover:text-sitm-gold",
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
            <ThemeToggle 
              className={cn(
                isScrolled ? "text-sitm-navy dark:text-white" : "text-white"
              )}
              isScrolled={isScrolled}
            />
            <Link to="/login">
              <Button 
                size="sm" 
                variant="outline"
                className="border-2 transition-all duration-300 border-sitm-navy text-sitm-navy hover:bg-sitm-navy hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-sitm-navy"
              >
                Login
              </Button>
            </Link>
            <a href="#admissions">
              <Button size="sm">
                Apply Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle 
              className="text-sitm-navy dark:text-white"
              isScrolled={true}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-colors text-sitm-navy dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
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

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-2 border-sitm-navy text-sitm-navy hover:bg-sitm-navy hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-sitm-navy" size="lg">
                      Login
                    </Button>
                  </Link>
                  <a href="#admissions" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full" size="lg">
                      Apply Now
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
