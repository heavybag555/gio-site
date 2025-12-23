"use client";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useCursorStore, usePlayingVideoStore } from "@/store/zustand";
import { useMedia } from "react-use";

export const Cursor = () => {
  const { cursorVariant } = useCursorStore();
  const { isPlaying } = usePlayingVideoStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isTabletOrMobile = useMedia("(max-width: 992px)", false);

  useEffect(() => {
    const manageMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  // Hide custom cursor on tablet/mobile
  if (isTabletOrMobile) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 mix-blend-exclusion pointer-events-none z-[500]"
        style={{ x: mouseX, y: mouseY }}
        key={cursorVariant}
      >
        <div className="size-full">
          {cursorVariant === "default" && <div className="hidden" />}
          {cursorVariant === "projectHero" && (
            <div className="normal-txt">View</div>
          )}
          {cursorVariant === "playVideo" && (
            <div className="normal-txt">{isPlaying ? "Pause" : "Play"}</div>
          )}
        </div>
      </motion.div>
    </>
  );
};
