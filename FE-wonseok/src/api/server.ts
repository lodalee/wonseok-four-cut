import axios, { AxiosInstance } from "axios";

export const server: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
  withCredentials: true,
});

export const getCookie = (name: string) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
};
