import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CameraFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    startCamera();
  }, []);

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);

    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, "capture.png");

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result;
        
        navigate("/processing", { state: { image: base64data } });
      };
    }, "image/png");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mt-5 mb-5">Live Camera Feed</h2>
      <video ref={videoRef} width="640" height="480" autoPlay className="border rounded-md" />
      <canvas ref={canvasRef} width="640" height="480" hidden />

      <button
        onClick={captureImage}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Capture & Send
      </button>
    </div>
  );
};

export default CameraFeed;
