import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ import ThemeProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider> {/* ✅ Wrap App */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
