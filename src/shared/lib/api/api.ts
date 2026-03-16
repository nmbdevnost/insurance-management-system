import { apiClient } from "./axios-client";

export const GET = <T>(url: string, params?: Record<string, unknown>) =>
  apiClient.get<T>(url, { params });

export const POST = <TBody, TResponse>(url: string, body?: TBody) =>
  apiClient.post<TResponse>(url, body);

export const PUT = <TBody, TResponse>(url: string, body?: TBody) =>
  apiClient.put<TResponse>(url, body);

export const PATCH = <TBody, TResponse>(url: string, body?: TBody) =>
  apiClient.patch<TResponse>(url, body);

export const DELETE = <T>(url: string) => apiClient.delete<T>(url);
