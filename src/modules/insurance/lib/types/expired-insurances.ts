import type { ExpiredPolicy } from "@/shared/lib/types/policies";

export type ExpiredInsurancesExpiredListBody = {
  days?: number;
  pageNo?: number;
  pageSize?: number;
};

export type ExpiredInsurancesExpiredListResponse = {
  totalCount: number;
  expiringPoliciesDetails: Array<ExpiredPolicy>;
};
