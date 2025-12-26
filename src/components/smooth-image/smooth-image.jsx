"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";

/**
 * SmoothImage
 * - Animates in only after the image has *decoded* (onLoadingComplete) for a truly smooth reveal
 * - Optionally waits until in-view to avoid animating offscreen content
 */
const SmoothImage = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  priority = false,
  width,
  height,
  fill = false,
  sizes,
  inView = true,
  inViewMargin = "200px 0px -100px 0px",
  delay = 0,
  duration = 0.9,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const wrapperRef = useRef(null);
  const isInView = useInView(wrapperRef, { once: true, margin: inViewMargin });
  const [isDecoded, setIsDecoded] = useState(false);

  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 8,
        scale: 1.01,
        filter: "blur(24px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }),
    [delay, duration]
  );

  const shouldShow = (inView ? isInView : true) && isDecoded;

  return (
    <motion.div
      ref={wrapperRef}
      variants={variants}
      initial="hidden"
      animate={shouldShow ? "visible" : "hidden"}
      className={`relative overflow-hidden z-0 ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ willChange: "opacity, transform, filter" }}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        className={imgClassName}
        onLoadingComplete={() => setIsDecoded(true)}
      />
    </motion.div>
  );
};

export default SmoothImage;


