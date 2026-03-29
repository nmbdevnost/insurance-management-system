import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { checkAccountBalances, getInsurances } from "../api/insurances-api";
import type { AccountBalanceBody } from "../types/insurances";

export const insuranceQueryKeys = {
  all: (params?: Record<string, unknown>) => ["insurances", params],
};

export const insuranceQueries = {
  all: (params?: Record<string, unknown>) =>
    queryOptions({
      queryKey: insuranceQueryKeys.all(params),
      queryFn: () => getInsurances(params),
      placeholderData: keepPreviousData,
    }),
};

export const checkAccountBalancesQuery = (rows: AccountBalanceBody) =>
  queryOptions({
    queryKey: ["balance-check"],
    queryFn: () => checkAccountBalances(rows),
    gcTime: 0,
    staleTime: 0,
    enabled: !!rows.length,
  });
