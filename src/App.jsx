import { MotionConfig } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <BrowserRouter>
      {/* honours the visitor's "reduce motion" setting for Framer Motion transitions */}
      <MotionConfig reducedMotion="user">
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}
