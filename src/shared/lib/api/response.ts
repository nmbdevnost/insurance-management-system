import type { ResponseStatus } from "../types/response";

export function handleResponse(response: ResponseStatus) {
  const responseCode = Number(response.responseCode);

  if (responseCode < 200 || responseCode >= 300) {
    throw new Error(response.responseMessage);
  }
}
