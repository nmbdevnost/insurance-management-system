export type Loan = {
  referenceNo: string;
  policyNumber: string;
  cifId: string;
  customerName: string;
  accountNo: string;
  email: string;
  branchName: string;
  province: string;
  insuranceCompany: string;
  initiationType: "Manual" | "Online";
  policyIssuedDate: string; // ISO date
  riskStartDate: string; // ISO date
  riskMaturityDate: string; // ISO date
  termDays: number;
  assetType: string;
  sumInsured: number;
  totalPremium: number;
  status: string;
  createdBy: string;
  createdDate: string; // ISO date
  apiResponse: string;
  debitAccountNo: string;
};

export type ExpiredLoan = {
  referenceNo: string;
  policyNumber: string;
  cifId: string;
  customerName: string;
  accountNo: string;
  accountStatus: string;
  accountClosedDate: string; // ISO date string
  status: string;
};
