import { apiClient } from "./axios-client";

export const GET = <T>(url: string, params?: Record<string, unknown>) =>
  apiClient.get<T>(url, { params });

export const POST = <T>(url: string, body?: unknown) =>
  apiClient.post<T>(url, body);

export const PUT = <T>(url: string, body?: unknown) =>
  apiClient.put<T>(url, body);

export const PATCH = <T>(url: string, body?: unknown) =>
  apiClient.patch<T>(url, body);

export const DELETE = <T>(url: string) => apiClient.delete<T>(url);
