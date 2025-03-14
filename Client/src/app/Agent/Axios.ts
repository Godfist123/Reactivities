import axios from "axios";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use((req) => {
  return req;
});

agent.interceptors.response.use((resp) => {
  return new Promise((resolve) => {
    try {
      setTimeout(() => {
        resolve(resp);
      }, 1000);
    } catch (error) {
      return Promise.reject(error);
    }
  });
});

export default agent;
