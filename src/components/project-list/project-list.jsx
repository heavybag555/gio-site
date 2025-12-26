"use client";

const ProjectList = ({ project, router, setHoveredImage }) => {
  return (
    <div
      className="relative w-full"
      onClick={() => {
        router.push("/projects/" + project.id);
      }}
      onMouseEnter={() => setHoveredImage(project.img)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      <ul className="relative grid grid-cols-5 group">
        <div className="flex items-center">
          <a className="relative normal-txt group-hover:opacity-50 transition-all">
            {project.index}
          </a>
        </div>

<<<<<<< Updated upstream
        <a className="normal-txt font-medium group-hover:opacity-50 transition-all">
          {project.title}
        </a>
        <a className="normal-txt font-medium group-hover:opacity-50 transition-all">
          {project.author}
        </a>
        <a className="normal-txt font-medium group-hover:opacity-50 transition-all">
          {project.category}
        </a>
        <a className="normal-txt font-medium group-hover:opacity-50 transition-all">
=======
        <a className="normal-txt group-hover:opacity-50 transition-all">
          {project.title}
        </a>
        <a className="normal-txt group-hover:opacity-50 transition-all">
          {project.author}
        </a>
        <a className="normal-txt group-hover:opacity-50 transition-all">
          {project.category}
        </a>
        <a className="normal-txt group-hover:opacity-50 transition-all">
>>>>>>> Stashed changes
          {project.camera}
        </a>
      </ul>
    </div>
  );
};
export default ProjectList;
