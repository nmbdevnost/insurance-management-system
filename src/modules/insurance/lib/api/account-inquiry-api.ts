import { POST } from "@/shared/lib/api/api";
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

  const responseCode = Number(response.data.response.responseCode);

  if (responseCode < 200 || responseCode >= 300) {
    throw new Error(response.data.response.responseMessage);
  }

  return response.data;
};
