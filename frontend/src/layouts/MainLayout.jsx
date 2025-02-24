import { Outlet } from "react-router-dom";
import Navbar from "../components/misc/NavBar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default MainLayout;
