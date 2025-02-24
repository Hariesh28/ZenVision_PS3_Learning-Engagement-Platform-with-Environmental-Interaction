import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ProjectCard from "../components/misc/ProjectCard";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);

  const detectedItems = location.state?.detectedItems || "";
  const projectOptions = Array.isArray(location.state?.projectOptions)
    ? location.state.projectOptions
    : [];
  const image = location.state?.image || null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 p-6">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Detected Items</h2>

        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt="Captured"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        )}

        {detectedItems.length > 0 ? (
          <ul className="list-disc list-inside text-lg text-gray-800 text-left">
            {detectedItems.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-800">No items detected.</p>
        )}

        <button
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Project Options Section */}
      {projectOptions.length > 0 && (
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            Suggested Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectOptions.map((project, index) => (
              <ProjectCard
                key={project.id || `project-${index}`}
                project={{ ...project, id: project.id || `project-${index}` }}
                onMoreInfo={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ResultsPage;