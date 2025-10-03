import ProtectedRoute from "../../ProtectedRoute";
import { Route } from "react-router-dom";
import PharmacistDashboard from "./PharmacistDashboard";
// import other pharmacist-specific pages as needed
// import InventoryPage from "./InventoryPage";

const PharmacyRoutes = (
  <>
    <Route
      key="pharmacist-dashboard"
      path="/pharmacist/dashboard"
      element={
        <ProtectedRoute allowedRole="Pharmacist">
          <PharmacistDashboard />
        </ProtectedRoute>
      }
    />
  </>
);

export default PharmacyRoutes;
