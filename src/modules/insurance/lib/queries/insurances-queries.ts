import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getInsurances } from "../api/insurances-api";

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
