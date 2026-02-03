import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import aiMascot from "../../assets/ai-mascot.png";

export function FloatingChatbot() {
  const location = useLocation();
  
  // Don't show on scholarships page - MUST be before any other hooks
  if (location.pathname === '/scholarships') {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm SITM Bot 🤖 How can I help you learn more about our programs and campus?",
      timestamp: new Date()
    }
  ]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const dragRef = useRef(null);
  const dragConstraints = useRef(null);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000); // Random blink every 3-5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  // Waving animation
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
    }, 8000 + Math.random() * 4000); // Random wave every 8-12 seconds

    return () => clearInterval(waveInterval);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      type: "user",
      text: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thanks for your question! For detailed information about our programs, please visit our Programs section or contact our admissions office.",
        "I'd be happy to help! You can find more information about SITM on our website. Is there a specific program you're interested in?",
        "Great question! Our admissions team can provide you with detailed information. You can also explore our campus gallery to see our facilities.",
        "I'm here to help! For specific queries about admissions, fees, or programs, please contact our office directly or check out our detailed program pages."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      setMessages(prev => [...prev, {
        type: "bot",
        text: randomResponse,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Drag Constraints Container */}
      <div ref={dragConstraints} className="fixed inset-0 pointer-events-none z-40" />

      {/* Floating Chatbot */}
      <motion.div
        ref={dragRef}
        drag
        dragConstraints={dragConstraints}
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          // Small delay to prevent accidental click after drag
          setTimeout(() => setIsDragging(false), 50);
        }}
        className="fixed bottom-10 right-10 z-9999 cursor-grab active:cursor-grabbing pointer-events-auto touch-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-28 right-0 w-80 h-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="bg-linear-to-r from-sitm-navy to-sitm-maroon p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">SITM Assistant</h3>
                      <p className="text-xs opacity-80">Online now</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Messages Content */}
              <div className="flex flex-col h-[calc(100%-128px)]">
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                          ? 'bg-sitm-navy text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-md'
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sitm-navy dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-sitm-navy text-white rounded-full hover:bg-sitm-maroon transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Icon Layer (Floating + Clickable) */}
        <motion.div
          onClick={() => {
            if (!isDragging) setIsOpen(!isOpen);
          }}
          className="relative w-56 h-56 flex items-center justify-center"
          animate={{ 
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <img 
            src={aiMascot} 
            alt="AI Assistant" 
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal contrast-[1.1] brightness-[1.02] select-none scale-110"
            style={{ 
              filter: "drop-shadow(0 25px 50px rgba(128, 0, 32, 0.25))"
            }}
            draggable="false"
          />
        </motion.div>
      </motion.div>
    </>
  );
}