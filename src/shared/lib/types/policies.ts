export type ExpiredPolicy = {
  details: ExpiredPolicyDetails;
  expiringIn: string;
};

export type ExpiredPolicyDetails = {
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
  policyIssuedDate: string;
  riskStartDate: string;
  riskMaturityDate: string;
  termDays: number;
  assetType: string;
  sumInsured: number;
  totalPremium: number;
  status: string;
  createdBy: string;
  createdDate: string;
  apiResponse: string;
};
