import { useCursorStore } from "@/store/zustand";
import { useInView } from "framer-motion";
import { useMedia } from "react-use";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import SmoothImage from "@/components/smooth-image/smooth-image";

const HeroProject = ({
  project,
  index,
  topRightLabel = "Archive",
  onTopRightClick,
  showTopRightOnFirstOnly = true,
}) => {
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave, handleClick } = useCursorStore();
  const isTablet = useMedia("(max-width: 992px)", false);
  const imageContainerRef = useRef(null);
  // Keep this around to improve cursor behavior timing on long pages
  useInView(imageContainerRef, { once: true, margin: "200px 0px -100px 0px" });

  // Default top-right action: navigate to /archive
  const handleTopRightClick = onTopRightClick || (() => router.push("/archive"));

  // Use CSS variable for base + offset per subsequent item for stacking
  const calcTop = index === 0 
    ? 'var(--pageInsetTop)' 
    : `calc(var(--pageInsetTop) + ${index * 16}px)`;
  const customPadding = index === 0 ? "108px 1rem 250px 1rem" : "5px";
  const customMargin = index === 0 ? 0 : "250px";

  const clickedInProject = () => {
    handleClick();
    router.push("/projects/" + project.id);
  };

  return (
    <>
      <header
        className="sticky w-full px-4 mix-blend-exclusion relative z-30"
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

      <section
        className="h-fit px-4 flex items-center justify-center max-lg:!py-4 max-lg:!px-[5px] max-lg:!mb-35 relative z-0"
        style={{
          padding: `${customPadding}`,
          marginBottom: `${customMargin}`,
        }}
      >
        <figure
          ref={imageContainerRef}
          className="size-auto px-4 max-lg:px-3 cursor-none relative z-0"
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
            priority={index === 0}
            width={1200}
            height={800}
            inView
            inViewMargin="200px 0px -100px 0px"
            className="w-[1200px] max-w-full"
            imgClassName="w-full h-auto"
          />
        </figure>
      </section>
    </>
  );
};

export default HeroProject;
