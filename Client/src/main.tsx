import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./app/Pages/App";
import { ActivityProvider } from "./app/Context/ActivityContext";

createRoot(document.getElementById("root")!).render(
  <ActivityProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ActivityProvider>
);
