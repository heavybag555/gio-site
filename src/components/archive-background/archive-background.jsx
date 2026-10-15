import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArchiveBackground = ({ hoveredImage }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "#000",
        pointerEvents: "none",
      }}
    >
      <AnimatePresence mode="wait">
        {hoveredImage && (
          <motion.img
            key={hoveredImage}
            src={hoveredImage}
            alt="Background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArchiveBackground;
