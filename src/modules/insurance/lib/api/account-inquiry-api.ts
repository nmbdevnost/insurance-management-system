import { POST } from "@/shared/lib/api/api";
import { handleResponse } from "@/shared/lib/api/response";
import type {
  LoanAccountDetailsBody,
  LoanAccountDetailsResponse,
} from "../types/account-inquiry";

const BASE = "/account-inquiry";

export const loanAccountDetails = async (accounts: LoanAccountDetailsBody) => {
  const response = await POST<
    LoanAccountDetailsBody,
    LoanAccountDetailsResponse
  >(`${BASE}/account-loan-details`, accounts);

  handleResponse(response.data.response);

  return response.data;
};
