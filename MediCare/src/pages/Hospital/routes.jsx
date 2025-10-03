import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute";
import HospitalDashboard from "./HospitalDashboard";

const HospitalRoutes = (
  <>
    <Route
      key="hospital-dashboard"
      path="/hospital/dashboard"
      element={
        <ProtectedRoute allowedRole="Hospital">
          <HospitalDashboard />
        </ProtectedRoute>
      }
    />
  </>
);

export default HospitalRoutes;
