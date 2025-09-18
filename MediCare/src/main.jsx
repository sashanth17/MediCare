import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SidebarMenu from "./components/sidebar";
import RoutingMenu from "./components/Routings";
import { testEnv } from "../Api/test";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Sidebar on the left */}
        <SidebarMenu />
        {testEnv()}
        {/* Main content area */}
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          <RoutingMenu />
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
