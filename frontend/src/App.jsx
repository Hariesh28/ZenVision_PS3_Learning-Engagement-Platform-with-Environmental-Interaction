import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import ProcessingPage from "./pages/ProcessingPage";
import ResultsPage from "./pages/ResultsPage";
import { AuthProvider } from "./context/AuthContext";
import ProjectDetails from "./pages/ProjectDetails";
const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/details/:title" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
