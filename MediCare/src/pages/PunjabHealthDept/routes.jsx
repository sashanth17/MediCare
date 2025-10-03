import ProtectedRoute from "../../ProtectedRoute";
import { Route } from "react-router-dom";
import DepartmentDashboard from "./DepartmentDashboard";

const DepartmentRoutes = (
  <>
    <Route
      key="department-dashboard"
      path="/department/dashboard"
      element={
        <ProtectedRoute allowedRole="Department">
          <DepartmentDashboard />
        </ProtectedRoute>
      }
    />
  </>
);

export default DepartmentRoutes;
