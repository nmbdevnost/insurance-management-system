import { queryOptions } from "@tanstack/react-query";
import { loanAccountDetails } from "../api/account-inquiry-api";
import type { LoanAccountDetailsBody } from "../types/account-inquiry";

export const loanAccountDetailsQuery = (
  accounts: LoanAccountDetailsBody["accounts"]
) =>
  queryOptions({
    queryKey: ["loan-account-details", accounts],
    queryFn: () =>
      loanAccountDetails({
        accounts,
      }),
  });
