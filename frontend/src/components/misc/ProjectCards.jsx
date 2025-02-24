import { useState } from "react";
import ProjectCard from "./ProjectCard";
import axios from "axios";

const ProjectCards = ({ projects }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleSelectProject = async (project) => {
    // Prevent duplicates
    if (selectedProjects.some((p) => p.title === project.title)) {
      alert("Project already selected!");
      return;
    }

    // Update state with new project
    const updatedProjects = [...selectedProjects, project];
    setSelectedProjects(updatedProjects);

    // Post updated list to API
    try {
      const response = await axios.post("http://10.31.23.128:5000/save-selected-projects", {
        selectedProjects: updatedProjects,
      });

      console.log("Projects saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving selected projects:", error);
    }
  };

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Available Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} onSelect={handleSelectProject} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCards;
