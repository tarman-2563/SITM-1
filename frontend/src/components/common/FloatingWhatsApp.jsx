import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const location = useLocation();
  const message = encodeURIComponent("Hello 👋 I want to know more about SITM");
  
  // State for position
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('whatsapp-position');
    return saved ? JSON.parse(saved) : { x: window.innerWidth - 100, y: 160 };
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  // Don't show on scholarships page
  if (location.pathname === '/scholarships') {
    return null;
  }

  const handleMouseDown = (e) => {
    // Prevent default to avoid text selection
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 70;
    const maxY = window.innerHeight - 70;
    
    const boundedX = Math.max(10, Math.min(newX, maxX));
    const boundedY = Math.max(10, Math.min(newY, maxY));
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Save position to localStorage
      localStorage.setItem('whatsapp-position', JSON.stringify(position));
    }
  };

  const handleClick = (e) => {
    // Only open WhatsApp if not dragging
    if (isDragging) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, position]);

  return (
    <div
      ref={buttonRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 50,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      className="group"
    >
      <a
        href={`https://wa.me/9365436698?text=${message}`} 
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block"
      >
        <div className={`w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center
                        shadow-lg transition-all duration-300 ${
                          isDragging ? 'scale-110 shadow-2xl' : 'hover:scale-110'
                        }`}>
          <FaWhatsapp className="text-white text-3xl" />
        </div>
      </a>
    </div>
  );
}
