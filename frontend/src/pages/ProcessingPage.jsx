import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProcessingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const sendImage = async () => {
      if (!location.state || !location.state.image) {
        setError("No image found");
        setLoading(false);
        return;
      }
    
      try {
        // Convert Base64 to Blob
        const base64String = location.state.image.split(",")[1]; // Remove Base64 prefix
        const byteCharacters = atob(base64String);
        const byteArray = new Uint8Array(byteCharacters.length);
    
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }
    
        const blob = new Blob([byteArray], { type: "image/png" });
    
        // Create FormData and append Blob
        const formData = new FormData();
        formData.append("image", blob, "captured_image.png");
    
        // Send image to Flask server
        const response = await axios.post("http://10.31.23.128:5000/process-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        // Redirect to results page with API response
        navigate("/results", { 
          state: { 
            detectedItems: response.data.detected_items, 
            projectOptions: response.data.project_options,
            image: location.state.image,
          } 
        });
      } catch (err) {
        console.error("API Error:", err);
        setError("Error processing image");
      } finally {
        setLoading(false);
      }
    };
    
    

    sendImage();
  }, [location.state, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-xl font-semibold">Processing Image...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

export default ProcessingPage;
