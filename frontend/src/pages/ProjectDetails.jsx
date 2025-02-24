import { useLocation, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL
  const location = useLocation();
  const project = location.state?.project; // Get project data from state

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h2 className="text-3xl font-bold">Project Details</h2>

      {project ? (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <p className="mt-4">{project.steps}</p>
        </div>
      ) : (
        <p className="text-red-500">No project data available.</p>
      )}
    </div>
  );
};

export default ProjectDetails;
