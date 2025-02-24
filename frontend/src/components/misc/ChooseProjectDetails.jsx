import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const location = useLocation();
  const project = location.state?.project;

  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!project) {
      setError("No project data found");
      setLoading(false);
      return;
    }

    const sendProjectData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/process_project", {
          title: project.title,
          description: project.description,
        });

        setResponseData(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Error processing project data");
      } finally {
        setLoading(false);
      }
    };

    sendProjectData();
  }, [project]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h2 className="text-3xl font-bold text-indigo-600 mb-5">{project?.title}</h2>
      <p className="text-gray-700 text-lg mb-5">{project?.description}</p>

      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-xl font-semibold">Processing...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-5 p-5 border border-gray-300 rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-bold text-gray-800">Response from Backend:</h3>
          <p className="text-gray-600 mt-2">{responseData?.message}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
