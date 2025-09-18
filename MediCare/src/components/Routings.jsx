import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProfilePage from "../pages/profile";
import ChatWindow from "../pages/Chat";
import VideoCallPage from "../pages/videoCall";
const RoutingMenu = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatWindow />} />
        <Route path="Consult-doctor" element={<VideoCallPage />} />
      </Routes>
    </>
  );
};
export default RoutingMenu;
