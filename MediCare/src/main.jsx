import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SidebarMenu from "./components/sidebar";
import RoutingMenu from "./components/Routings";
import { testEnv } from "../Api/test";
import PatientInfo from "./pages/PersonalInfo";
import MedicalHistory from "./pages/MedicalHistory";
import HealthRecords from "./pages/HealthRecords";
import DoctorsList from "./pages/DoctorsList";
import PharmacyList from "./pages/PharmacyList";
import ChatInterface from "./pages/ChatInterface";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Sidebar on the left */}
        <SidebarMenu />
        {testEnv()}
        {/* Main content area */}
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          {/* <RoutingMenu /> */}
          <ChatInterface/>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
