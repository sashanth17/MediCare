import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import DriverRoutes from "./DriverRoute";
import VideoCallRoutes from "./pages/VideoCalling/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DriverRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
