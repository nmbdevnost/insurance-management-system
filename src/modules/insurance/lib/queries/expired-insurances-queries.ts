import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getExpiredInsurancesExpiredList } from "../api/expired-insurances-api";
import type { ExpiredInsurancesExpiredListBody } from "../types/expired-insurances";

const BASE_KEY = "expired-insurances";

export const insuranceQueryKeys = {
  all: (params?: Record<string, unknown>) => [BASE_KEY, params],
  expiredList: (params?: Record<string, unknown>) => [
    BASE_KEY,
    "expired-list",
    params,
  ],
};

export const expiredInsurancesQueries = {
  expiredList: (body: ExpiredInsurancesExpiredListBody) =>
    queryOptions({
      queryKey: insuranceQueryKeys.expiredList(body),
      queryFn: () => getExpiredInsurancesExpiredList(body),
      placeholderData: keepPreviousData,
    }),
};
