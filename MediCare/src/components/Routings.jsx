import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProfilePage from "../pages/profile";

const RoutingMenu = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};
export default RoutingMenu;
