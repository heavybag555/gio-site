import { useCursorStore } from "@/store/zustand";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMedia } from "react-use";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ProjectMobile = ({ project, index }) => {
  const imageRef = useRef(null);
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave, handleClick } = useCursorStore();
  const [hoverVideo, setHoverVideo] = useState(null);
  const [onClicked, setOnClicked] = useState(false);
  const isTablet = useMedia("(max-width: 992px)", false);

  const calcTop = 16 + index * 16;

  const zoomAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: 2,
      transition: {
        duration: 0.25,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const opacityAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
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
    }, 500);

    handleClick();
  };

  return (
    <>
      <header
        className="sticky w-full px-5 mix-blend-exclusion"
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

      <section className="w-full h-fit px-4 py-4 mb-35 flex items-center justify-center ">
        <motion.figure
          ref={imageRef}
          variants={zoomAnimation}
          initial="initial"
          animate={onClicked && "animate"}
          className="size-full "
          onMouseEnter={
            !isTablet ? () => handleMouseEnter("projectHero") : undefined
          }
          onMouseLeave={!isTablet ? handleMouseLeave : undefined}
          onClick={() => {
            clickedInProject();
          }}
        >
          <Image
            src={project.img}
            width={1200}
            height={1200}
            alt=""
            className="size-full object-cover"
          />
        </motion.figure>

        <motion.div
          className="absolute "
          variants={opacityAnimation}
          initial="initial"
          animate={onClicked ? "animate" : "initial"}
        >
          <h2 className="normal-txt">LOADING</h2>
        </motion.div>
      </section>
    </>
  );
};

export default ProjectMobile;
