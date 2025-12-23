import { useCursorStore } from "@/store/zustand";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMedia } from "react-use";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const HeroProject = ({ project, index }) => {
  const imageRef = useRef(null);
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave, handleClick } = useCursorStore();
  const [onClicked, setOnClicked] = useState(false);
  const isTablet = useMedia("(max-width: 992px)");

  const calcTop = 16 + index * 16;
  const customPadding = index === 0 ? "150px 0 250px  0" : "5px";
  const customMargin = index === 0 ? 0 : "250px";

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
        className="sticky w-full px-4 mix-blend-exclusion"
        style={{ top: calcTop }}
      >
        <ul
          className="relative grid grid-cols-5 group max-lg:grid-cols-2"
          onClick={() => clickedInProject()}
        >
          <div className="flex items-center col-span-1 max-lg:gap-4">
            <a className="relative normal-txt group-hover:opacity-50 transition-all">
              {project.index}
            </a>
            <a className="normal-txt group-hover:opacity-50 transition-all hidden max-lg:block">
              {project.title}
            </a>
          </div>

          <a className="normal-txt group-hover:opacity-50 transition-all max-lg:hidden">
            {project.title}
          </a>

          <a className="normal-txt group-hover:opacity-50 transition-all">
            {project.author}
          </a>
          <a className="normal-txt group-hover:opacity-50 transition-all max-lg:hidden">
            {project.category}
          </a>
          <a className="normal-txt group-hover:opacity-50 transition-all max-lg:hidden">
            {project.camera}
          </a>
        </ul>

        <div className="fixed top-3 right-0 px-4">
          <a
            className="normal-txt"
            onClick={() => {
              router.push("/archive");
            }}
          >
            {index === 0 && "Archive"}
          </a>
        </div>
      </header>

      <motion.section
        className="h-fit px-4 flex items-center justify-center max-lg:!py-4 max-lg:!mb-35"
        style={{
          padding: `${customPadding}`,
          marginBottom: `${customMargin}`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.figure
          ref={imageRef}
          variants={zoomAnimation}
          initial="initial"
          animate={onClicked && "animate"}
          className="size-auto px-4  max-lg:px-3 cursor-none"
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
            className="max-h-[650px] h-full object-cover"
          />
        </motion.figure>

        <motion.div
          className="absolute "
          variants={opacityAnimation}
          initial="initial"
          animate={onClicked ? "animate" : "initial"}
        >
          <h2 className="normal-txt">Loading</h2>
        </motion.div>
      </motion.section>
    </>
  );
};

export default HeroProject;
