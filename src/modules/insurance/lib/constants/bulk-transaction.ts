import type {
  BalanceStatus,
  ReviewTab,
  TransactionAction,
} from "../types/bulk-transaction";

export const REQUIRED_COLUMNS: string[] = [
  "reference_number",
  "cif_id",
  "policy_number",
  "debit_account_number",
  "credit_account_number",
  "amount",
  "tran_particular",
  "tran_remarks",
  "uploaded_by",
  "uploaded_date",
];

/** Maps balance status to the corresponding transaction action */
export const ACTION_MAP: Record<BalanceStatus, TransactionAction> = {
  sufficient: "fund_transfer",
  insufficient: "demand_loan",
};

export const REVIEW_TABS: { label: string; value: ReviewTab }[] = [
  { label: "All", value: "all" },
  { label: "Balance Available", value: "sufficient" },
  { label: "Balance Not Available", value: "insufficient" },
];

// Demand loan constants
export const LOAN_PERIOD_DAYS = 1;
export const PREMIUM_RATE = 2.0;
export const BRANCH_CODE_LENGTH = 3;
