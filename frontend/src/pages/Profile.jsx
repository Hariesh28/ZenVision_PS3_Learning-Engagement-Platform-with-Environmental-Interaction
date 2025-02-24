import React, { useState } from "react";
import LearningDashboard from "../components/LearningDashboard";
import ProjectList from "../components/ProjectList";

function Profile() {
  const [progress, setProgress] = useState({ completed: 0, badges: 0 });
  return (
    <>
      <LearningDashboard progress={progress} />
      <ProjectList />
    </>
  );
}

export default Profile;