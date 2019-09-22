import axios, { AxiosRequestConfig } from "axios";
import { APP_HOST, APP_PORT } from "../constants";
import { GET } from "../types/get";

export const axiosInstance = axios.create({
  baseURL: `http://${APP_HOST}:${APP_PORT}`,
  headers: { "Content-Type": "application/json" },
  responseType: "json"
});

export function apiGet<T extends keyof GET>(
  path: T,
  config?: AxiosRequestConfig
) {
  return axiosInstance.get<GET[T]["res"]>(path, config);
}
