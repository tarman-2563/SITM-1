import { useEffect, useRef, useState } from "react";
import { useInView, animate, motion } from "framer-motion";
import PropTypes from "prop-types";

export const Counter = ({ from = 0, to, duration = 2, suffix = "", className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" }); // Allow re-triggering
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    // Initialize text content immediately
    if (ref.current) {
        ref.current.textContent = from + suffix;
    }
  }, [from, suffix]);

  useEffect(() => {
    if (isInView) {
      setIsCounting(true);
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(value) + suffix;
          }
        },
        onComplete: () => {
             setIsCounting(false);
             if (ref.current) {
                 ref.current.textContent = to + suffix; // Ensure final value is accurate
             }
        }
      });
      return () => controls.stop();
    } else {
        // Optional: Reset to start value when out of view so it animates again from start
        if (ref.current) {
            ref.current.textContent = from + suffix;
        }
        setIsCounting(false);
    }
  }, [isInView, from, to, duration, suffix]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block font-black font-serif ${className}`}
      style={{
        color: 'inherit'
      }}
      animate={isCounting ? { 
        scale: [1, 1.1, 1]
      } : { 
        scale: 1
      }}
      transition={{ 
        duration: 1, 
        repeat: isCounting ? Infinity : 0,
        ease: "easeInOut"
      }}
    />
  );
};

Counter.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number.isRequired,
  duration: PropTypes.number,
  suffix: PropTypes.string,
  className: PropTypes.string,
};
