import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PropTypes from "prop-types";

export const Reveal = ({ children, width = "fit-content", className, overflow = "hidden" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });

  const mainControls = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow }} className={className}>
      <motion.div
        variants={mainControls}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  className: PropTypes.string,
  overflow: PropTypes.string,
};
