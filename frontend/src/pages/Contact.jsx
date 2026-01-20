import { PageHeader } from "../components/common/PageHeader";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <PageHeader title="Contact Us" subtitle="Get in touch for admissions and inquiries" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
            
            <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sitm-maroon rounded-full flex items-center justify-center text-white shrink-0">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-sitm-navy dark:text-white mb-2">Campus Address</h3>
                        <p className="text-gray-600 dark:text-gray-400">NH-37, Opp. ISBT, <br/>Guwahati, Assam - 781035</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sitm-maroon rounded-full flex items-center justify-center text-white shrink-0">
                        <Phone size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-sitm-navy dark:text-white mb-2">Phone Numbers</h3>
                        <p className="text-gray-600 dark:text-gray-400">+91 98765 43210 (Admissions)</p>
                        <p className="text-gray-600 dark:text-gray-400">+91 361 2345678 (Office)</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-sitm-maroon rounded-full flex items-center justify-center text-white shrink-0">
                        <Mail size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-sitm-navy dark:text-white mb-2">Email Us</h3>
                        <p className="text-gray-600 dark:text-gray-400">admissions@sitm.ac.in</p>
                        <p className="text-gray-600 dark:text-gray-400">info@sitm.ac.in</p>
                    </div>
                </div>
            </div>

            {/* Google Maps Embed */}
            <div className="h-80 md:h-full w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-800 bg-gray-200">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1571.214488732152!2d91.724!3d26.115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sGuwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy">
                </iframe>
            </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
