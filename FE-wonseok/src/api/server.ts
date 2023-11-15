import axios, { AxiosInstance, CancelTokenSource } from "axios";
import { Cookies } from "react-cookie";

export const server: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
  withCredentials: true,
});

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
};
