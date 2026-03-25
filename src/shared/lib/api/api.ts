import type { ResponseMetaData } from "../types/response";
import { apiClient } from "./axios-client";

export const GET = <T>(url: string, params?: Record<string, unknown>) =>
  apiClient.get<ResponseMetaData<T>>(url, { params });

export const POST = <TBody, TResponse>(url: string, body?: TBody) => {
  const isFormData = body instanceof FormData;
  return apiClient.post<ResponseMetaData<TResponse>>(url, body, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });
};

export const PUT = <TBody, TResponse>(url: string, body?: TBody) =>
  apiClient.put<ResponseMetaData<TResponse>>(url, body);

export const PATCH = <TBody, TResponse>(url: string, body?: TBody) =>
  apiClient.patch<ResponseMetaData<TResponse>>(url, body);

export const DELETE = <T>(url: string) =>
  apiClient.delete<ResponseMetaData<T>>(url);
