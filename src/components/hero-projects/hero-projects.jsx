import { useCursorStore } from "@/store/zustand";
import { motion } from "framer-motion";
import { useMedia } from "react-use";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const HeroProject = ({
  project,
  index,
  topRightLabel = "Archive",
  onTopRightClick,
  showTopRightOnFirstOnly = true,
}) => {
  const imageRef = useRef(null);
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave, handleClick } = useCursorStore();
  const [onClicked, setOnClicked] = useState(false);
  const isTablet = useMedia("(max-width: 992px)", false);

  // Default top-right action: navigate to /archive
  const handleTopRightClick = onTopRightClick || (() => router.push("/archive"));

  // Use CSS variable for base + offset per subsequent item for stacking
  const calcTop = index === 0 
    ? 'var(--pageInsetTop)' 
    : `calc(var(--pageInsetTop) + ${index * 16}px)`;
  const customPadding = index === 0 ? "108px 1rem 250px 1rem" : "5px";
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
            <a className="normal-txt font-medium group-hover:opacity-50 transition-all hidden max-lg:block">
              {project.title}
            </a>
          </div>

          <a className="normal-txt font-medium group-hover:opacity-50 transition-all max-lg:hidden">
            {project.title}
          </a>

          <a className="normal-txt font-medium group-hover:opacity-50 transition-all">
            {project.author}
          </a>
          <a className="normal-txt font-medium group-hover:opacity-50 transition-all max-lg:hidden">
            {project.category}
          </a>
          <a className="normal-txt font-medium group-hover:opacity-50 transition-all max-lg:hidden">
            {project.camera}
          </a>
        </ul>

        {showTopRightOnFirstOnly ? (
          index === 0 && (
            <a
              className="absolute top-0 right-4 normal-txt hover:text-gray-400 transition-colors"
              onClick={handleTopRightClick}
            >
              {topRightLabel}
            </a>
          )
        ) : (
          <a
            className="absolute top-0 right-4 normal-txt hover:text-gray-400 transition-colors"
            onClick={handleTopRightClick}
          >
            {topRightLabel}
          </a>
        )}
      </header>

      <motion.section
        className="h-fit px-4 flex items-center justify-center max-lg:!py-4 max-lg:!px-[5px] max-lg:!mb-35"
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
          <img
            src={project.img}
            alt=""
            className="w-[1200px] max-w-full h-auto"
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
