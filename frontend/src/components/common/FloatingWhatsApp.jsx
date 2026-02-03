import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent("Hello 👋 I want to know more about SITM");

  return (
    <a
      href={`https://wa.me/9365436698?text=${message}`} 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-40 right-6 z-50"
    >
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center
                      shadow-lg hover:scale-110 transition-all duration-300">
        <FaWhatsapp className="text-white text-3xl" />
      </div>
    </a>
  );
}
