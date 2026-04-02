export type BalanceStatus = "sufficient" | "insufficient";
export type TransactionAction = "fund_transfer" | "demand_loan";
export type FlowPhase =
  | "upload"
  | "preview"
  | "balance_check"
  | "review"
  | "done";

/** Raw row extracted from Excel file */
export interface ExtractedRow {
  id: string; // generated uuid per row for selection tracking
  reference_number: string;
  cif_id: string;
  policy_number: string;
  debit_account_number: string;
  credit_account_number: string;
  amount: number;
  tran_particular: string;
  tran_remarks: string;
  uploaded_by: string;
  uploaded_date: string;
}

/** ExtractedRow enriched with balance API data and derived status */
export interface EnrichedRow extends ExtractedRow {
  availableBalance: number;
  status: BalanceStatus;
}

export type ReviewTab = "all" | "sufficient" | "insufficient";
