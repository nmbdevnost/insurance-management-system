export type Insurance = {
  id: string;
  loan_number: string;
  customer: string;
  insurance_expiry_date: string;
  days_left: number;
  policy: string;
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
