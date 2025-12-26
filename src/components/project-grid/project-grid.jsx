"use client";
import { motion } from "framer-motion";

const ProjectGrid = ({ project, router, setHoveredImage }) => {
  return (
    <motion.div
      className="h-[100px] cursor-pointer"
      onClick={() => {
        router.push("/projects/" + project.id);
      }}
      onMouseEnter={() => setHoveredImage(project.img)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      <ul className="flex flex-col items-start justify-start mix-blend-exclusion ">
        <li className="normal-txt">{project.index}</li>
        <li className="normal-txt font-medium">{project.title}</li>
        <li className="normal-txt font-medium">{project.author}</li>
        <li className="normal-txt font-medium">{project.category}</li>
        <li className="normal-txt font-medium">{project.camera}</li>
      </ul>
    </motion.div>
  );
};
export default ProjectGrid;

