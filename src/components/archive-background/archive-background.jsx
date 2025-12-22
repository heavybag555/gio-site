import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ArchiveBackground = ({ hoveredImage }) => {
  return (
    <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            key={hoveredImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={hoveredImage}
              alt="Background"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArchiveBackground;
