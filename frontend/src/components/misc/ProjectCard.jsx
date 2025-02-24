import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Track expansion state

  const description = project?.description || "";
  const isLongDescription = description.length > 90;

  const difficultyColors = {
    easy: "bg-green-200",
    intermediate: "bg-orange-200",
    difficult: "bg-red-200",
  };
  const bgColor = difficultyColors[project?.difficulty?.toLowerCase()] || "bg-gray-200";

  return (
    <div className={`rounded-xl shadow-md relative p-4 ${bgColor}`}>
      <div className="mb-6">
        {project?.difficulty && <div className="text-gray-600 my-2">{project.difficulty}</div>}
        <h3 className="text-xl font-bold">{project?.title || "Untitled Project"}</h3>
      </div>

      <p className={`transition-all ${isExpanded ? "max-h-screen" : "max-h-[60px] overflow-hidden"}`}>
        {isExpanded ? description : description.substring(0, 90) + (isLongDescription ? "..." : "")}
      </p>

      {isLongDescription && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            setIsExpanded(!isExpanded); // Toggle state
          }}
          className="text-indigo-500 mt-2 hover:text-indigo-800 cursor-pointer"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </a>
      )}

      <div className="border border-gray-100 my-5"></div>

      {/* More Info Button */}
      {project?.id && (
        <Link
          to={`/details/${encodeURIComponent(project.id)}`}
          state={{ project }} // Passing project data including steps
          className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm block w-full mb-3"
        >
          More Info
        </Link>
      )}

      {/* Select Project Button */}
      <button
        onClick={() => onSelect(project)}
        className="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm block w-full"
      >
        Select Project
      </button>
    </div>
  );
};

export default ProjectCard;
