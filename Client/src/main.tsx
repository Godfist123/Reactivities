import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./app/Pages/App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ActivityProvider } from "./app/Context/ActivityContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app/Styles/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CounterProvider } from "./app/stores/store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ActivityProvider>
    <StrictMode>
      <CounterProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ToastContainer
            position="bottom-right"
            hideProgressBar
            theme="colored"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
          </LocalizationProvider>
        </QueryClientProvider>
      </CounterProvider>
    </StrictMode>
  </ActivityProvider>
);
