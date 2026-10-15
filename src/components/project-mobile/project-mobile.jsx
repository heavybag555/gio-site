import { useCursorStore } from "@/store/zustand";
import { motion } from "framer-motion";
import { useMedia } from "react-use";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SmoothImage from "@/components/smooth-image/smooth-image";

const ProjectMobile = ({ project, index }) => {
  const imageRef = useRef(null);
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave, handleClick } = useCursorStore();
  const [hoverVideo, setHoverVideo] = useState(null);
  const [onClicked, setOnClicked] = useState(false);
  const isTablet = useMedia("(max-width: 992px)", false);

  const calcTop = 16 + index * 16;

  // Subtle click feedback (no zoom): a gentle soften/fade while routing.
  const clickFeedback = {
    initial: { opacity: 1, filter: "blur(0px)" },
    clicked: {
      opacity: 0.78,
      filter: "blur(4px)",
      transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const clickedInProject = () => {
    setOnClicked(true);

    imageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      router.push("/projects/" + project.id);
      setOnClicked(false);
    }, 120);

    handleClick();
  };

  return (
    <>
      <header
        className="sticky w-full px-5 mix-blend-exclusion relative z-30"
        style={{ top: calcTop }}
        onMouseEnter={() => setHoverVideo(true)}
        onMouseLeave={() => setHoverVideo(false)}
      >
        <ul
          className="grid grid-cols-2 group z-10"
          onClick={() => clickedInProject()}
        >
          <div className="flex items-center col-span-1 gap-4">
            <a className="normal-txt group-hover:opacity-50 transition-all">
              {project.index}
            </a>
            <a className="normal-txt mr-4 truncate group-hover:opacity-50 transition-all">
              {project.title}
            </a>
          </div>

          <a className="normal-txt group-hover:opacity-50 transition-all">
            {project.author}
          </a>
        </ul>

        <div className="fixed top-3 right-0 px-4 z-50">
          <a
            className="normal-txt uppercase"
            onClick={() => {
              router.back("/");
            }}
          >
            {index === 0 && "CLOSE"}
          </a>
        </div>
      </header>

      <section className="w-full h-fit px-4 py-4 mb-35 flex items-center justify-center relative z-0">
        <motion.figure
          ref={imageRef}
          variants={clickFeedback}
          initial="initial"
          animate={onClicked ? "clicked" : "initial"}
          className="size-full relative z-0"
          onMouseEnter={
            !isTablet ? () => handleMouseEnter("projectHero") : undefined
          }
          onMouseLeave={!isTablet ? handleMouseLeave : undefined}
          onClick={() => {
            clickedInProject();
          }}
        >
          <SmoothImage
            src={project.img}
            alt={project.title || ""}
            width={1200}
            height={1200}
            inView={false}
            duration={0.85}
            className="size-full"
            imgClassName="size-full object-cover"
          />
        </motion.figure>
      </section>
    </>
  );
};

export default ProjectMobile;
