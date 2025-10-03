import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard"; //default landing page
import ProtectedRoute from "./ProtectedRoute"; //to make an protected route
import LoginPage from "./Auth/LoginPage"; //login page

//importing different routes from different modules
import PatientRoutes from "./pages/Patient/routes";
import DoctorRoutes from "./pages/Doctor/routes";
import HospitalRoutes from "./pages/Hospital/routes";
import PharmacyRoutes from "./pages/Pharmacy/routes";
import DepartmentRoutes from "./pages/PunjabHealthDept/routes";

import VideoCallRoutes from "./pages/VideoCalling/routes";

const DriverRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {DoctorRoutes}
      {HospitalRoutes}
      {PharmacyRoutes}
      {DepartmentRoutes}
      {VideoCallRoutes}
      {PatientRoutes}

      {/* Default fallback */}
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};
export { ProtectedRoute };

export default DriverRoutes;
