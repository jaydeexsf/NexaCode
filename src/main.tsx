import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./lib/theme-provider";
import App from "./App";
import "./index.css";
import '@fontsource/montserrat'; // in main.jsx

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider defaultTheme="system" storageKey="nexaweb-theme">
      <App />
    </ThemeProvider>
  </HelmetProvider>
);
