import api from "./api";
import { type User } from "../types";

export const register = async (
  email: string,
  name: string,
  password: string
) => {
  const response = await api.post<{ accessToken: string }>("/auth/register", {
    email,
    name,
    password,
  });
  localStorage.setItem("token", response.data.accessToken);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post<{ accessToken: string }>("/auth/login", {
    email,
    password,
  });
  localStorage.setItem("token", response.data.accessToken);
  return response.data;
};

export const getUser = async (email: string): Promise<User> => {
  const response = await api.get<User>("/auth/user", { params: { email } });
  return response.data;
};
