import { POST } from "@/shared/lib/api/api";
import type { FundTransferRequest } from "../types/transaction";

const BASE = "/transaction";

export const submitFundTransfer = async (body: FundTransferRequest) => {
  const response = await POST<FundTransferRequest, void>(
    `${BASE}/fund-transfer`,
    body
  );
  return response.data.result;
};
