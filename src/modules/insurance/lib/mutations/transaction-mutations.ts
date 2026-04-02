import { mutationOptions } from "@tanstack/react-query";
import { submitDemandLoan } from "../api/account-operation-api";
import { checkAccountBalances } from "../api/insurances-api";
import { submitFundTransfer } from "../api/transaction-api";
import type {
  DemandLoanRequest,
  FundTransferRequest,
} from "../types/transaction";

export const fundTransferMutationOptions = mutationOptions({
  mutationFn: (body: FundTransferRequest) => submitFundTransfer(body),
});

export const demandLoanMutationOptions = mutationOptions({
  mutationFn: (body: DemandLoanRequest) => submitDemandLoan(body),
});

export const checkBalanceMutationOptions = mutationOptions({
  mutationFn: checkAccountBalances,
});
