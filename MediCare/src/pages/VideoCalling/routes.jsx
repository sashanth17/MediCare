// pages/VideoCalling/routes.js
import { Route } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute";
import DoctorCall from "./DoctorCall";
import PatientCall from "./PatientCall";

const VideoCallRoutes = (
  <>
    <Route
      path="/video-call/doctor"
      element={
        <ProtectedRoute allowedRole="Doctor">
          <DoctorCall />
        </ProtectedRoute>
      }
    />
    <Route
      path="/video-call/patient"
      element={
        <ProtectedRoute allowedRole="Patient">
          <PatientCall />
        </ProtectedRoute>
      }
    />
  </>
);

export default VideoCallRoutes;
