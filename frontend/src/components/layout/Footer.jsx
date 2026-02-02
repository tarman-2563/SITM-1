import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../common/Button";
import logo from "../../assets/logo_new-removebg-preview.png";

export function Footer() {
  return (
    <footer className="bg-sitm-navy text-white pt-20 pb-10 border-t border-sitm-navy-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sitm-maroon via-sitm-gold to-sitm-maroon"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="SITM Logo" className="h-14 w-auto rounded-lg" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-serif leading-none">SITM</span>
                <span className="text-[0.6rem] tracking-wider uppercase text-gray-400">Excellence in Education</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering students with knowledge, skills, and values to become global leaders in technology and management.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-sitm-navy-light/40 border border-sitm-navy-light flex items-center justify-center hover:bg-sitm-gold hover:text-sitm-navy transition-all duration-300 transform hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-sitm-gold">Quick Links</h3>
            <ul className="space-y-4">
              {["About Us", "Admissions", "Academic Programs", "Campus Life", "Placements", "Alumni"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sitm-maroon"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-sitm-gold">Resources</h3>
            <ul className="space-y-4">
              {["Student Portal", "Faculty Portal", "Library", "Research", "NPTEL / MOOCs", "Grievance Cell"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sitm-maroon"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-sitm-gold">Get in Touch</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-sitm-maroon shrink-0" />
                <span className="text-gray-300">NH-37, Opp. ISBT, Guwahati, Assam - 781035</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-sitm-maroon shrink-0" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-sitm-maroon shrink-0" />
                <span className="text-gray-300">info@sitm.ac.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sitm-navy-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SITM. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Mandatory Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
