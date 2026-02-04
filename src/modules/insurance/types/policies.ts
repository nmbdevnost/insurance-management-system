export type ExpiredPolicy = {
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
