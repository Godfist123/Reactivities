import { toast } from "react-toastify";
import { useUIContext } from "../stores/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useAxios = () => {
  const uiContext = useUIContext();
  const navi = useNavigate();

  const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // ✅ Request Interceptor: Show loading state
  agent.interceptors.request.use(
    (req) => {
      const token = localStorage.getItem("token");

      if (!token && req.url === "/auth/register") {
        return req; // stop here if no token
      }

      if (!token) {
        navi("/login");
        return req; // stop here if no token
      }
      const decoded: any = jwtDecode(token);

      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        navi("/login");
        return req; // stop here if expired
      }

      req.headers.Authorization = `Bearer ${token}`;
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
      if (resp.data.token) {
        localStorage.setItem("token", resp.data.token);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // ⏳ Wait for 1s
      uiContext.uiStoreInstance.isIdle();
      return resp;
    },
    (error) => {
      uiContext.uiStoreInstance.isIdle();
      const { status, data } = error.response;
      switch (status) {
        case 400:
          toast.error("Bad Request");
          return Promise.reject(error.response.data);
          break;
        case 401:
          toast.error("Unauthorized");
          navi("/login");
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
