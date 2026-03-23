import type { ResponseMetaData } from "../types/response";
import { apiClient } from "./axios-client";

export const GET = <T>(url: string, params?: Record<string, unknown>) =>
  apiClient.get<ResponseMetaData<T>>(url, { params });

export const POST = <TBody, TResponse>(url: string, body?: TBody) =>
  apiClient.post<ResponseMetaData<TResponse>>(url, body);

export const PUT = <TBody, TResponse>(url: string, body?: TBody) =>
  apiClient.put<ResponseMetaData<TResponse>>(url, body);

export const PATCH = <TBody, TResponse>(url: string, body?: TBody) =>
  apiClient.patch<ResponseMetaData<TResponse>>(url, body);

export const DELETE = <T>(url: string) =>
  apiClient.delete<ResponseMetaData<T>>(url);
