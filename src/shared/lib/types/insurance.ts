export type Insurance = {
  id: string;
  policy_number: string;
  cif_id: string;
  type: string;
  segment: string;
  branch: string;
  province: string;
  insurance_company: string;
  sum_insured: number;
  total_premium: number;
  risk_start_date: string;
  maturity_end_date: string;
  status: string;
};

export type ExcelExtractedRow = {
  id: string;
  refrence_num: string;
  account_number: string;
  client_code: string;
  client_name: string;
  branch_code: string;
  available_balance: number;
  insurance_company_name: string;
  insurance_company_account_no: string;
  policy_number: string;
  sum_assured: number;
  total_premium: number;
  policy_issue_date: string;
  risk_start: string;
  maturity_date: string;
  status: "active" | "pending" | "expired" | "cancelled" | "matured";
};
