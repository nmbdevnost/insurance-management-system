import { POST } from "@/shared/lib/api/api";
import type { DemandLoanRequest } from "../types/transaction";

const BASE = "/account-operation";

export const submitDemandLoan = async (body: DemandLoanRequest) => {
  const response = await POST<DemandLoanRequest, void>(
    `${BASE}/demand-loan`,
    body
  );
  return response.data.result;
};
