import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../common/Button";
import { ThemeToggle } from "./ThemeToggle";
import logo from "../../assets/logo.jpeg";

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
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Campus", href: "#campus" },
    { name: "Admissions", href: "#admissions" },
    { name: "Placement", href: "#placement" },
    { name: "Contact", href: "#contact" },
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

      <nav
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-md border-gray-200 dark:border-slate-800 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="SITM Logo" className="h-12 w-auto object-contain rounded-md" />
            <div className="flex flex-col">
              <span className={cn("text-xl font-bold font-serif leading-none", isScrolled ? "text-sitm-maroon dark:text-white" : "text-white")}>
                SITM
              </span>
              <span className={cn("text-[0.6rem] tracking-wider uppercase", isScrolled ? "text-gray-600 dark:text-gray-400" : "text-gray-200")}>
                Scholars Institute of <br></br>Technology & Management
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium hover:text-sitm-gold transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-sitm-gold after:transition-all hover:after:w-full",
                   isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white"
                )}
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle className={isScrolled ? "text-gray-700 dark:text-gray-200" : "text-white hover:bg-white/20 hover:text-white"} />
            <a href="#admissions">
                <Button size="sm" variant={isScrolled ? "primary" : "secondary"}>
                Apply Now
                </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle className={isScrolled ? "text-gray-700 dark:text-gray-200" : "text-white hover:bg-white/20 hover:text-white"} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn("p-2", isScrolled ? "text-gray-800 dark:text-white" : "text-white")}
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
                className="text-gray-800 dark:text-gray-200 font-medium py-2 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:text-sitm-maroon dark:hover:text-sitm-gold"
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
