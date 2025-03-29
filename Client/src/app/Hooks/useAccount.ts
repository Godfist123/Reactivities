import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema } from "../Components/Activity/Schema/loginSchema";
import { useAxios } from "../Agent/useAxios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { User } from "../../Domain/User";
import { RegisterSchema } from "../Components/Activity/Schema/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
  const agent = useAxios();
  const navi = useNavigate();
  const queryClient = useQueryClient();

  const loginUser = useMutation({
    mutationFn: async (credential: LoginSchema) =>
      await agent.post("/auth/login", credential),
    onSuccess: () => {
      navi("/activities");
    },
  });

  const registerUser = useMutation({
    mutationFn: async (data: RegisterSchema) =>
      await agent.post("/auth/register", data),
    onSuccess: () => {
      toast.success("Account created successfully");
      navi("/login");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("user-logout"));
    queryClient.removeQueries({ queryKey: ["activities"] });
    navi("/");
  };

  const getCurrentUser = (): User | null => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode<User>(token) : null;
  };

  return { loginUser, getCurrentUser, logout, registerUser };
};
