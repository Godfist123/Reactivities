import { jwtDecode } from "jwt-decode";
import type { User } from "../../Domain/User";

export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return jwtDecode<User>(token);
};
