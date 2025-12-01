"use client";
import { motion } from "framer-motion";

const ProjectGrid = ({ project, router }) => {
  return (
    <motion.div
      className="h-[100px] cursor-pointer"
      onClick={() => {
        router.push("/projects/" + project.id);
      }}
    >
      <ul className="flex flex-col items-start justify-start mix-blend-exclusion ">
        <li className="normal-txt">{project.index}</li>
        <li className="normal-txt">{project.title}</li>
        <li className="normal-txt">{project.author}</li>
        <li className="normal-txt">{project.category}</li>
        <li className="normal-txt">{project.camera}</li>
      </ul>
    </motion.div>
  );
};
export default ProjectGrid;
