import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/profile";
import VideoCallPage from "../pages/videoCall";
import GeminiChatSimple from "../pages/ChatInterface";
import HealthRecords from "../pages/HealthRecords";
import PharmacyList from "../pages/Medicine/PharmacyList";

import PatienCallPage from "../pages/patientCall";
import DoctorCallPage from "../pages/DoctorCall";
import DoctorsList from "../pages/DoctorsList";
import MedicineDetail from "../pages/MedicineDetail";
import SimulatedChat from "../pages/simulatedChat";
import PrescriptionPage from "../pages/PrescriptionPage";
import LoginPage from "../Auth/LoginPage";
import ResolvePage from "../pages/ResolvePage";
import DepartmentDashboard from "../pages/DepartmentDashboard";

import DoctorDashboard from "../pages/DoctorDashboard";
const RoutingMenu = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<GeminiChatSimple />} />
        <Route path="/videocall" element={<VideoCallPage />} />
        <Route path="/Scan-Records" element={<HealthRecords />} />
        <Route path="/Medicine-availability" element={<PharmacyList />} />
        <Route path="/Connect-Patient" element={<PatienCallPage />} />
        <Route path="/Connect-doctor" element={<DoctorCallPage />} />
        <Route path="/Doctors-List" element={<DoctorsList />} />
        <Route path="/medicines/:medicineId" element={<MedicineDetail />} />
        <Route path="/Prescribe" element={<PrescriptionPage />} />
        <Route path="/resolve/:sessionId" element={<ResolvePage />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/department/dashboard" element={<DepartmentDashboard />} />
      </Routes>
    </>
  );
};
export default RoutingMenu;
