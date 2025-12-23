"use client";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useCursorStore, usePlayingVideoStore } from "@/store/zustand";

export const Cursor = () => {
  const { cursorVariant } = useCursorStore();
  const { isPlaying } = usePlayingVideoStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
