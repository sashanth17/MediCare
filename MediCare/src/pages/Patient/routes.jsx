import { Route } from "react-router-dom";
import GeminiChatSimple from "./ChatInterface";

const PatientRoutes = (
  <>
    <Route path="/chat" element={<GeminiChatSimple />} />
  </>
);
export default PatientRoutes;
