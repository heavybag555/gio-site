"use client";

const ProjectList = ({ project, router }) => {
  return (
    <div
      className="relative w-full px-4"
      onClick={() => {
        router.push("/projects/" + project.id);
      }}
    >
      <ul className="relative grid grid-cols-5 group">
        <div className="flex items-center">
          <a className="relative normal-txt !text-black group-hover:opacity-50 transition-all">
            {project.index}
          </a>
        </div>

        <a className="normal-txt !text-black group-hover:opacity-50 transition-all">
          {project.title}
        </a>
        <a className="normal-txt !text-black group-hover:opacity-50 transition-all">
          {project.author}
        </a>
        <a className="normal-txt !text-black group-hover:opacity-50 transition-all">
          {project.category}
        </a>
        <a className="normal-txt !text-black group-hover:opacity-50 transition-all">
          {project.camera}
        </a>
      </ul>
    </div>
  );
};
export default ProjectList;
