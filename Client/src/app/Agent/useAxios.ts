import { toast } from "react-toastify";
import { useUIContext } from "../stores/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAxios = () => {
  const uiContext = useUIContext();
  const navi = useNavigate();

  const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // ✅ Request Interceptor: Show loading state
  agent.interceptors.request.use(
    (req) => {
      uiContext.uiStoreInstance.isBusy();
      return req;
    },
    (error) => {
      uiContext.uiStoreInstance.isIdle();
      return Promise.reject(error);
    }
  );

  // ✅ Response Interceptor: Add 1-second delay before returning response
  agent.interceptors.response.use(
    async (resp) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // ⏳ Wait for 1s
      uiContext.uiStoreInstance.isIdle();
      return resp;
    },
    (error) => {
      uiContext.uiStoreInstance.isIdle();
      const { status, data } = error.response;
      switch (status) {
        case 400:
          const errorsList: Record<string, string> = {};
          if (data.type === "validation_error") {
            for (const key in data.errors) {
              errorsList[key] = data.errors[key][0];
            }
            toast.error(Object.values(errorsList).join(", "));
          } else {
            toast.error("Bad Request");
          }

          navi("/error/400");
          break;
        case 401:
          toast.error("Unauthorized");
          navi("/error/401");
          break;
        case 403:
          toast.error("Forbidden");
          navi("/error/403");
          break;
        case 404:
          toast.error("Not Found");
          navi("/error/404");
          break;
        case 500:
          toast.error("Internal Server Error");
          navi("/error/500", { state: { error: data } });
          break;

        default:
          toast.error("Something went wrong");
          break;
      }
      return Promise.reject(error);
    }
  );

  return agent;
};
