export type Loan = {
  id: string;
  referenceNo: string;
  policyNumber: string;
  type: string;
  segment: string;
  branch: string;
  province: string;
  insuranceCompany: string;
  sumInsured: number;
  premium: number;
  daysLeft: number;
  riskStartDate: string;
  riskMaturityDate: string;
  status: string;
};

export type ExpiredLoan = {
  id: string;
  referenceNo: string;
  policyNumber: string;
  type: string;
  segment: string;
  branch: string;
  province: string;
  accountNo: string;
  cifId: string;
  accountStatus: string;
  closedDate: string | null;
  riskStartDate: string;
  riskMaturityDate: string;
  status: string;
};
