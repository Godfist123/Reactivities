import { useUIContext } from "../stores/store";
import agent from "../Agent/Axios";

export const useAxios = () => {
  const uiContext = useUIContext(); // ✅ Now used inside a React Hook (valid)

  agent.interceptors.request.use((req) => {
    uiContext.uiStoreInstance.isBusy(); // ✅ Context used safely inside a hook
    return req;
  });

  agent.interceptors.response.use((resp) => {
    return new Promise((resolve) => {
      uiContext.uiStoreInstance.isIdle(); // ✅ Context used safely inside a hook
      resolve(resp);
    });
  });

  return agent;
};
