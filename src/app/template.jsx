"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Template = ({ children }) => {
  const pathname = usePathname();
  
  // Buttery smooth page transition - elegant fade with subtle movement
  const pageTransition = {
    initial: {
      opacity: 0,
      y: 6,
      filter: "blur(6px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      // Avoid a noticeable "fade-out on click" — keep exit nearly static and let the next page fade in.
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="block size-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
