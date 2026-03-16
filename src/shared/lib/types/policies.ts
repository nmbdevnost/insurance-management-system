export type ExpiredPolicy = {
  policyDetails: ExpiredPolicyDetails;
  expiringIn: string;
};

export type ExpiredPolicyDetails = {
  policyId: number;
  policyNumber: string;
  referenceNumber: string;
  cifId: string;
  customerName: string;
  accountNo: string;
  mobileNo: string;
  email: string;
  address: string;
  branchId: number;
  branchName: string;
  province: string;
  insuranceCompany: string;
  initiationTypeId: number;
  policyIssueDate: string;
  riskStartDate: string;
  riskMaturityDate: string;
  termDays: number;
  assetType: string;
  coverageAmount: number;
  totalPremium: number;
  riskCoverageDetails: string;
  status: string;
  workflowStage: string;
  paymentStatus: string;
  isReviewed: boolean;
  insuranceApiRequestSent: boolean;
  insuranceApiResponseReceived: boolean;
  isRenewable: boolean;
  autoRenewalEnabled: boolean;
};

export type FormattedExpiredPolicy = ExpiredPolicyDetails &
  Pick<ExpiredPolicy, "expiringIn">;
