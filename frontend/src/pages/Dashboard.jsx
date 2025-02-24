import CameraFeed from "../components/CameraFeed";

const Dashboard = () => {
  const handleCapture = (imageData) => {
    console.log("Captured image:", imageData);
  };

  return (
    <div>
      <CameraFeed onCapture={handleCapture} />
    </div>
  );
};

export default Dashboard;
