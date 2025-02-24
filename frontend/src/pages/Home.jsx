import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import "./../index.css";

const Home = () => {
  const { userId, isSignedIn } = useAuth();
  return (
    <>
      {isSignedIn && (
        <div>
          <h2 className="text-xl font-bold mt-5 mb-5">Hello {userId}!</h2>
        </div>
      )}

      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
        <h1 className="text-4xl font-bold text-purple-600">Learning Engagement Platform with Environmental
        Interaction</h1>
        <p className="text-lg text-gray-700 mt-4 ">
        Educators and learners lack tools to seamlessly integrate physical materials with digital platforms for interactive, customizable learning experiences, struggling to identify and execute projects with available resources.
        </p>

        <div className="mt-6 space-x-4">
          <Link to="/dashboard">
            <button className="px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              Object Detection
            </button>
          </Link>
          <Link to="/profile">
            <button className="px-6 py-3 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-600 transition">
              Check Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
