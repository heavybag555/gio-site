"use client";

import Filters from "@/components/filters/filters";
import ProjectGrid from "@/components/project-grid/project-grid";
import ProjectList from "@/components/project-list/project-list";
import ArchiveBackground from "@/components/archive-background/archive-background";
import projectsData from "@/data/projectsData";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";
import ProjectMobile from "@/components/project-mobile/project-mobile";

const opacityAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const Nav = ({
  activeFilter,
  setActiveFilter,
  layout,
  setLayout,
  router,
  isTablet,
}) => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <>
      {!isTablet ? (
        <nav className="fixed top-0 right-0 py-3 px-4 mix-blend-exclusion">
          <button
            className="mb-4 normal-txt text-end hover:text-gray-400 transition-colors"
            onClick={() => {
              router.push("/");
            }}
          >
            Close
          </button>
          <ul>
            <li className="flex flex-col items-end">
              <button
                className={`normal-txt text-end hover:opacity-50 ${
                  layout === "grid" ? "opacity-50" : ""
                }`}
                onClick={() => setLayout("grid")}
              >
                Grid
              </button>
              <button
                className={`normal-txt text-end hover:opacity-50 ${
                  layout === "list" ? "opacity-50" : ""
                }`}
                onClick={() => setLayout("list")}
              >
                List
              </button>

              <button
                className={`mb-4 normal-txt text-end hover:opacity-50 
              ${filtersVisible ? "opacity-50" : ""}`}
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                Filters
              </button>
              <AnimatePresence>
                {filtersVisible && (
                  <Filters
                    onSelectFilter={(cat) =>
                      setActiveFilter((prev) => (prev === cat ? null : cat))
                    }
                    activeFilter={activeFilter}
                    opacityAnimation={opacityAnimation}
                  />
                )}
              </AnimatePresence>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="fixed bottom-8 right-0 py-3 px-4 mix-blend-exclusion">
          <ul>
            <li className="flex flex-col items-end">
              <button
                className={`mb-4 normal-txt text-end hover:opacity-50 max-lg:mb-3 
              ${filtersVisible ? "opacity-50" : ""}`}
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                Filters
              </button>
              <AnimatePresence>
                {filtersVisible && (
                  <Filters
                    onSelectFilter={(cat) =>
                      setActiveFilter((prev) => (prev === cat ? null : cat))
                    }
                    activeFilter={activeFilter}
                    opacityAnimation={opacityAnimation}
                    setFiltersVisible={setFiltersVisible}
                  />
                )}
              </AnimatePresence>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

const Archive = () => {
  const router = useRouter();
  const isTablet = useMedia("(max-width: 992px)");
  const [activeFilter, setActiveFilter] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [hoveredImage, setHoveredImage] = useState(null);
  const filteredProjects = activeFilter
    ? projectsData.filter((p) => p.category === activeFilter)
    : projectsData;

  return (
    <>
      <ArchiveBackground hoveredImage={hoveredImage} />
      {!isTablet ? (
        <main className={` ${layout === "grid" ? "px-5 py-6" : "px-2 py-6"}`}>
          <section
            className={`w-full ${
              layout === "grid"
                ? "grid grid-cols-5 gap-20"
                : "flex flex-col gap-0"
            } justify-between`}
          >
            {filteredProjects.map((project, i) =>
              layout === "grid" ? (
                <ProjectGrid
                  key={i}
                  project={project}
                  router={router}
                  setHoveredImage={setHoveredImage}
                />
              ) : (
                <ProjectList
                  key={i}
                  project={project}
                  router={router}
                  setHoveredImage={setHoveredImage}
                />
              )
            )}

            <Nav
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              layout={layout}
              setLayout={setLayout}
              router={router}
              isTablet={isTablet}
            />
          </section>
        </main>
      ) : (
        <>
          {filteredProjects.map((project, i) => (
            <ProjectMobile key={i} project={project} index={i} />
          ))}
          <Nav
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            layout={layout}
            setLayout={setLayout}
            router={router}
            isTablet={isTablet}
          />
        </>
      )}
    </>
  );
};

export default Archive;
