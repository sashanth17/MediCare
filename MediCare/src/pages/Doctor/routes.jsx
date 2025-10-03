import ProtectedRoute from "../../ProtectedRoute";

import { Route } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";
import ResolvePage from "./ResolvePage";

const DoctorRoutes = (
  <>
    <Route
      key="doctor-dashboard"
      path="/doctor/dashboard"
      element={
        <ProtectedRoute allowedRole="Doctor">
          <DoctorDashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/resolve/:sessionId" element={<ResolvePage />} />
  </>
);
export default DoctorRoutes;
