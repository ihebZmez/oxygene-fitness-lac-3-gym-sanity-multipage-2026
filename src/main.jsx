import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import "./index.css";
import "./i18n"; // Import i18n configuration
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";

inject();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
