import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const description = project?.description || ""; // Ensure description is always a string
  const isLongDescription = description.length > 90;

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          {project?.type && (
            <div className="text-gray-600 my-2">{project.type}</div>
          )}
          <h3 className="text-xl font-bold">
            {project?.title || "Untitled Project"}
          </h3>
        </div>

        <div
          className={`overflow-hidden transition-all ${
            showFullDescription ? "max-h-screen" : "max-h-[60px]"
          }`}
        >
          {isLongDescription && !showFullDescription
            ? description.substring(0, 90) + "..."
            : description}
        </div>

        {isLongDescription && (
          <button
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="text-indigo-500 mb-5 hover:text-indigo-800 hover:bg-transparent bg-transparent border-none focus:outline-none"
          >
            {showFullDescription ? "Less" : "More"}
          </button>
        )}

        <div className="border border-gray-100 mb-5"></div>

        {project?.id && (
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <button
              onClick={handleMoreInfo}
              className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
              More Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
