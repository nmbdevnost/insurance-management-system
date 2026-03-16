import { POST } from "@/shared/lib/api/api";
import type {
  ExpiredInsurancesExpiredListBody,
  ExpiredInsurancesExpiredListResponse,
} from "../types/expired-insurances";

export const getExpiredInsurancesExpiredList = async (
  body: ExpiredInsurancesExpiredListBody
) => {
  const response = await POST<
    ExpiredInsurancesExpiredListBody,
    ExpiredInsurancesExpiredListResponse
  >("insurance/expiring-policies", body);

  const data = response.data;

  return data;
};
