// import { MapPin, Phone, Mail, Clock } from "lucide-react";
// import { Button } from "../common/Button";

// export function Contact() {
//   return (
//     <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <span className="text-sitm-maroon font-serif italic text-lg dark:text-sitm-gold">Get in Touch</span>
//           <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">Contact Us</h2>
//           <div className="w-24 h-1 bg-sitm-gold mx-auto"></div>
//         </div>
        
//         <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
//             {/* Info Side */}
//             <div className="bg-sitm-navy p-12 text-white flex flex-col justify-center">
//                 <h3 className="text-2xl font-serif font-bold mb-8 text-sitm-gold">Contact Information</h3>
//                 <div className="space-y-8">
//                     <div className="flex items-start gap-6">
//                         <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
//                             <MapPin className="text-sitm-gold" size={24} />
//                         </div>
//                         <div>
//                             <h4 className="font-bold text-lg mb-1">Campus Address</h4>
//                             <p className="text-gray-300 leading-relaxed">NH-37, Opp. ISBT, <br/>Guwahati, Assam - 781035</p>
//                         </div>
//                     </div>
//                     <div className="flex items-start gap-6">
//                         <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
//                             <Phone className="text-sitm-gold" size={24} />
//                         </div>
//                         <div>
//                             <h4 className="font-bold text-lg mb-1">Call Us</h4>
//                             <p className="text-gray-300">+91 98765 43210 (Admissions)</p>
//                             <p className="text-gray-300">+91 361 2345678 (General)</p>
//                         </div>
//                     </div>
//                     <div className="flex items-start gap-6">
//                         <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
//                             <Mail className="text-sitm-gold" size={24} />
//                         </div>
//                         <div>
//                             <h4 className="font-bold text-lg mb-1">Email Us</h4>
//                             <p className="text-gray-300">admissions@sitm.ac.in</p>
//                             <p className="text-gray-300">info@sitm.ac.in</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Map Side */}
//             <div className="h-96 md:h-auto bg-gray-200 relative">
//                  <iframe 
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1571.214488732152!2d91.724!3d26.115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sGuwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
//                     width="100%" 
//                     height="100%" 
//                     style={{ border: 0 }} 
//                     allowFullScreen="" 
//                     loading="lazy"
//                     className="absolute inset-0"
//                 >
//                 </iframe>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "../common/Button";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >

      {/* ===== GRADIENT BLOBS BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Maroon Blob */}
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[15%] w-[55%] h-[55%]
                     bg-[#D56B6F]/20 rounded-full blur-[100px]"
        />

        {/* Gold Blob */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[20%] w-[65%] h-[65%]
                     bg-[#F6E294]/20 rounded-full blur-[120px]"
        />

        {/* Bottom Maroon Blob */}
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%]
                     bg-[#D56B6F]/20 rounded-full blur-[110px]"
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-sitm-maroon font-serif italic text-lg dark:text-sitm-gold">
            Get in Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-sitm-navy dark:text-white mt-2 mb-4 font-serif">
            Contact Us
          </h2>

          <div className="w-24 h-1 bg-sitm-gold mx-auto"></div>
        </div>

        {/* Contact Layout */}
        <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">

          {/* Info Side */}
          <div className="bg-sitm-navy p-12 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-serif font-bold mb-8 text-sitm-gold">
              Contact Information
            </h3>

            <div className="space-y-8">

              {/* Address */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-sitm-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Campus Address</h4>
                  <p className="text-gray-300 leading-relaxed">
                    NH-37, Opp. ISBT, <br />
                    Guwahati, Assam - 781035
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-sitm-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Call Us</h4>
                  <p className="text-gray-300">+91 98765 43210 (Admissions)</p>
                  <p className="text-gray-300">+91 361 2345678 (General)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-sitm-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Us</h4>
                  <p className="text-gray-300">admissions@sitm.ac.in</p>
                  <p className="text-gray-300">info@sitm.ac.in</p>
                </div>
              </div>

            </div>
          </div>

          {/* Map Side */}
          <div className="h-96 md:h-auto bg-gray-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1571.214488732152!2d91.724!3d26.115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sGuwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="absolute inset-0"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
