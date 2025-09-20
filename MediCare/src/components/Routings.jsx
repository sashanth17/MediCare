import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProfilePage from "../pages/profile";
import VideoCallPage from "../pages/videoCall";
import GeminiChatSimple from "../pages/ChatInterface";
import HealthRecords from "../pages/HealthRecords";
import PharmacyList from "../pages/PharmacyList";

import PatienCallPage from "../pages/patientCall";
import DoctorCallPage from "../pages/DoctorCall";
import DoctorsList from "../pages/DoctorsList";
import MedicineDetail from "../pages/MedicineDetail";
const RoutingMenu = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<GeminiChatSimple />} />
        <Route path="/videocall" element={<VideoCallPage />} />
        <Route path="/Scan-Records" element={<HealthRecords />} />
        <Route path="/Medicine-availability" element={<PharmacyList />} />
        <Route path="/Connect-Patient" element={<PatienCallPage />} />
        <Route path="/Connect-doctor" element={<DoctorCallPage />} />
        <Route path="/Doctors-List" element={<DoctorsList />} />
        <Route path="/medicines/:medicineId" element={<MedicineDetail />} />
      </Routes>
    </>
  );
};
export default RoutingMenu;
